/*
 * @Author: chenzhongsheng
 * @Date: 2024-04-15 05:47:12
 * @Description: Coding something
 */
// import {EVENT} from '../js/constant';
// import event from '../js/event';
import tool from './tool';
// import TYPE from './type';
let laseEl;

const TYPE = {
    all: 'all',
    error: 'error',
    warn: 'warn',
    log: 'log',
    info: 'info',
    tc: 'tc',
    html: 'html'
}
let state = TYPE.all;

function gc (el, type) {
    let cls = 'log-func log-' + type;
    if (type === state) {
        cls += ' active';
    }
    return tool.create('div', cls, type[0].toUpperCase(), function () {
        if (type === state) {
            return;
        }
        if (laseEl) {laseEl.className = laseEl.className.replace('tc-active', '').trim();}
        state = type;
        laseEl = this;
        this.className += ' tc-active';
        const childs = el.children;
        if (state === TYPE.all) {
            for (var i = 0; i < childs.length; i++) {
                childs[i].style.display = 'block';
            }
        } else {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].className.indexOf('tc-log-' + type) !== -1) {
                    childs[i].style.display = 'block';
                } else {
                    childs[i].style.display = 'none';
                }
            }
        }
    });
}
export function generateFunc (log) {
    const el = log.blockList;
    laseEl = gc(el, TYPE.all);
    const array = [
        tool.create('div', 'log-func log-clear', '+', () => {
            log.blockList.innerHTML = '';
            // console.log('Console all clear');
        }),
        gc(el, TYPE.error),
        gc(el, TYPE.warn),
        gc(el, TYPE.info),
        gc(el, TYPE.log),
        // gc(el, TYPE.tc),
        laseEl
    ];
    const title = ['清空log(ctrl+e)', 'error', 'warning', 'info', 'log', '显示全部'];
    array.forEach((item, index) => {
        item.title = title[index];
    });
    const logFuncs = tool.create('div', 'log-funcs');
    // event.regist(EVENT.LOG_PANEL_VIS_CHANGE, visable => {
    //     logFuncs.style.display = visable ? 'block' : 'none';
    // });
    return tool.append(
        logFuncs,
        array
    );
}
export function checkType (el, type) {
    if (state !== TYPE.all && type !== state) {
        el.style.display = 'none';
    }
}