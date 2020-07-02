import {readFiles, writeFiles} from './storage';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE} from '../../js/constant';
import {globalFileAttr, JXFile, JXDir} from './file';
import {initUnsaveEvent} from './file-save-status';

export let files = null;

export let idFiles = {};

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
    console.log('file.usContent', code);
    file.usContent = code;
}
export function createNewFile (name = '', parentId = getCurrentParentId()) {
    console.log(parentId);
    let {children, parent} = getParent(parentId);
    children.push(new JXFile({
        parent,
        name
    }));
}
export function createNewDir (name = '', parentId = getCurrentParentId()) {
    console.log(parentId);
    let {children, parent} = getParent(parentId);
    children.push(new JXDir({
        parent,
        name
    }));
}
window.createNewFile = createNewFile;
window.createNewDir = createNewDir;

function getCurrentParentId () {
    let cid = globalFileAttr.contentId;
    if (cid === -1) {
        return ROOT;
    }
    let file = idFiles[cid];
    if (file.type === FILE_TYPE.DIR) {
        file.open();
        return file.id;
    }
    return file.parentId;
}

function getParent (parentId) {
    if (parentId === ROOT) {
        return {
            children: files,
            parent: ROOT
        };
    }
    return {
        children: idFiles[parentId].children,
        parent: idFiles[parentId]
    };
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
    let children = getParent(parentId).children;
    children.sort((a, b) => {
        if (a.type === FILE_TYPE.DIR && b.type === FILE_TYPE.FILE) {
            return -1;
        }
        if (a.type === FILE_TYPE.FILE && b.type === FILE_TYPE.DIR) {
            return 1;
        }
        return a.name.charCodeAt(0) - b.name.charCodeAt(0);
    });
}

window.sortFiles = sortFiles;