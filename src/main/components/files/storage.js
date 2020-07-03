import {read, write, TYPE, remove} from '../../js/notebook';
import {idFiles, switchOpenFile, clearFiles} from './file-system';
import {fileHeaderList, clearFileHeader} from './file-header';
import {globalFileAttr, JXDir, JXFile, clearFileAttr} from './file';
import {files} from './file-system';
import {fileId} from './file';
import {ROOT, FILE_TYPE} from '../../js/constant';

// 存储文件系统相关数据

let storageMark = {
    fileId: null,
    fileCtId: null,
    fileOpenId: null,
    fileHeader: null,
    files: null,
};

// 保存最新生成的文件id
export function readFileID () {
    let _f = read(TYPE.FILE_ID);
    return _f || 0;
}

export function writeFileID () {
    if (!storageMark.fileId) {
        storageMark.fileId = _writeFileID;
    }
}

function _writeFileID () {
    write(TYPE.FILE_ID, fileId);
}

// 保存目录选中的文件ID
export function readContentFileID () {
    let _f = read(TYPE.FILE_CONENT_ID);
    return typeof _f === 'number' ? _f : -1;
}

export function writeContentFileID () {
    if (!storageMark.fileCtId) {
        storageMark.fileCtId = _writeContentFileID;
    }
}
function _writeContentFileID () {
    write(TYPE.FILE_CONENT_ID, globalFileAttr.contentId);
}

// 保存打开的文件ID
export function readOpenFileID () {
    let _f = read(TYPE.FILE_OPEN_ID);
    return typeof _f === 'number' ? _f : -1;
}

export function writeOpenFileID () {
    if (!storageMark.fileOpenId) {
        storageMark.fileOpenId = _writeOpenFileID;
    }
}
function _writeOpenFileID () {
    write(TYPE.FILE_OPEN_ID, globalFileAttr.openedId);
}

// 保存打开的所有文件，只保存文件id数组

export function readFilesHeader () {
    let _f = read(TYPE.FILES_HEADER);
    if (!_f) {
        return [];
    }
    // 处理逻辑
    return  _f.map(id => {
        return idFiles[id];
    });
}

export function writeFilesHeader () {
    if (!storageMark.fileHeader) {
        storageMark.fileHeader = _writeFilesHeader;
    }
}
function _writeFilesHeader () {
    // 处理逻辑
    write(TYPE.FILES_HEADER, fileHeaderList.map(item => {
        return item.id;
    }));
}
// 保存所有的文件
// {i,c,ct,n,o} {id,children,content,name,opened}
export function readFiles () {
    let _f = read(TYPE.FILES);
    if (!_f) {
        return [];
    }
    return mapReadFiles(_f, ROOT, '');
}

// {i,c,ct,n,o} {id,children,content,name,opened}
function mapReadFiles (arr, parentId, path) {
    let files = [];
    arr.forEach(item => {
        let file = null;
        if (item.c) {
            file = new JXDir({
                id: item.i,
                name: item.n,
                parentId,
                path,
                children: mapReadFiles(item.c, item.i, path + '/' + item.n),
                opened: item.o === 1
            });
        } else {
            file = new JXFile({
                id: item.i,
                name: item.n,
                parentId,
                path,
                content: item.ct,
            });
        }
        files.push(file);
    });
    return files;
}


export function writeFiles () {
    // console.log('mark writeFiles');
    if (!storageMark.files) {
        storageMark.files = _writeFiles;
    }
}
function _writeFiles () {
    // 处理逻辑
    write(TYPE.FILES, mapWriteFiles(files));
}
// {i,c,ct,n,o} {id,children,content,name,opened}
function mapWriteFiles (arr) {
    let _files = [];
    arr.forEach(item => {
        let file = {
            n: item.name,
            i: item.id,
        };
        if (item.type === FILE_TYPE.FILE) {
            file.ct = item.content;
        } else {
            file.o = item.opened ? 1 : 0;
            file.c = mapWriteFiles(item.children);
        }
        _files.push(file);
    });
    return _files;
}

window.addEventListener('beforeunload', function () {
    switchOpenFile(globalFileAttr.openedId);
    saveFileStorage();
    return '';
});

function saveFileStorage () {
    for (let k in storageMark) {
        if (storageMark[k]) {
            storageMark[k]();
        }
    }
}

export function clearAllFiles () {
    remove(TYPE.FILES);
    remove(TYPE.FILES_HEADER);
    remove(TYPE.FILE_CONENT_ID);
    remove(TYPE.FILE_ID);
    remove(TYPE.FILE_OPEN_ID);
    clearFiles();
    clearFileHeader();
    clearFileAttr();
}

window.saveFileStorage = saveFileStorage;
window.clearAllFiles = clearAllFiles;