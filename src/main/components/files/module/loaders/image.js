/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:19:01
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 11:19:02
 * @FilePath: \jsbox\src\main\components\files\module\loaders\img.js
 * @Description: Coding something
 */
import {Loader} from './loader-base';

class ImageLoader extends Loader {
    compiler = imageCompiler;
    name = 'image';
}

function imageCompiler (content) {
    // todo ...
    return content;
}

export const imageLoader = new ImageLoader();