import {compress, decompress} from './compress';
const storage = window.localStorage;

export const TYPE = {
    CODE: 'code',
    THEME: 'theme',
    DRAG_PERCENT: 'drag_percent',
    DRAG_STATUS: 'drag_status',
    LANGUAGE: 'language',
    HTML_PANEL: 'html_panel',
    FONT_SIZE: 'font_size',
    HISTORY: 'history',
    CODE_DRAG_PERCENT: 'code_drag_percent',
    CODE_DRAG_STATUS: 'code_drag_status',
    FILE_DRAG_PERCENT: 'file_drag_percent',
    FILE_DRAG_STATUS: 'file_drag_status',
    AUTO_FORMAT: 'auto_format',
    // 存储
    FILE_ID: 'fid',
    FILES_HEADER: 'fh',
    FILES: 'files',
    FILE_OPEN_ID: 'foid',
    FILE_CONENT_ID: 'fcid',
};

const encodeList = [
    TYPE.CODE,
    TYPE.HISTORY,
    TYPE.FILES,
];

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
    const type = value.substr(0, value.indexOf(':'));
    value = value.substr(value.indexOf(':') + 1);
    // if (key === TYPE.FILES)
    //     console.log(value, value.length);
    value = checkEncode(key, value, false);
    // if (key === TYPE.FILES)
    //     console.log(value, value.length);
    if (type === 'number') {
        return parseFloat(value);
    } else if (type === 'boolean') {
        return value === 'true';
    } else if (type === 'object') {
        return JSON.parse(value);
    }
    return value;
}

export function write (key, value) {
    const type = typeof value;
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