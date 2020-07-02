// 生成压缩包下载
// https://www.cnblogs.com/diligenceday/p/5008777.html
// http://gildas-lormeau.github.io/zip.js/
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory 上传文件夹

import {getLangStyle} from './file-type';
import {theme} from '../../js/status';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE} from '../../js/constant';
import {writeIDFiles, idFiles, files, getParentChildren, sortFiles} from './file-system';
import {onFileClick, onChangeContentFile} from './file-header';
import {readFileID, writeFileID, readOpenFileID, writeFiles, readContentFileID, writeContentFileID} from './storage';

// https://blog.csdn.net/qq_37003559/article/details/103970901?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1
export let fileId = readFileID();

function getID () {
    let id = fileId++;
    writeFileID();
    return id;
}

export let globalFileAttr = {
    contentId: readContentFileID(),
    theme: theme.get(),
    openedId: readOpenFileID(),
    menuFileId: -1,
};

window.globalFileAttr = globalFileAttr;

event.regist(EVENT.THEME_CHANGE, v => {
    globalFileAttr.theme = v;
});

class JXFileBase {
    constructor ({
        id,
        name = '',
        parentId = ROOT,
        renamed = false,
    }) {
        if (name === '') {
            renamed = true;
        }
        this.id = typeof id === 'number' ? id : getID();
        writeIDFiles(this.id, this);
        this.name = name;
        this.renamed = renamed;
        this.renameRepeat = false;
        this.tempName = ''; // 重命名时的临时名字
        this.parentId = parentId;
        if (renamed) {
            this.rename();
        }
    }
    parent () {
        if (this.parentId === ROOT) {
            return ROOT;
        }
        return idFiles[this.parentId];
    }
    remove () {
        let parent = this.parent();
        let cs;
        if (parent === ROOT) {
            cs = files;
        } else {
            cs = parent.children;
        }
        let index = cs.indexOf(this);
        cs.splice(index, 1);
        writeFiles();
    }
    click () {
        onChangeContentFile(this.id);
        writeContentFileID();
    }
    rename () {
        this.renamed = true;
        this.tempName = this.name;
        setTimeout(() => {
            let input = document.getElementById('rename-input-' + this.id);
            if (!input) {
                console.warn('rename input = null');
                return;
            }
            if (this.tempName !== '') {
                let start = 0, end = this.tempName.length;
                let index = this.tempName.lastIndexOf('.');
                if (index !== -1) {
                    end = index;
                }
                if (input.setSelectionRange) {
                    // fix chrome issue
                    window.setTimeout(function () {
                        input.setSelectionRange(start, end);
                    }, 0);
                } else if (input.createTextRange) {
                    let range = input.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', end);
                    range.moveStart('character', start);
                    range.select();
                }
            }
            input.focus();
        }, 100);
        // if (el && !el.__init_rename) {
        //     el.__init_rename = true;
        //     // el.addEventListener('blur', () => {
        //     //     this.renameFinish();
        //     // }, false);
        // }
    }
    renameCheck () {
        let bros = getParentChildren(this.parentId);
        if (bros.find(item => {
            return item.name === this.tempName && item.id !== this.id;
        })) {
            this.renameRepeat = true;
        } else {
            this.renameRepeat = false;
        }
    }
    renameFinish (byEnter) {
        // 结束重命名
        if (this.renameRepeat) {
            if (byEnter === true) {
                return;
            }
            if (this.name !== '') {
                this.renamed = false;
            } else {
                this.remove();
            }
            this.renameRepeat = false;
            return;
        }
        this.renamed = false;
        if (this.tempName.trim() === '') {
            if (this.name === '') { // 新建未命名文件
                // name = '未命名'; // 或者删除这个文件
                // writeFiles();
                this.remove();
                return;
            }
        } else {
            this.name = this.tempName;
            writeFiles();
            sortFiles(this.parentId);
        }
    }
}

export class JXFile extends JXFileBase {
    constructor ({
        id,
        name,
        parentId,
        renamed,
        content,
    }) {
        super({id, name, parentId, renamed});
        this.type = FILE_TYPE.FILE;
        this.content = content;
        this.unsave = false;
        this.initStyle();
    }
    initStyle (name) {
        this.style = getLangStyle(name || this.name);
    }
    click () {
        super.click();
        onFileClick(this);
    }
    renameFinish (byEnter) {
        super.renameFinish(byEnter);
        this.initStyle();
    }
    renameCheck () {
        super.renameCheck();
        this.initStyle(this.tempName);
    }
}

export class JXDir extends JXFileBase {
    constructor ({
        id,
        name,
        parentId,
        renamed,
        opened = false,
        children = []
    }) {
        super({id, name, parentId, renamed});
        this.type = FILE_TYPE.DIR;
        this.opened = opened;
        this.unnameIndex = 0;
        children.forEach(child => {
            if (child.parentId === ROOT)
                child.parentId = this.id;
        });
        this.children = children;
    }
    click () {
        super.click();
        writeFiles();
        this.opened = !this.opened;
    }
    open () {
        if (!this.opened) {
            this.opened = true;
            writeFiles();
        }
    }
    close () {
        if (this.opened) {
            this.opened = false;
            writeFiles();
        }
    }
    append (file) {
        if (!this.children.find(item => {
            return item.id === file.id;
        })) {
            this.children.push(file);
            file.parentId = this.id;
        }
    }
}

window.JXDir = JXDir;
window.JXFile = JXFile;