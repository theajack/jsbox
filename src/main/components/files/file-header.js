import {globalFileAttr, clearFileAttrById} from './file';
import event from '../../js/event';
import {EVENT, ROOT, FILE_TYPE} from '../../js/constant';
import {readFilesHeader, writeFilesHeader, writeOpenFileID, writeContentFileID} from './storage';
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
    writeFilesHeader();
}

function removeFromHeaderByFile (file) {
    let index = fileHeaderList.indexOf(file);
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
    onOpenFile(file.id);
    if (!fileHeaderList.find(item => {return item.id === file.id;})) {
        fileHeaderList.push(file);
        // 打开新文件
        writeFilesHeader();
    }
    event.emit(EVENT.FILE_CLICK, file);
}

export function onOpenFile (id) {
    switchOpenFile(globalFileAttr.openedId, id);
    globalFileAttr.openedId = id;
    checkParent(id);
    writeOpenFileID();
}

export function checkParent (id) {
    let parentId = idFiles[id].parentId;
    if (parentId !== ROOT) {
        idFiles[parentId].open();
    }
}

export function onChangeContentFile (id) {
    globalFileAttr.contentId = id;
    writeContentFileID();
}

export function onRemoveFileHeader (index) {
    fileHeaderList.splice(index, 1);
    // console.log(fileHeaderList);
    writeFilesHeader();
}