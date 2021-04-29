/*
 * @Author: tackchen
 * @Date: 2021-04-29 14:24:20
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 14:24:42
 * @FilePath: \jsbox\src\main\components\files\module\loaders\jsx.js
 * @Description: Coding something
 */
import {Loader} from './loader-base';

class JsxLoader extends Loader {
    compiler = jsxCompiler;
    name = 'jsx';
}

function jsxCompiler (content) {
    // todo ...
    return content;
}

export const jsxLoader = new JsxLoader();