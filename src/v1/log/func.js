import tool from './tool';
import TYPE from './type';
let state = TYPE.all;
let laseEl;
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
        let childs = el.children;
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
    let el = log.blockList;
    laseEl = gc(el, TYPE.all);
    return tool.append(
        tool.create('div', 'log-funcs'),
        [
            tool.create('div', 'log-func log-clear', '+', () => {
                log.blockList.innerHTML = '';
                console.tc('Console all clear');
            }),
            gc(el, TYPE.error),
            gc(el, TYPE.warn),
            gc(el, TYPE.info),
            gc(el, TYPE.log),
            gc(el, TYPE.tc),
            laseEl
        ]
    );
}
export function checkType (el, type) {
    if (state !== TYPE.all && type !== state) {
        el.style.display = 'none';
    }
}