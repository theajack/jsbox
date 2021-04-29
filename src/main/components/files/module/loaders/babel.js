/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:18:36
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-29 23:13:15
 * @FilePath: \jsbox\src\main\components\files\module\loaders\babel.js
 * @Description: Coding something
 */

import {Loader} from './loader-base';

class BabelLoader extends Loader {
    compiler = babelCompiler;
    name = 'babel';
}

function babelCompiler (content) {
    const opt = {presets: ['es2015']};
    return window.Babel.transform(content, opt);
}

export const babelLoader = new BabelLoader();