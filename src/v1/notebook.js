let storage = window.localStorage;

const KEY = '_jsbox_v1';

export const TYPE = {
    CODE: 'code',
    THEME: 'theme',
    PERCENT: 'percent'
};

export function read (key) {
    key += KEY;
    let value = storage.getItem(key);
    if (value === null) {
        return null;
    }
    let type = value.substr(0, value.indexOf(':'));
    value = value.substr(value.indexOf(':') + 1);
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
    key += KEY;
    let type = typeof value;
    if (type === 'object') {
        value = JSON.stringify(value);
    } else if (type !== 'string') {
        value = value.toString();
    }
    value = `${type}:${value}`;
    storage.setItem(key, value);
}

export function remove (key) {
    key += KEY;
    storage.removeItem(key);
}