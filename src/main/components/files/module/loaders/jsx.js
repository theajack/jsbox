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
    const opt = {presets: ['es2015', 'react']};
    return window.Babel.transform(content, opt);
}

export const jsxLoader = new JsxLoader();