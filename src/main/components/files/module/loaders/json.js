/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:18:29
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 11:30:31
 * @FilePath: \jsbox\src\main\components\files\module\loaders\json.js
 * @Description: Coding something
 */

import {Loader} from './loader-base';

class JsonLoader extends Loader {
    compiler = jsonCompiler;
    name = 'json';
}

function jsonCompiler (content) {
    return `export default ${content}`;
}

export const jsonLoader = new JsonLoader();