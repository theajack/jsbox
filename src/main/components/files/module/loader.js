/*
 * @Author: tackchen
 * @Date: 2021-04-29 14:16:36
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-29 22:32:22
 * @FilePath: \jsbox\src\main\components\files\module\loader.js
 * @Description: Coding something
 */

import {FILE_TYPE, LANG, RES_TYPE} from '../../../js/constant';
import {getLang} from '../../js/file';
import {getResourcesType, isLangFile} from '../file-type';
import {babelLoader} from './loaders/babel';
import {cssLoader} from './loaders/css';
import {htmlLoader} from './loaders/html';
import {imageLoader} from './loaders/image';
import {jsonLoader} from './loaders/json';
import {jsxLoader} from './loaders/jsx';
import {lessLoader} from './loaders/less';
import {textLoader} from './loaders/text';


const LoaderMap = {
    [RES_TYPE.LANG]: {
        [LANG.JAVASCRIPT]: babelLoader,
        [LANG.PLAINTEXT]: textLoader,
        [LANG.HTML]: htmlLoader,
        [LANG.VUE]: htmlLoader,
        [LANG.JSON]: jsonLoader,
        [LANG.JSX]: jsxLoader,
        [LANG.LESS]: lessLoader,
        [LANG.CSS]: cssLoader,
    },
    [RES_TYPE.IMAGE]: imageLoader,
    [RES_TYPE.CONFIG]: textLoader,
};

export function getLoaderByFile (file) {
    return (file.type === FILE_TYPE.DIR) ? null : getLoaderBase(file.lang);
}

export function getLoaderByFileName (fileName) {
    return getLoaderBase(getLang(fileName));
}
export function getLoaderByFilePath (filePath) {
    const fileName = filePath.substr(filePath.lastIndexOf('x') + 1);
    return getLoaderByFileName(fileName);
}

function getLoaderBase (lang) {
    if (isLangFile(lang)) {
        return LoaderMap[RES_TYPE.LANG][lang] || null;
    }

    return LoaderMap[getResourcesType(lang)] || null;
}