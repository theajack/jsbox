/*
 * @Author: tackchen
 * @Date: 2021-04-29 14:24:20
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-30 09:55:51
 * @FilePath: \jsbox\src\main\components\files\module\loaders\js.js
 * @Description: Coding something
 */
import {Loader} from './loader-base';

class JsLoader extends Loader {
    name = 'js';
}

export const jsLoader = new JsLoader();
