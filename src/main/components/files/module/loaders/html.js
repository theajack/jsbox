/*
 * @Author: tackchen
 * @Date: 2021-04-29 14:20:59
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 14:21:48
 * @FilePath: \jsbox\src\main\components\files\module\loaders\html.js
 * @Description: Coding something
 */
import {Loader} from './loader-base';

class HtmlLoader extends Loader {
    compiler = htmlCompiler;
    name = 'html';
}

function htmlCompiler (content) {
    // todo ...
    return content;
}

export const htmlLoader = new HtmlLoader();