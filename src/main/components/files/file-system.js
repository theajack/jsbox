// import {read, write, remove} from '../../../notebook';
import {read} from '../../../notebook';
// import LZString from 'lz-string';

const FILES = 'files';

let files = null;

export function initFileSystem () {
    // debugger;
    let _f = read(FILES);
    if (!_f) {
        files = [];
    } else {

    }
    console.log(files);
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