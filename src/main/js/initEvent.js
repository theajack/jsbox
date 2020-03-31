import $ from 'easy-dom-util';
import event from './event';
import {EVENT} from './constant';
import {dragPercent, dragStatus} from './status';

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
    let width = 0;
    let minWidth = 200;
    dragPercent.init();
    let setDrag = (bool) => {
        dragStatus.set(bool);
        if (bool) {
            width = $.windowSize().width;
        } else {
            dragPercent.save();
        }
    };
    let setSize = (x) => {
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
