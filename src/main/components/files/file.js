// 生成压缩包下载
// https://www.cnblogs.com/diligenceday/p/5008777.html
// http://gildas-lormeau.github.io/zip.js/
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory 上传文件夹

import {getLangStyle} from './file-type';
import {theme} from '../../js/status';
import event from '../../js/event';
import {EVENT} from '../../js/constant';
import {writeIDFiles} from './file-system';
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
export class JXFile {
    constructor ({
        id,
        name = 'file',
        parent = 'root',
        content = '',
    }) {
        this.id = typeof id === 'number' ? id : getID();
        writeIDFiles(this.id, this);
        this.parent = parent;
        this.name = name;
        this.style = getLangStyle(this.name);
        this.type = 'file';
        this.content = content;
        this.rename = false;
        this.unsave = false;
        if (this.parent && typeof this.parent !== 'string') {
            this.parent.children.push(this);
        }
    }
    getContent () {
        return this.content;
    }
    save () {
        
    }
    remove () {
        
    }
    click () {
        onChangeContentFile(this.id);
        writeContentFileID();
        onFileClick(this);
    }
    rename () {
        this.rename = true;
    }
}

export class JXDir {
    constructor ({
        id,
        name = 'dir',
        parent = 'root',
        opened = false,
        children = []
    }) {
        this.id = typeof id === 'number' ? id : getID();
        writeIDFiles(this.id, this);
        this.opened = opened;
        this.type = 'dir';
        this.name = name;
        this.parent = parent;
        this.rename = false;
        children.forEach(child => {
            child.parent = this;
        });
        this.children = children;
    }
    remove () {
        
    }
    click () {
        this.opened = !this.opened;
        onChangeContentFile(this.id);
        writeContentFileID();
        writeFiles();
    }
    open () {
        this.opened = true;
    }
    rename () {
        this.rename = true;
    }
}

window.JXDir = JXDir;
window.JXFile = JXFile;