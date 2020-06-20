import {compress, decompress} from './compress';
let storage = window.localStorage;

export const TYPE = {
    CODE: 'code',
    THEME: 'theme',
    DRAG_PERCENT: 'drag_percent',
    DRAG_STATUS: 'drag_status',
    LANGUAGE: 'language',
    HTML_PANEL: 'html_panel',
    FONT_SIZE: 'font_size',
};

const encodeList = [TYPE.CODE];

function checkEncode (key, value, encode = true) {
    if (encodeList.indexOf(key) !== -1) {
        if (encode) {
            return compress(value);
        }
        return decompress(value);
    }
    return value;
}

export function read (key) {
    let value = storage.getItem(geneKey(key));
    if (value === null) {
        return null;
    }
    let type = value.substr(0, value.indexOf(':'));
    value = value.substr(value.indexOf(':') + 1);
    value = checkEncode(key, value, false);
    if (type === 'number') {
        return parseFloat(value);
    } else if (type === 'boolean') {
        return value === 'true';
    } else if (type === 'object') {
        return JSON.parse(type);
    }
    return value;
}

export function write (key, value) {
    let type = typeof value;
    if (type === 'object') {
        value = JSON.stringify(value);
    } else if (type !== 'string') {
        value = value.toString();
    }
    value = checkEncode(key, value);
    value = `${type}:${value}`;
    storage.setItem(geneKey(key), value);
}

export function remove (key) {
    storage.removeItem(geneKey(key));
}

function geneKey (key) {
    return key + '_jsbox';
}