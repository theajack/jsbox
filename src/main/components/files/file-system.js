import {readFiles, markFilesChange} from './storage';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE, FILE_NONE, SELECT_TYPE} from '../../js/constant';
import {globalFileAttr, JXFile, JXDir} from './file';
import {initUnsaveEvent} from './file-save-status';
import {formatEditorByFileId} from '../js/editor-pool';
import {autoFormat} from '../../js/status';
import {getSelectedIds} from '../js/file-selected';

export let files = null;

export let idFiles = {};
export function getCurrentFile () {
    return idFiles[globalFileAttr.openedId];
}
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
        switchOpenFile(globalFileAttr.openedId, FILE_NONE);
        initUnsaveEvent();
    }

    window.files = files;
    return files;
}

export function supportUploadDir () {
    return typeof document.createElement('input').webkitdirectory === 'boolean';
}

// eslint-disable-next-line no-unused-vars
export function switchOpenFile (newId, oldId) {
    // console.log(newId, oldId);
    // if (isValidId(oldId)) {
    //     event.emit(EVENT.USE_CODE, (code) => {
    //         idFiles[oldId].unsavedContent = code;
    //         // console.log('oldId', code);
    //         markFilesChange();
    //     });
    // }
    
    if (isValidId(newId)) {
        // const file = idFiles[newId];
        // event.emit(EVENT.SET_CODE, file.unsave ? file.unsavedContent : file.content);
        event.emit(EVENT.ON_FILE_OPEN, idFiles[newId]);
        // console.log('newId', file.content);
    }
}

function isValidId (id) {
    return (typeof id === 'number' && id !== FILE_NONE);
}

export function saveFile (id) {
    const save = () => {
        console.log(id);
        const file = idFiles[id];
        file.unsave = false;
        console.log('file.content', file.content, file.unsavedContent);
        file.content = file.unsavedContent;
        file.unsavedContent = '';
        markFilesChange();
    };
    if (autoFormat.get()) {
        formatEditorByFileId(id, () => {
            save();
        });
    } else {
        save();
    }
}
export function unsaveFile (id, code) {
    const file = idFiles[id];
    file.unsave = true;
    // console.log('file.unsavedContent', code);
    file.unsavedContent = code;
}
export function createNewFile (name = '', parentId = getCurrentParentId()) {
    createBase(JXFile, name, parentId);
}
export function createNewDir (name = '', parentId = getCurrentParentId()) {
    createBase(JXDir, name, parentId);
}
function createBase (JXClass, name, parentId) {
    const children = getParentChildren(parentId);
    const file = new JXClass({
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
    const cid = globalFileAttr.contentId;
    if (cid === FILE_NONE || typeof cid !== 'number' ) {
        return ROOT;
    }
    const file = idFiles[cid];
    if (file.type === FILE_TYPE.DIR) {
        file.open();
        return file.id;
    }
    return file.parentId;
}

function getParentPath (parentId) {
    return parentId === ROOT ? '' : idFiles[parentId].path;
}

export function getParentChildren (parentId, searchParent = false) {
    if (parentId === ROOT) {return files;}
    if (idFiles[parentId].type === FILE_TYPE.FILE || searchParent) {
        return getParentChildren(idFiles[parentId].parentId);
    }
    return idFiles[parentId].children;
}
window.getParentChildren = getParentChildren;

export function openAllFolder () {
    folderCommon('open');
}

export function closeAllFolder () {
    folderCommon('close');
}

function folderCommon (func) {
    for (const k in idFiles) {
        const file = idFiles[k];
        if (file.type === FILE_TYPE.DIR) {
            file[func]();
        }
    }
    markFilesChange();
}

export function sortFiles (parentId = ROOT) {
    const children = getParentChildren(parentId);
    children.sort((a, b) => {
        if (a.type === FILE_TYPE.DIR && b.type === FILE_TYPE.FILE) {
            return FILE_NONE;
        }
        if (a.type === FILE_TYPE.FILE && b.type === FILE_TYPE.DIR) {
            return 1;
        }
        let index = 0;
        const num = () => {
            return a.name.charCodeAt(index) - b.name.charCodeAt(index);
        };
        let d = num();
        while (d === 0) {
            index ++;
            if (index === a.name.length) {
                return FILE_NONE;
            }
            if (index === b.name.length) {
                return 1;
            }
            d = num();
        }
        return d;
    });
}

export function copyFile (type = SELECT_TYPE.SELECTED) {
    checkLastCutFile();
    const ids = getSelectedFilesId(type);
    globalFileAttr.copyFileIds = ids;
    globalFileAttr.cutFileIds = [];
    event.emit(EVENT.PASTE_FILE_CHANGE, true);
}

function getSelectedFilesId (type) {
    const ids = getSelectedIds();
    if (ids.length > 0) return ids.map(id => id); // 克隆一份
    switch (type) {
        case SELECT_TYPE.MENU: return [globalFileAttr.menuFileId];
        case SELECT_TYPE.DRAG: return [globalFileAttr.dragId];
        case SELECT_TYPE.CONTENT: return [globalFileAttr.contentId];
    }
    return [];
}

export function cutFile (type = SELECT_TYPE.SELECTED) {
    // console.log('cutFile', id, globalFileAttr.menuFileId);
    checkLastCutFile();
    const ids = getSelectedFilesId(type);
    globalFileAttr.copyFileIds = [];
    globalFileAttr.cutFileIds = ids;
    event.emit(EVENT.PASTE_FILE_CHANGE, true);
    ids.forEach((id) => {
        idFiles[id].cut();
    });
}

function checkLastCutFile () {
    if (globalFileAttr.cutFileIds.length !== 0) {
        globalFileAttr.cutFileIds.forEach(id => {
            idFiles[id].cutEnd();
        });
    }
}

export function pasteFile (parentId = globalFileAttr.menuFileId) {
    parentId = parentId === FILE_NONE ? ROOT : parentId;
    if (parentId !== ROOT && idFiles[parentId].type === FILE_TYPE.FILE) {
        parentId = idFiles[parentId].parentId;
    }
    const isCopyEmpty = globalFileAttr.copyFileIds.length === 0;
    const isCutEmpty = globalFileAttr.cutFileIds.length === 0;
    if (isCopyEmpty && isCutEmpty) {
        return;
    }
    let isCopy, cids;
    if (isCutEmpty) {
        cids = globalFileAttr.copyFileIds;
        isCopy = true;
    } else {
        cids = globalFileAttr.cutFileIds;
        isCopy = false;
    }

    cids.forEach(id => {
        const file = idFiles[id];
        if (isCopy) {
            file.copyTo(parentId);
        } else {
            file.cutTo(parentId);
            idFiles[id].cutEnd();
        }
    });
    // 打开目标文件夹
    if (parentId !== ROOT && idFiles[parentId].type === FILE_TYPE.DIR) {
        idFiles[parentId].open();
    }

    globalFileAttr.copyFileIds = [];
    globalFileAttr.cutFileIds = [];
    event.emit(EVENT.PASTE_FILE_CHANGE, false);
}

window.sortFiles = sortFiles;