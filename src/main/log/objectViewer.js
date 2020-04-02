import tool from './tool';
import {generateLogBlock} from './util';
const MAX_DEEP = 8;
function objectViewer (obj, type, name) {
    return (new ObjectViewer(obj, type, name))._block;
}
objectViewer.test = function (arg) {
    return typeof arg === 'object' && arg !== null;
};

class ObjectViewer {
    constructor (obj, type, name) {
        this._block = generateLogBlock(type);
        this.deep = 0;
        traverse.call(this, this._block, name || obj.constructor.name, obj);
    }
}

function nextEl (el) {
    let child = Array.prototype.slice.apply(el.parentNode.children);
    return child[child.indexOf(el) + 1];
}
let hugeObjectList = [HTMLElement, HTMLDocument];
function checkHugeObject (block, key, obj) {
    for (var i = 0; i < hugeObjectList.length; i++) {
        if (obj instanceof hugeObjectList[i]) {
            let str = obj.constructor.name, cls = 'cls';
            if (hugeObjectList[i] === HTMLElement) {
                str = obj.tagName.toLowerCase();
                if (obj.className !== '') {
                    str += ('.' + (obj.className.split(' ').join('.')));
                }
                cls = 'key';
            }
            let div = generateUnopenHead();
            div.innerHTML = '<span class="tc-obj-key">' + key + '</span>: [<span class="tc-obj-' + cls + '">' + str + '</span>]'; ;
            tool.append(block, div);
            return true;
        }
    }
    return false;
}

// 生成head
function generateHead (block, key, obj) {
    if (checkHugeObject(block, key, obj)) {
        return false;
    }
    let html, _objHead;
    if (obj === null) {
        html = '<span class="tc-obj-key">' + key + '</span>:<span class="tc-obj-key"> null</span>';
        _objHead = generateUnopenHead();
    } else {
        let isArray = obj instanceof Array;
        let start = isArray ? '[' : '{';
        let end = isArray ? ']' : '}';
        html = `<span class="tc-obj-key">${key}${isArray ? `(<span class="tc-obj-number">${obj.length}</span>)` : ''}</span>: ${start}`;
        let isEmpty = true;
        for (var k in obj) {
            if (isEmpty)isEmpty = false;
            html += generateItem(k, obj[k], isArray, true);
        }
        _objHead = tool.create('div', 'log-obj-head log-ell');
        if (!isEmpty) {
            html = '<span class="tc-log-angle"></span> ' + html.substr(0, html.length - 1);
            _objHead.onclick = function () {
                let openClass = (this.children[0].className.indexOf('tc-open') !== -1) ? '' : ' tc-open';
                nextEl(this).className = 'tc-log-obj-view' + openClass;
                this.children[0].className = 'tc-log-angle' + openClass;
            };
        }
        html += end;
    }
    _objHead.innerHTML = html;
    tool.append(block, _objHead);
    return true;
}
// 生成head中单个键值对
function generateItem (key, value, isArray, needTail) {
    let html = isArray ? '' : ('<span class="tc-obj-key">' + key + '</span>:');
    switch (typeof value) {
        case 'object':
            if (value === null) {
                html += '<span class="tc-obj-key">null</span>';
            } else {
                if (value instanceof HTMLElement) {
                    html += '&lt;<span class="tc-obj-key">' + value.tagName.toLowerCase() + '</span>/&gt;';
                } else if (value instanceof HTMLDocument) {
                    html += '(#document)';
                } else {
                    html += ((value instanceof Array) ? '[…]' : '{…}');
                }
            }
            ;break;
        case 'string':html += '<span class="tc-obj-string">"' + value + '"</span>'; break;
        case 'number':html += '<span class="tc-obj-number">' + value + '</span>'; break;
        case 'boolean':html += '<span class="tc-obj-key">' + value + '</span>'; break;
        case 'function':html += ' <span class="tc-obj-key">f</span>(){}'; break;
        default :html += value.toString();
    }
    if (needTail) {
        html += ',';
    }
    return html;
}

// 生成一个子级不可展开的head
function generateOpenItem (block, key, value) {
    let div = generateUnopenHead();
    div.innerHTML = generateItem(key, value);
    block.appendChild(div);
}
// 生成一个不可展开的head
function generateUnopenHead () {
    return tool.create('div', 'log-obj-head log-ell log-node', '', function () {
        console.tc(this.innerText);
    });
}

// 生成一个json详情view
function generateView (block) {
    let _objView = tool.create('div', 'log-obj-view');
    block.appendChild(_objView);
    return _objView;
}

function traverse (block, key, obj) {
    if (!checkMaxDeep.call(this, block, key, obj)) {
        return;
    }
    obj = dealDate(obj);
    if (!generateHead(block, key, obj)) {
        return;
    }
    let view = generateView(block);
    for (var k in obj) {
        if (typeof obj[k] === 'object') {
            traverse.call(this, view, k, obj[k]);
        } else {
            generateOpenItem(view, k, obj[k]);
        }
    }
}

function checkMaxDeep (block, key, obj) {
    if (this.deep > MAX_DEEP) {
        let div = generateUnopenHead();
        let str;
        try {
            str = JSON.stringify(obj);
        } catch (e) {
            if (typeof obj.toString === 'function') {
                str = obj.toString();
            } else {
                str = '[' + (typeof obj) + ']';
            }
        }
        div.innerHTML = '<span class="tc-obj-key">' + key + '</span>: ' + str;
        tool.append(block, div);
        return false;
    }
    this.deep++;
    return true;
}

function dealDate (obj) {
    if (obj instanceof Date) {
        let res = {
            time: obj.getTime(),
            year: obj.getFullYear(),
            month: obj.getMonth(),
            date: obj.getDate(),
            day: obj.getDay(),
            value: obj.toString(),
            localValue: obj.toLocaleString(),
        };
        return res;
    }
    return obj;
}


export default objectViewer;