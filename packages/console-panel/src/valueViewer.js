import tool from './tool';
import {generateLogBlock, copyText} from './util';
const STRING_MAX = 300;

function valueViewer (value, type, isHtml) {
    return (new ValuetViewer(value, type, isHtml))._block;
}

class ValuetViewer {
    constructor (value, type, isHtml) {
        if (isHtml) {
            this.html = true;
            this._block = generateLogBlock(type);
            const content = tool.create('div');
            tool.append(this._block, content);
            content.innerHTML = value.toString();
            tool.append(content, tool.create('span', 'log-copy', 'copy', () => {
                copyText(content.innerText.replace(/ copy$/, ''));
            }));
        } else {
            this._block = generateLogBlock(type);
            tool.append(this._block, generateDiv(value, type));
        }
    }
}

{/* <i class="ei-exclamation-sign"></i>
<i class="ei-remove-sign"></i>
<i class="ei-info-sign"></i> */}
function generateDiv (value, type) {
    const div = tool.create('div');
    switch (typeof value) {
        case 'undefined': generateLogSpan(div, 'undefined'); break;
        case 'object': generateLogSpan(div, 'null'); break;// 只可能是null
        case 'string': generateLogSpan(div, checkMaxLength(value), 'obj-string'); break;
        case 'number': generateLogSpan(div, value, 'obj-number'); break;
        case 'boolean': generateLogSpan(div, value); break;
        case 'function': generateLogSpan(div, checkMaxLength(value.toString()), 'obj-def'); break;
        default :generateLogSpan(div, 'undefined'); break;
    }
    tool.append(div, tool.create('span', 'log-copy', 'copy', () => {
        copyText(value);
    }));
    let iconClass = '';
    switch (type) {
        case 'info': iconClass = 'ei-info-sign'; break;
        case 'error': iconClass = 'ei-remove-sign'; break;
        case 'warn': iconClass = 'ei-exclamation-sign'; break;
        default :break;
    }
    if (iconClass) {
        const icon = tool.create('i');
        tool.addClass(icon, iconClass + ' tc-log-icon');
        div.insertBefore(icon, div.children[0]);
    }
    return div;
}

function checkMaxLength (str) {
    if (str.length > STRING_MAX) {
        // tool.append(div,tool.create('span','log-copy','copy',()=>{
        //     copyText(str);
        // }))
        return str.substring(0, STRING_MAX) + '...';
    }
    return str;
}

function generateLogSpan (div, str, cls) {
    const span = tool.create('span', cls || 'obj-key', str.toString());
    if (div.children.length === 0) {
        div.appendChild(span);
    } else {
        div.insertBefore(span, div.children[0]);
    }
}

export default valueViewer;