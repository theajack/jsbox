import {readFiles, writeFiles} from './storage';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE} from '../../js/constant';
import {globalFileAttr, JXFile, JXDir} from './file';
import {initUnsaveEvent} from './file-save-status';

export let files = null;

export let idFiles = {};
window.idFiles = idFiles;
export function clearFiles () {
    files.splice(0, files.length);
    idFiles = {};
}

export function writeIDFiles (id, item) {
    idFiles[id] = item;
}

export const FILE_HEIGHT = 30;


export function initFileSystem () {
    if (!files) {
        files = readFiles();
        event.regist(EVENT.MIAN_EDITOR_INITED, () => {
            switchOpenFile(-1, globalFileAttr.openedId);
        });
        initUnsaveEvent();
    }
    window.files = files;
    return files;
}

export function supportUploadDir () {
    return typeof document.createElement('input').webkitdirectory === 'boolean';
}

export function switchOpenFile (oldId, newId) {
    if (isValidId(oldId)) {
        event.emit(EVENT.USE_CODE, (code) => {
            idFiles[oldId].usContent = code;
            // console.log('oldId', code);
            writeFiles();
        });
    }
    
    if (isValidId(newId)) {
        let file = idFiles[newId];
        event.emit(EVENT.SET_CODE, file.unsave ? file.usContent : file.content);
        event.emit(EVENT.COUNT_FILE_SIZE);
        // console.log('newId', file.content);
    }
}

function isValidId (id) {
    return (typeof id === 'number' && id !== -1);
}

export function saveFile (id) {
    let file = idFiles[id];
    file.unsave = false;
    console.log('file.content', file.content, file.usContent);
    file.content = file.usContent;
    file.usContent = '';
}
export function unsaveFile (id, code) {
    let file = idFiles[id];
    file.unsave = true;
    // console.log('file.usContent', code);
    file.usContent = code;
}
export function createNewFile (name = '', parentId = getCurrentParentId()) {
    createBase(JXFile, name, parentId);
}
export function createNewDir (name = '', parentId = getCurrentParentId()) {
    createBase(JXDir, name, parentId);
}
function createBase (JXClass, name, parentId) {
    let children = getParentChildren(parentId);
    let file = new JXClass({
        parentId,
        name,
        path: getParentPath(parentId)
    });
    if (file.type === FILE_TYPE.DIR) {
        children.unshift(file);
    } else {
        for (let i = 0; i < children.length; i++) {
            if (children[i].type === FILE_TYPE.FILE) {
                children.splice(i, 0, file);
                return;
            }
        }
        children.push(file);
    }
}
window.createNewFile = createNewFile;
window.createNewDir = createNewDir;

function getCurrentParentId () {
    let cid = globalFileAttr.contentId;
    if (cid === -1 || typeof cid !== 'number' ) {
        return ROOT;
    }
    let file = idFiles[cid];
    if (file.type === FILE_TYPE.DIR) {
        file.open();
        return file.id;
    }
    return file.parentId;
}

function getParentPath (parentId) {
    return parentId === ROOT ? '' : idFiles[parentId].path;
}

export function getParentChildren (parentId) {
    return (parentId === ROOT) ? files : idFiles[parentId].children;
}

export function openAllFolder () {
    folderCommon('open');
}

export function closeAllFolder () {
    folderCommon('close');
}

function folderCommon (func) {
    for (let k in idFiles) {
        let file = idFiles[k];
        if (file.type === FILE_TYPE.DIR) {
            file[func]();
        }
    }
    writeFiles();
}

export function sortFiles (parentId = ROOT) {
    let children = getParentChildren(parentId);
    children.sort((a, b) => {
        if (a.type === FILE_TYPE.DIR && b.type === FILE_TYPE.FILE) {
            return -1;
        }
        if (a.type === FILE_TYPE.FILE && b.type === FILE_TYPE.DIR) {
            return 1;
        }
        let index = 0;
        let num = () => {
            return a.name.charCodeAt(index) - b.name.charCodeAt(index);
        };
        let d = num();
        while (d === 0) {
            index ++;
            if (index === a.name.length) {
                return -1;
            }
            if (index === b.name.length) {
                return 1;
            }
            d = num();
        }
        return d;
    });
}

export function copyFile (id = globalFileAttr.menuFileId) {
    globalFileAttr.copyFileId = id;
    globalFileAttr.cutFileId = -1;
    event.emit(EVENT.PASTE_FILE_CHANGE, true);
}

export function cutFile (id = globalFileAttr.menuFileId) {
    globalFileAttr.copyFileId = -1;
    globalFileAttr.cutFileId = id;
    event.emit(EVENT.PASTE_FILE_CHANGE, true);
}

export function pasteFile (id = globalFileAttr.menuFileId) {
    let parentId = id == -1 ? ROOT : id;
    if (globalFileAttr.copyFileId === -1 && globalFileAttr.cutFileId === -1) {
        return;
    }
    let isCopy, cid;
    if (globalFileAttr.copyFileId !== -1) {
        cid = globalFileAttr.copyFileId;
        isCopy = true;
    } else {
        cid = globalFileAttr.cutFileId;
        isCopy = false;
    }
    let file = idFiles[cid];
    
    if (isCopy) {
        file.copyTo(parentId);
    } else {
        file.cutTo(parentId);
    }
    globalFileAttr.copyFileId = -1;
    globalFileAttr.cutFileId = -1;
    event.emit(EVENT.PASTE_FILE_CHANGE, false);
}

window.sortFiles = sortFiles;