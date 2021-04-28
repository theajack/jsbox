import $ from 'easy-dom-util';
import event from './event';
import {EVENT} from './constant';
import {dragPercent, dragStatus} from './status';

export function initResize () {
    window.addEventListener('resize', () => {
        const size = $.windowSize();
        event.emit(EVENT.RESIZE, size);
    }, false);
}

let timer = null;

function onKeyDown (e) {
    const c = (s) => {return s.charCodeAt(0);};
    const pd = () => {e.preventDefault();};
    if (e.keyCode === 122) {
        event.emit(EVENT.TOGGLE_FULLSCREEN);
        pd();
        return true;
    }

    if (e.ctrlKey) {
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
            case c('C'):eventName = EVENT.COPY; value = e; break;
            case c('X'):eventName = EVENT.CUT; value = e; break;
            case c('V'):eventName = EVENT.PASTE; value = e; break;
        }
        // console.log(e.target);
        if (e.altKey) {
            switch (e.keyCode) {
                case c('S'):eventName = EVENT.SAVE_SINGLE_CODE; pd(); break;
            }
        }
        if (eventName) { // 防止快速重复出发两次事件
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
            const els = editor.el.querySelectorAll('.inputarea');
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
    const minWidth = 200;
    dragPercent.init();
    const setDrag = (bool) => {
        dragStatus.set(bool);
        if (bool) {
            width = $.windowSize().width;
        } else {
            dragPercent.save();
        }
    };
    const setSize = (x) => {
        if (x < minWidth || x > width - minWidth) {
            return;
        }
        dragPercent.stash((x / width) * 100);
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
