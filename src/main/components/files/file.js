// 生成压缩包下载
// https://www.cnblogs.com/diligenceday/p/5008777.html
// http://gildas-lormeau.github.io/zip.js/
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory 上传文件夹

import {getLangStyle} from './file-type';
import {theme} from '../../js/status';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE} from '../../js/constant';
import {writeIDFiles, idFiles, files} from './file-system';
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
    openedId: readOpenFileID()
};

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
        this.id = typeof id === 'number' ? id : getID();
        writeIDFiles(this.id, this);
        this.name = name;
        this.renamed = renamed;
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
    rename (el) {
        this.renamed = true;
        this.tempName = this.name;
        if (el && !el.__init_rename) {
            el.__init_rename = true;
            document.addEventListener('blur', () => {
                this.renameFinish();
            }, false);
        }
    }
    renameFinish () {
        // 结束重命名
        this.renamed = false;
        if (this.tempName === '') {
            if (this.name === '') { // 新建未命名文件
                this.name = '未命名'; // 或者删除这个文件
                writeFiles();
            }
        } else {
            this.name = this.tempName;
            writeFiles();
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
        this.style = getLangStyle(this.name);
        this.unsave = false;
    }
    click () {
        super.click();
        onFileClick(this);
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
        if (!this.opened)
            this.opened = true;
    }
    close () {
        if (this.opened)
            this.opened = false;
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