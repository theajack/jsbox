import {toast} from '../../../js/util';
import {files} from '../file-system';
import {getLoaderByFileName} from './loader';

const entry = '/index.html';

function getEntryFile () {
    return files.find(file => file.name === entry);
}

export function startCompileModules () {
    const entryFile = getEntryFile();

    if (!entryFile) {
        toast.error(`入口文件 ${entry} 未找到, 运行失败`);
        return;
    }

    // console.log(entryFile);
    console.log(`编译开始，入口文件=${entry}`);
    compileSingleFile(entry);
}


function compileSingleFile (file) {
    const loader = getLoaderByFileName();
}