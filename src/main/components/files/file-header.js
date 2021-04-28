import {globalFileAttr, clearFileAttrById} from './file';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE} from '../../js/constant';
import {readFilesHeader, markFilesHeaderChange, markOpenedFileIDChange, markContentsChange} from './storage';
import {idFiles, switchOpenFile} from './file-system';

export let fileHeaderList = null;

export function clearHeaderByRemoveFile (file) {
    clearFileAttrById(file.id);
    if (file.type === FILE_TYPE.DIR) {
        file.children.forEach((item) => {
            clearHeaderByRemoveFile(item);
        });
    } else {
        removeFromHeaderByFile(file);
    }
    markFilesHeaderChange();
}

function removeFromHeaderByFile (file) {
    const index = fileHeaderList.indexOf(file);
    if (index !== -1) {
        fileHeaderList.splice(index, 1);
    }
}

export function clearFileHeader () {
    fileHeaderList.splice(0, fileHeaderList.length);
}

export function initFileHeaders () {
    if (fileHeaderList) {
        return fileHeaderList;
    }
    fileHeaderList = readFilesHeader();
    return fileHeaderList;
}

export function onFileClick (file) {
    // let file = idFiles[id];
    if (!file || file.type !== FILE_TYPE.FILE) {
        return;
    }
    if (globalFileAttr.openedId === file.id) {
        return;
    }
    onOpenFile(file.id, false);
    if (!fileHeaderList.find(item => {return item.id === file.id;})) {
        fileHeaderList.push(file);
        // 打开新文件
        markFilesHeaderChange();
    }
    event.emit(EVENT.FILE_CLICK, file);
}

export function onOpenFile (id, focus = true) {
    switchOpenFile(id, globalFileAttr.openedId);
    globalFileAttr.openedId = id;
    idFiles[id].__focus = focus;
    checkParent(id);
    markOpenedFileIDChange();
}

export function checkParent (id) {
    const parentId = idFiles[id].parentId;
    if (parentId !== ROOT) {
        idFiles[parentId].open();
    }
}

export function onChangeContentFile (id) {
    globalFileAttr.contentId = id;
    markContentsChange();
}

export function onRemoveFileHeader (index) {
    fileHeaderList.splice(index, 1);
    // console.log(fileHeaderList);
    markFilesHeaderChange();
}