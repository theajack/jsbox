import {read, write, remove, TYPE} from '../../js/notebook';
import {idFiles, clearFiles} from './file-system';
import {fileHeaderList, clearFileHeader} from './file-header';
import {globalFileAttr, JXDir, JXFile, clearFileAttr} from './file';
import {files} from './file-system';
import {fileId} from './file';
import {ROOT, FILE_TYPE} from '../../js/constant';

// 存储文件系统相关数据

const StorageMark = (() => {
    const NAMES = {
        FILE_ID: 'sm_fileId', // 文件id自增的索引信息
        FILE_CONTENT: 'sm_fileCt', // 目录选中的信息
        FILE_OPEN: 'sm_fileOpen', // 打开的文件信息
        FILE_HEADER: 'sm_fileHeader', // 文件头信息
        FILES: TYPE.FILES_STORAGE_KEY, // 文件系统信息 // 由于需要加密所以放在 TYPE 中
    };
    let needSave = false;
    const _storage = {};
    window._markStorage = _storage;

    return {
        setChange (name) {
            if (!_storage[name]) {
                let value = null;
                switch (name) {
                    case NAMES.FILE_ID: value = fileId; break;
                    case NAMES.FILE_CONTENT: value = globalFileAttr.contentId; break;
                    case NAMES.FILE_OPEN: value = globalFileAttr.openedId; break;
                    case NAMES.FILE_HEADER: value = fileHeaderList.map(item => item.id); break;
                    case NAMES.FILES: value = mapWriteFiles(files); break;
                }
                _storage[name] = () => {write(name, value);};
            }
            needSave = true;
        },
        readStorage (name) {
            const value = read(name);
            switch (name) {
                case NAMES.FILE_ID: return value || 0;
                case NAMES.FILE_CONTENT: return typeof value === 'number' ? value : -1;
                case NAMES.FILE_OPEN: return typeof value === 'number' ? value : -1;
                case NAMES.FILE_HEADER: return value ? value.map(id => idFiles[id]) : [];
                case NAMES.FILES: return value ? mapReadFiles(value, ROOT, '') : [];
            }
            return null;
        },
        triggerSave () {
            for (const k in _storage) {
                if (_storage[k]) {_storage[k]();}
            }
            needSave = false;
        },
        NAMES,
        needSave: () => needSave
    };
})();


// {id,children,content,name,opened} => {i,c,ct,n,o}
// 格式化files => storage
function mapWriteFiles (arr) {
    const _files = [];
    arr.forEach(item => {
        const file = {
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

// {i,c,ct,n,o} {id,children,content,name,opened}
// 格式化storage => files
function mapReadFiles (arr, parentId, path) {
    const files = [];
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

// 保存最新生成的文件id
export function readFileID () {
    return StorageMark.readStorage(StorageMark.NAMES.FILE_ID);
}

export function markFileIDChange () {
    StorageMark.setChange(StorageMark.NAMES.FILE_ID);
}

export function readContents () {
    return StorageMark.readStorage(StorageMark.NAMES.FILE_CONTENT);
}

export function markContentsChange () {
    StorageMark.setChange(StorageMark.NAMES.FILE_CONTENT);
}

export function readOpenFileID () {
    return StorageMark.readStorage(StorageMark.NAMES.FILE_OPEN);
}
export function markOpenedFileIDChange () {
    StorageMark.setChange(StorageMark.NAMES.FILE_OPEN);
}

export function readFilesHeader () {
    return StorageMark.readStorage(StorageMark.NAMES.FILE_HEADER);
}

export function markFilesHeaderChange () {
    StorageMark.setChange(StorageMark.NAMES.FILE_HEADER);
}


// 保存所有的文件
// {i,c,ct,n,o} {id,children,content,name,opened}
export function readFiles () {
    return StorageMark.readStorage(StorageMark.NAMES.FILES);
}

export function markFilesChange () {
    StorageMark.setChange(StorageMark.NAMES.FILES);
}


window.addEventListener('beforeunload', onbeforeunload, false);
window.StorageMark = StorageMark;
function onbeforeunload () {
    
    // ! 为防止频繁修改storage 都是存储改变 在页面刷新或者关闭时写入storege
    StorageMark.triggerSave();
    return '';
}

export function clearAllFiles () {
    remove(StorageMark.NAMES.FILES);
    remove(StorageMark.NAMES.FILE_HEADER);
    remove(StorageMark.NAMES.FILE_CONTENT);
    remove(StorageMark.NAMES.FILE_ID);
    remove(StorageMark.NAMES.FILE_OPEN);
    clearFiles();
    clearFileHeader();
    clearFileAttr();
}

window.onbeforeunload = onbeforeunload;
window.saveFileStorage = StorageMark.triggerSave;
window.clearAllFiles = clearAllFiles;