/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:18:36
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-29 23:13:15
 * @FilePath: \jsbox\src\main\components\files\module\loaders\babel.js
 * @Description: Coding something
 */

import {Loader} from './loader-base';


import * as babel from '@babel/core';
import * as babelParser from '@babel/parser';
import less from 'less';

window.babel = babel;
window.babelParser = babelParser;
window.less = less;
console.log(1111111111111111, babel, babelParser, less);

class BabelLoader extends Loader {
    compiler = babelCompiler;
    name = 'babel';
}

function babelCompiler (content) {
    const opt = {presets: ['es2015']};
    return babel.transform(content, opt);
}

export const babelLoader = new BabelLoader();