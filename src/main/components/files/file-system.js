import {readFiles, writeFiles} from './storage';
import event from '../../js/event';
import {EVENT} from '../../js/constant';
import {globalFileAttr} from './file';
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