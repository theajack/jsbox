/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:19:15
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 11:35:50
 * @FilePath: \jsbox\src\main\components\files\module\loaders\text.js
 * @Description: Coding something
 */
import {Loader} from './loader-base';

class TextLoader extends Loader {
    compiler = textCompiler;
    name = 'less';
}

function textCompiler (content) {
    return `export default "${content.replace(/"/g, '\\"')}"`;
}

export const textLoader = new TextLoader();