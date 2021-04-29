import {getLang} from '../js/file';
import {LANG_VALUES, RES_TYPE, SUFFIX_TO_RES_TYPE} from '../../js/constant';
import {FILE_NAME_STYLE, LANG_STYLE, DEFAULT_STYLE, FILE_SUFFIX} from './file-type-config';

export function getLangStyle (filename) {
    const fileNameItem = FILE_NAME_STYLE[filename];
    if (fileNameItem) {
        if (typeof fileNameItem === 'string') {
            return FILE_NAME_STYLE[fileNameItem];
        }
        return fileNameItem;
    }
    const lang = getLang(filename);
    let style = LANG_STYLE[lang];
    if (!style) {
        const suffix = getFileSuffix(filename);
        if (suffix) {
            const res = getStyleBySuffix(suffix);
            if (res) {
                style = res;
            } else {
                style = DEFAULT_STYLE;
            }
        } else {
            style = DEFAULT_STYLE;
        }
    }
    style.lang = lang;
    return style;
}


function getFileSuffix (filename) {
    if (typeof filename !== 'string') {
        return '';
    }
    const index = filename.lastIndexOf('.');
    if (index === -1) {
        return '';
    }
    return filename.substr(filename.lastIndexOf('.') + 1);
}


function getStyleBySuffix (suffix) {
    const res = FILE_SUFFIX.find(item => {
        return item.suffixs.includes(suffix);
    });
    if (res) {
        return res.style;
    }
    return null;
}

// 判断一个文件是否是语言文件
export function isLangFile (lang) {
    return LANG_VALUES.includes(lang);
}

export function isLangFileByPath (path) {
    const lang = getLang(path);
    return isLangFile(lang);
}

// 获取资源的类型
export function getResourcesType (lang) {
    if (isLangFile(lang)) {
        return RES_TYPE.LANG;
    }
    return SUFFIX_TO_RES_TYPE[lang] || RES_TYPE.DEFAULT;
}