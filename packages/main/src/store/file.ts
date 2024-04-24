/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-22 23:47:41
 * @Description: Coding something
 */
import { defineStore } from 'pinia';
import { shallowReactive, ShallowReactive } from 'vue';
import { Dir, Disk, FileBase, IJson } from 'webos-term';

// ! 建立文件map类，快速根据id找到文件
const fileMap: IJson<IUIFile> = {};

export interface IUIFile {
    name: string;
    id: string;
    isDir: boolean;
    saved: boolean;
    children?: IUIFile[];
    file: FileBase;
}

function parseChildren (children: (FileBase)[]) {
    console.log(children.length, '2121');
    return children.map(item => {
        const file: ShallowReactive<IUIFile> = shallowReactive({
            name: item.name,
            id: item.id,
            isDir: item.isDir,
            saved: true,
            file: item
        });
        fileMap[item.id] = file;
        console.log(file.name, file.isDir);
        if (file.isDir) file.children = parseChildren((item as Dir).children);
        return file;
    });
}

export const useFileStore = defineStore('file', {
    state: () => {
        return {
            rootDir: '', // 当前打开的项目
            // ! 打开的文件头部 二维数组 因为代码编辑器可以分栏
            fileHeaders: [] as IUIFile[][],
            // 当前项目下的所有文件
            files: [] as IUIFile[]
        };
    },
    actions: {
        initFiles (dir: Dir) {
            this.files = parseChildren(dir.children);
        }
    }
});

(async () => {
    const disk = new Disk();
    await disk.initFileSystem();
    useFileStore().initFiles(disk);
})();

window.useFile = useFileStore;

// window.disk = new Disk();

// new Disk().createFile;