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
    },
    [LANG.VUE]: {
        light: '#7fae42',
        dark: '#8dc149',
        icon: 'ef-vue'
    },
    [LANG.JSX]: {
        light: '#498ba7',
        dark: '#519aba',
        icon: 'ef-react'
    },
    [LANG.JAVA]: {
        light: '#b8383d',
        dark: '#cc3144',
        icon: 'ef-java'
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