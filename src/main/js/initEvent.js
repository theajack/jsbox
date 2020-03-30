import $ from 'easy-dom-util';
import {TYPE, read, write} from './notebook';
import event from './event';
import {EVENT} from './constant';


export function initResize () {
    window.addEventListener('resize', () => {
        let size = $.windowSize();
        event.emit(EVENT.RESIZE, size);
    }, false);
}

export function initKeyEvent (el, method) {
    window.onkeydown = (event) => {
        if (event.ctrlKey) {
            let c = (s) => {return s.charCodeAt(0);};
            let pd = () => {event.preventDefault();};
            switch (event.keyCode) {
                case c('M'):method.theme(); pd(); break;
                case c('D'):method.clear(); pd(); break;
                case c('S'):method.save(); pd(); break;
                case c('Q'):method.reset(); pd(); break;
                case c('P'):method.copy(); pd(); break;
                case c('I'):method.config(); pd(); break;
                case c('L'):method.link(); pd(); break;
                case c('K'):method.toggleLog(); pd(); break;
                case c('N'):method.env(); pd(); break;
                case c('E'):$.query('.tc-log-clear').el.click(); pd(); break;
                case 187:method.fontUp(); pd(); break;
                case 189:method.fontDown(); pd(); break;
                case 13:method.run(); pd(); break;
            }
                
        }
    };
    el.code.query('.code_editor')[0].el.onkey = (event) => {
        if (event.ctrlKey) {
            let pd = () => {event.preventDefault();};
            switch (event.keyCode) {
                case 13:pd(); break;
            }
        }
    };

}

export function initDrag (drag) {
    let isDrag = false;
    let width = 0;
    let minWidth = 200;
    let percent = 50;
    let setDrag = (bool) => {
        isDrag = bool;
        event.emit(EVENT.DRAG_STATUS, bool);
        if (bool) {
            width = $.windowSize().width;
        } else {
            write(TYPE.PERCENT, percent);
        }
    };
    let setPercent = () => {
        event.emit(EVENT.DRAG_PERCENT, percent);
    };
    let setSize = (x) => {
        if (x < minWidth || x > width - minWidth) {
            return;
        }
        percent = (x / width) * 100;
        setPercent();
    };
    if (read(TYPE.PERCENT)) {
        percent = read(TYPE.PERCENT);
        setPercent();
    }
    $.query('body').on({
        mousemove (e) {
            if (isDrag) {
                setSize(e.clientX);
            }
        },
        mouseup () {
            if (isDrag) {
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
