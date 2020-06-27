import {globalFileAttr} from './file';
import event from '../../js/event';
import {EVENT} from '../../js/constant';
import {readFilesHeader, writeFilesHeader, writeOpenFileID, writeContentFileID, writeFiles} from './storage';
import {idFiles, switchOpenFile} from './file-system';

export let fileHeaderList = [];

export function initFileHeaders () {
    fileHeaderList = readFilesHeader();
    return fileHeaderList;
}

export function onFileClick (file) {
    // let file = idFiles[id];
    if (!file || file.type !== 'file') {
        return;
    }
    event.emit(EVENT.FILE_CLICK, file);
    if (globalFileAttr.openedId === file.id) {
        return;
    }
    onOpenFile(file.id);
    if (!fileHeaderList.find(item => {return item.id === file.id;})) {
        fileHeaderList.push(file);
        // 打开新文件
        writeFilesHeader();
    }
}

export function onOpenFile (id) {
    switchOpenFile(globalFileAttr.openedId, id);
    globalFileAttr.openedId = id;
    checkParent(id);
    writeOpenFileID();
}

export function checkParent (id) {
    let parent = idFiles[id].parent;
    if (parent !== 'root' && !parent.opened) {
        parent.opened = true;
        writeFiles();
    }
}

export function onChangeContentFile (id) {
    globalFileAttr.contentId = id;
    writeContentFileID();
}

export function onRemoveFileHeader (index) {
    fileHeaderList.splice(index, 1);
    writeFilesHeader();
}