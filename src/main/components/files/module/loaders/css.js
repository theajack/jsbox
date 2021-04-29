/*
 * @Author: tackchen
 * @Date: 2021-04-29 14:21:24
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 14:22:22
 * @FilePath: \jsbox\src\main\components\files\module\loaders\css.js
 * @Description: Coding something
 */
import {Loader} from './loader-base';

class CssLoader extends Loader {
    compiler = cssCompiler;
    name = 'css';
}

function cssCompiler (content) {
    // todo ...
    return content;
}

export const cssLoader = new CssLoader();