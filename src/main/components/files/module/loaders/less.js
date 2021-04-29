/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:18:20
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 11:32:37
 * @FilePath: \jsbox\src\main\components\files\module\loaders\less.js
 * @Description: Coding something
 */
import {Loader} from './loader-base';

class LessLoader extends Loader {
    compiler = lessCompiler;
    name = 'less';
}

function lessCompiler (content) {
    // todo ...
    return content;
}

export const lessLoader = new LessLoader();