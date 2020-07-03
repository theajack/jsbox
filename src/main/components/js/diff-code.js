import {idFiles} from '../files/file-system';
import event from '../../js/event';
import {EVENT} from '../../js/constant';
import {globalFileAttr} from '../files/file';
import {diffCodes} from './store';


export function setDiffCode () {
    if (globalFileAttr.menuFileId !== -1) {
        let file = idFiles[globalFileAttr.menuFileId];
        diffCodes.prev = file.usContent || file.content;
        diffCodes.prevPath = file.path;
        event.emit(EVENT.DIFF_CODE_CHOOSED, file.name);
    }
}
export function diffCode () {
    if (globalFileAttr.menuFileId !== -1) {
        let file = idFiles[globalFileAttr.menuFileId];
        diffCodes.next = file.usContent || file.content;
        diffCodes.lang = file.lang;
        diffCodes.nextPath = file.path;
        event.emit(EVENT.OPEN_DIFF, diffCodes);
    }
}

