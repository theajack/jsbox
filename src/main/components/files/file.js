// 生成压缩包下载
// https://www.cnblogs.com/diligenceday/p/5008777.html
// http://gildas-lormeau.github.io/zip.js/
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory 上传文件夹

import {getLangStyle} from './file-type';
import {theme} from '../../js/status';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE, RENAME_ERROR} from '../../js/constant';
import {writeIDFiles, idFiles, files, getParentChildren, sortFiles} from './file-system';
import {onFileClick, onChangeContentFile, clearHeaderByRemoveFile} from './file-header';
import {readFileID, writeFileID, readOpenFileID, writeFiles, readContentFileID, writeContentFileID, writeOpenFileID} from './storage';
import {toast} from '../../js/util';

// https://blog.csdn.net/qq_37003559/article/details/103970901?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1
export let fileId = readFileID();

const FILE_NAME_REG = /[\\/:\*\?"'<>\|]/;
const FILE_NAME_REG_ALL = /[\\/:\*\?"'<>\|]/g;

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
    copyFileId: -1,
    cutFileId: -1,
};

export function clearFileAttrById (id) {
    if (globalFileAttr.contentId === id) {
        globalFileAttr.contentId = -1;
        writeContentFileID();
    }
    if (globalFileAttr.openedId === id) {
        globalFileAttr.openedId = -1;
        writeOpenFileID();
    }
    if (globalFileAttr.menuFileId === id) {
        globalFileAttr.menuFileId = -1;
    }
}

export function clearFileAttr () {
    globalFileAttr.contentId = -1;
    globalFileAttr.openedId = -1;
    globalFileAttr.menuFileId = -1;
    fileId = 0;
}


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
        path = ''
    }) {
        // console.log(name, 333);
        if (name === '') {
            renamed = true;
            this.newFile = true;
        } else {
            this.newFile = false;
        }
        this.id = typeof id === 'number' ? id : getID();
        writeIDFiles(this.id, this);
        this.name = name;
        this.parentPath = path;
        this.initPath();
        this.renamed = renamed;
        this.renameError = '';
        this.tempName = ''; // 重命名时的临时名字
        this.parentId = parentId;
        if (renamed) {
            this.rename();
        }
    }
    initPath () {
        this.path = this.parentPath + '/' + this.name;
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
        clearHeaderByRemoveFile(this);
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
            this.renameError = RENAME_ERROR.REPEAT;
            return;
        }
        if (FILE_NAME_REG.test(this.tempName)) {
            this.renameError = RENAME_ERROR.NOT_VALID;
            return;
        }
        this.renameError = '';
    }
    renameFinish (byEnter) {
        // 结束重命名
        if (this.renameError === RENAME_ERROR.NOT_VALID) {
            this.tempName = this.tempName.replace(FILE_NAME_REG_ALL, '');
            this.renameCheck();
        }
        if (this.renameError === RENAME_ERROR.REPEAT) {// 存在重名文件
            if (byEnter === true) {
                return;
            }
            if (this.name !== '') {
                this.renamed = false;
            } else {
                this.remove();
            }
            this.renameError = '';
            return;
        }
        this.renamed = false;
        if (this.tempName.trim() === '') {
            if (this.name === '') { // 新建未命名文件
                this.remove();
                return;
            }
        } else {
            this.name = this.tempName;
            writeFiles();
            sortFiles(this.parentId);
            this.initPath();
            this.renameError = '';
            clearTimeout(this._timer);
        }
    }
}

export class JXFile extends JXFileBase {
    constructor ({
        id,
        name,
        parentId,
        renamed,
        content = '',
        path
    }) {
        super({id, name, parentId, renamed, path});
        this.type = FILE_TYPE.FILE;
        this.content = content;
        this.unsave = false;
        this.initStyle();
        this.lang = this.style.lang;
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
        if (this.lang !== this.style.lang) {
            this.lang = this.style.lang;
        }

        if (this.newFile && this.renameError === '' && this.name !== '') {
            this.click();
            this.newFile = false;
        }
    }
    renameCheck () {
        super.renameCheck();
        this.initStyle(this.tempName);
    }
    copyTo (newPid) {
        if (!checkPasteTarget(newPid, this.parentId, this.name)) {
            return;
        }
        let newcs = getParentChildren(newPid);
        newcs.push(new JXFile({
            name: this.name,
            parentId: newPid,
            renamed: false,
            content: this.content,
            path: newPid === ROOT ? '' : idFiles[newPid].path
        }));
        sortFiles(newPid);
        writeFiles();
    }
    cutTo (newPid) {
        if (!checkPasteTarget(newPid, this.parentId, this.name)) {
            return;
        }
        let newcs = getParentChildren(newPid);
        let cs = getParentChildren(this.parentId);
        cs.splice(cs.indexOf(this), 1);
        this.parentId = newPid;
        this.parentPath = newPid === ROOT ? '' : idFiles[newPid].path;
        newcs.push(this);
        sortFiles(newPid);
        this.initPath();
        writeFiles();
    }
}

export class JXDir extends JXFileBase {
    constructor ({
        id,
        name,
        parentId,
        renamed,
        opened = false,
        children = [],
        path
    }) {
        super({id, name, parentId, renamed, path});
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
    renameFinish (byEnter) {
        super.renameFinish(byEnter);
        if (this.newFile) {this.newFile = false;}
    }
    copyTo () {
        
    }
    cutTo () {
        
    }
}

function checkPasteTarget (newPid, oldPid, name) {
    if (newPid === oldPid) {return false;}
    let newcs = getParentChildren(newPid);
    if (newcs.find(item => {
        return item.name === name;
    })) {
        toast('粘贴失败, 目标区域存在重名文件');
        return false;
    }
    return true;
}

window.JXDir = JXDir;
window.JXFile = JXFile;