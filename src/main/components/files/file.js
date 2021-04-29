// 生成压缩包下载
// https://www.cnblogs.com/diligenceday/p/5008777.html
// http://gildas-lormeau.github.io/zip.js/
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory 上传文件夹

import {getLangStyle, getResourcesType} from './file-type';
import {theme} from '../../js/status';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE, RENAME_ERROR, FILE_NONE, DROP_TYPE, RES_TYPE} from '../../js/constant';
import {writeIDFiles, idFiles, files, getParentChildren, sortFiles} from './file-system';
import {onFileClick, onChangeContentFile, clearHeaderByRemoveFile} from './file-header';
import {readFileID, markFileIDChange, readOpenFileID, markFilesChange, readContents, markContentsChange, markOpenedFileIDChange} from './storage';
import {toast} from '../../js/util';
import {getSelectedIds} from '../js/file-selected';

// https://blog.csdn.net/qq_37003559/article/details/103970901?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1
export let fileId = readFileID();

const FILE_NAME_REG = /[\\/:\*\?"'<>\|]/;
const FILE_NAME_REG_ALL = /[\\/:\*\?"'<>\|]/g;

function getID () {
    const id = fileId++;
    markFileIDChange();
    return id;
}


export const globalFileAttr = {
    contentId: readContents(),
    theme: theme.get(),
    openedId: readOpenFileID(),
    menuFileId: -1,
    copyFileIds: [],
    cutFileIds: [],
    selectedIds: getSelectedIds(), // 选中的id列表 无需保存到storage

    // 拖拽文件的相关id
    dragId: FILE_NONE,
    dragOverId: FILE_NONE,
    dropType: DROP_TYPE.NONE,
};
window.globalFileAttr = globalFileAttr;

export function clearFileAttrById (id) {
    if (globalFileAttr.contentId === id) {
        globalFileAttr.contentId = -1;
        markContentsChange();
    }
    if (globalFileAttr.openedId === id) {
        globalFileAttr.openedId = -1;
        markOpenedFileIDChange();
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
        this.initPath({
            parentPath: path
        });
        this.renamed = renamed;
        this.renameError = '';
        this.tempName = ''; // 重命名时的临时名字
        this.parentId = parentId;
        if (renamed) {
            this.rename();
        }
        this.cuted = false;
    }
    cut () {
        this.cuted = true;
    }
    cutEnd () {
        this.cuted = false;
    }
    initPath ({
        parentPath
    }) {
        if (typeof parentPath === 'string') {
            this.parentPath = parentPath;
        }
        this.path = this.parentPath + '/' + this.name;
    }
    parent () {
        if (this.parentId === ROOT) {
            return ROOT;
        }
        return idFiles[this.parentId];
    }
    remove () {
        const parent = this.parent();
        let cs;
        if (parent === ROOT) {
            cs = files;
        } else {
            cs = parent.children;
        }
        const index = cs.indexOf(this);
        cs.splice(index, 1);
        clearHeaderByRemoveFile(this);
        markFilesChange();
    }
    click () {
        onChangeContentFile(this.id);
        markContentsChange();
    }
    rename () {
        this.renamed = true;
        this.tempName = this.name;
        setTimeout(() => {
            const input = document.getElementById('rename-input-' + this.id);
            if (!input) {
                console.warn('rename input = null');
                return;
            }
            if (this.tempName !== '') {
                const start = 0;
                let end = this.tempName.length;
                const index = this.tempName.lastIndexOf('.');
                if (index !== -1) {
                    end = index;
                }
                if (input.setSelectionRange) {
                    // fix chrome issue
                    window.setTimeout(function () {
                        input.setSelectionRange(start, end);
                    }, 0);
                } else if (input.createTextRange) {
                    const range = input.createTextRange();
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
        const bros = getParentChildren(this.parentId);
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
            markFilesChange();
            sortFiles(this.parentId);
            this.initPath({});
            this.renameError = '';
            clearTimeout(this._timer);
        }
    }
    clone () {
        
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
        this.resType = getResourcesType(this.lang);
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
            return false;
        }
        const newcs = getParentChildren(newPid);
        newcs.push(this.clone({newPid}));
        sortFiles(newPid);
        markFilesChange();
        return true;
    }
    clone ({newPid, path}) {
        if (typeof path !== 'string') {
            path = newPid === ROOT ? '' : idFiles[newPid].path;
        }
        return new JXFile({
            name: this.name,
            parentId: newPid,
            renamed: false,
            content: this.content,
            path
        });
    }
    cutTo (newPid) {
        if (!checkPasteTarget(newPid, this.parentId, this.name)) {
            return;
        }
        const newcs = getParentChildren(newPid);
        const cs = getParentChildren(this.parentId);
        cs.splice(cs.indexOf(this), 1);
        this.parentId = newPid;
        this.parentPath = newPid === ROOT ? '' : idFiles[newPid].path;
        newcs.push(this);
        sortFiles(newPid);
        this.initPath({});
        markFilesChange();
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
        this.resType = RES_TYPE.DIR;
        this.opened = opened;
        this.unnameIndex = 0;
        children.forEach(child => {
            if (child.parentId === ROOT)
                child.parentId = this.id;
        });
        this.children = children;
        this.initPath({});
    }
    click () {
        super.click();
        markFilesChange();
        this.opened = !this.opened;
    }
    open () {
        if (!this.opened) {
            this.opened = true;
            markFilesChange();
        }
    }
    close () {
        if (this.opened) {
            this.opened = false;
            markFilesChange();
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
    copyTo (newPid) {
        // console.log(newPid);
        if (!checkPasteTarget(newPid, this.parentId, this.name)) {
            return;
        }
        const newcs = getParentChildren(newPid);

        newcs.push(this.clone({newPid}));
        sortFiles(newPid);
        markFilesChange();
    }
    clone ({
        newPid,
        path,
    }) {
        const id = getID();
        if (typeof path !== 'string') {
            path = newPid === ROOT ? '' : idFiles[newPid].path;
        }
        return new JXDir({
            id,
            name: this.name,
            parentId: newPid,
            path,
            children: this.children.map(file => {
                return file.clone({
                    newPid: id,
                    path: `${path}/${this.name}`
                });
            }),
            opened: false,
        });
    }
    cutTo (newPid) {
        if (!checkPasteTarget(newPid, this.parentId, this.name)) {
            return;
        }
        const newcs = getParentChildren(newPid);
        const cs = getParentChildren(this.parentId);
        cs.splice(cs.indexOf(this), 1);
        this.parentId = newPid;
        this.parentPath = newPid === ROOT ? '' : idFiles[newPid].path;
        newcs.push(this);
        sortFiles(newPid);
        this.initPath({
            init: false
        });
        markFilesChange();
    }
    initPath ({
        parentPath,
        init = true
    }) {
        super.initPath({
            parentPath,
            init: false
        });
        if (this.children && !init) {
            this.children.forEach(file => {
                file.initPath({parentPath: this.path, init: false});
            });
        }
    }
}

function checkPasteTarget (newPid, oldPid, name) {
    if (newPid === oldPid) {return false;}
    const newcs = getParentChildren(newPid);
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