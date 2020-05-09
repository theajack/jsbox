// 生成压缩包下载
// https://www.cnblogs.com/diligenceday/p/5008777.html
// http://gildas-lormeau.github.io/zip.js/
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/webkitdirectory 上传文件夹
// https://blog.csdn.net/qq_37003559/article/details/103970901?depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1&utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromBaidu-1
export class JXFile {
    constructor ({
        name = 'file',
        parent = 'root',
    }) {
        this.parent = parent;
        this.name = name;
        this.type = 'file';
        this.content = '';
    }
    getContent () {

    }
    save () {
        
    }
    remove () {
        
    }
}

export class JXDir {
    constructor ({
        name = 'file',
        parent = 'root',
    }) {
        this.type = 'dir';
        this.name = name;
        this.parent = parent;
    }
}