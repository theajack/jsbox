import $ from 'easy-dom-util';
import event from './event';
import {EVENT} from './constant';
import {dragPercent, dragStatus} from './status';
import {isCtrlPressed} from '../../util';

export function initResize () {
    window.addEventListener('resize', () => {
        let size = $.windowSize();
        event.emit(EVENT.RESIZE, size);
    }, false);
}

let timer = null;

function onKeyDown (e) {
    let c = (s) => {return s.charCodeAt(0);};
    let pd = () => {e.preventDefault();};
    if (e.keyCode === 122) {
        event.emit(EVENT.TOGGLE_FULLSCREEN);
        pd();
        return;
    }

    if (isCtrlPressed(e)) {
        let eventName = '', value = null;
        switch (e.keyCode) {
            case c('M'):eventName = EVENT.THEME_TOGGLE; pd(); break;
            case c('D'):eventName = EVENT.CLEAR_CODE; pd(); pd(); break;
            case c('S'):eventName = EVENT.SAVE_CODE; pd(); break;
            case c('Q'):eventName = EVENT.RESET_CODE; pd(); break;
            case c('P'):eventName = EVENT.COPY_CODE; pd(); break;
            case c('G'):eventName = EVENT.OPEN_LANG_CHOOSE; pd(); break;
            case c('L'):eventName = EVENT.OPEN_LIB_CHOOSE; pd(); break;
            case c('K'):eventName = EVENT.TOGGLE_LOG; pd(); break;
            case c('I'):eventName = EVENT.OPEN_ENV_CHOOSE; pd(); break;
            case c('O'):eventName = EVENT.OPEN_FILE; pd(); break;
            case c('E'):$.query('.tc-log-clear').el.click(); pd(); break;
            case 187:eventName = EVENT.FONT_SIZE_CHANGE; value = 'up'; pd(); break;
            case 189:eventName = EVENT.FONT_SIZE_CHANGE; value = 'down'; pd(); break;
            case c('Y'):eventName = EVENT.RUN_CODE; pd(); break;
        }
        if (eventName) {
            if (timer !== null) {
                return true;
            }
            timer = setTimeout(() => {
                timer = null;
            }, 200);
            event.emit(eventName, value);
            return true;
        }
    }
    return false;
}

export function initKeyEvent () {
    window.addEventListener('keydown', onKeyDown, false);
    event.regist(EVENT.EDITOR_MOUNTED, (editor) => {
        setTimeout(() => {
            let els = editor.el.querySelectorAll('.inputarea');
            for (let i = 0; i < els.length; i++) {
                els[i].addEventListener('keydown', (e) => {
                    if (onKeyDown(e)) {
                        e.stopPropagation();
                    }
                }, false);
            }
        }, 10);
    });
}

export function initDrag (drag) {
    let width = 0;
    let minWidth = 200;
    dragPercent.init();
    let setDrag = (bool) => {
        dragStatus.set(bool);
        if (bool) {
            width = $.windowSize().width;
            drag.classList.add('active');
        } else {
            dragPercent.save();
            drag.classList.remove('active');
        }
    };
    let setSize = (x) => {
        if (x < minWidth || x > width - minWidth) {
            return;
        }
        dragPercent.stash(((x) / width) * 100);
    };
    $.query('body').on({
        mousemove (e) {
            if (dragStatus.get()) {
                setSize(e.clientX);
            }
        },
        mouseup () {
            if (dragStatus.get()) {
                setDrag(false);
            }
        },
        mouseenter () {
            setDrag(false);
        }
    });
    $.query(drag).on({
        mousedown () {
            setDrag(true);
        }
    });
}
