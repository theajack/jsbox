import {getLang} from '../js/file';
import {LANG} from '../../js/constant';

const LANG_STYLE = {
    [LANG.JAVASCRIPT]: {
        light: '#c7ba3b',
        dark: '#cbbf3f',
        icon: 'ef-js'
    },
    [LANG.TYPESCRIPT]: {
        light: '#49a4c9',
        dark: '#419aba',
        icon: 'ef-ts'
    }
};

const DEFAULT_STYLE = {
    light: '#444',
    dark: '#bbb',
    icon: 'ef-file-ge'
};

export function getLangStyle (filename) {
    let lang = getLang(filename);
    let res = LANG_STYLE[lang] || DEFAULT_STYLE;
    res.lang = lang;
    return res;
}