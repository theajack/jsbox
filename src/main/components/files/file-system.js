// import {read, write, remove} from '../../../notebook';
import {read} from '../../../notebook';
import {JXDir, JXFile} from './file';
// import event from '../../js/event';
// import LZString from 'lz-string';

const FILES = 'files';

export const FILE_HEIGHT = 30;

let files = null;

export function initFileSystem () {
    let _f = read(FILES);
    if (!_f) {
        files = [];
    } else {

    }
    let dir = new JXDir({});
    new JXFile({
        parent: dir
    });
    files.push(dir);
    console.log(files);
    window.files = files;
    return files;
}

// function compress (str) {
//     return LZString.compress(str);
// }

// function decompress (str) {
//     return LZString.decompress(str);
// }

export function supportUploadDir () {
    return typeof document.createElement('input').webkitdirectory === 'boolean';
}