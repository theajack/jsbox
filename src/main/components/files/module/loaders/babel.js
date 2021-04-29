/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:18:36
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 11:30:16
 * @FilePath: \jsbox\src\main\components\files\module\loaders\babel.js
 * @Description: Coding something
 */

import {Loader} from './loader-base';

class BabelLoader extends Loader {
    compiler = jsCompiler;
    name = 'babel';
}

function jsCompiler (content) {
    // todo ...
    return content;
}

export const babelLoader = new BabelLoader();