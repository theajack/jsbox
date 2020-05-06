// 生成压缩包下载
// https://www.cnblogs.com/diligenceday/p/5008777.html
// http://gildas-lormeau.github.io/zip.js/
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory 上传文件夹
export class JXFile {
    constructor ({
        name = 'file',
        parent = 'root',
    }) {
        this.parent = parent;
        this.name = name;
        this.type = 'file';
        this.content = '';
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
}

export class JXDir {
    constructor ({
        name = 'dir',
        parent = 'root',
    }) {
        this.type = 'dir';
        this.name = name;
        this.parent = parent;
        this.children = [];
    }
    remove () {
        
    }
}