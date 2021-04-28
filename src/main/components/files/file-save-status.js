import {globalFileAttr} from './file';
import {saveFile, unsaveFile} from './file-system';

const {default: event} = require('../../js/event');
const {EVENT} = require('../../js/constant');

let unsaveFiles = [];

export function initUnsaveEvent () {
    event.regist(EVENT.CODE_CHANGE, (code) => {
        // console.log(EVENT.CODE_CHANGE, code);
        if (unsaveFiles.indexOf(globalFileAttr.openedId) === -1) {
            unsaveFiles.push(globalFileAttr.openedId);
        }
        unsaveFile(globalFileAttr.openedId, code);
        // console.log('unsaveFiles', unsaveFiles);
    });
    event.regist(EVENT.SAVE_CODE, (a) => {
        console.log('SAVE_CODE', a);
        unsaveFiles.forEach(id => {
            saveFile(id);
        });
        unsaveFiles = [];
    });
    event.regist(EVENT.SAVE_SINGLE_CODE, () => {
        if (globalFileAttr.openedId === -1) {
            return;
        }
        const index = unsaveFiles.indexOf(globalFileAttr.openedId);
        if (index === -1) {
            return;
        }
        saveFile(globalFileAttr.openedId);
        unsaveFiles.splice(index, 1);
    });
    window.unsaveFiles = unsaveFiles;
    // window.addEventListener('beforeunload', function (e) {
    //     var confirmationMessage = (unsaveFiles.length > 0) ? `当前有${unsaveFiles.length}个文件未保存，是否放弃保存` : '';
    //     (e || window.event).returnValue = confirmationMessage;
    //     return confirmationMessage;
    // });
}
