import event from '../../js/event';
import {EVENT} from '../../js/constant';
import {write, read} from '../../js/notebook';

let historyMax = 50;
let history = read('history') || [];
let historyIndex = history.length;
let element = null;
let currentValue = '';

export function initConsole (el) {
    element = el;
    window.element = el;
    element.addEventListener('keydown', function (e) {
        if (e.keyCode === 38 || e.keyCode === 40) { // up || down
            let line = getCursorLine(this);
            if (e.keyCode === 38 && line === 1) {
                prev();
                e.preventDefault();
            } else if (e.keyCode === 40 && line === getLines()) {
                next();
                e.preventDefault();
            }
        }
    });
    element.addEventListener('keyup', function (e) {
        if (e.ctrlKey && e.keyCode === 13) {
            runConsole();
        }
    });
    element.addEventListener('input', function () {
        currentValue = this.innerText;
    });
}
function getCursorLine () {
    let range = window.getSelection().getRangeAt(0);// 找到焦点位置
    let span = document.createElement('span');
    span.innerHTML = '__CT_LINE__';
    range.insertNode(span);// 在焦点插入节点
    let val = element.innerText;
    let line = val.substring(0, val.indexOf('__CT_LINE__')).split('\n').length;
    span.parentNode.removeChild(span);
    return line;
}

export function focusEnd () {
    element.focus();
    var sel = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

function getLines () {
    return element.innerText.split('\n').length;
}

function runConsole () {
    let code = element.innerText;
    pushToHistory(code);
    event.emit(EVENT.RUN_CODE, code);
}

function pushToHistory (code) {
    history.push(code);
    if (history.length > historyMax) {
        history.shift();
    }
    historyIndex = history.length;
    element.innerText = '';
    currentValue = '';
    write('history', history);
}

function prev () {
    if (historyIndex > 0) {
        historyIndex--;
        element.innerText = history[historyIndex];
        focusEnd();
    }
}

function next () {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        element.innerText = history[historyIndex];
        focusEnd();
    } else if (element.innerText !== currentValue) {
        element.innerText = currentValue;
        historyIndex++;
        focusEnd();
    }
}
