/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:19:33
 * @LastEditors: theajack
 * @LastEditTime: 2021-04-29 23:14:37
 * @FilePath: \jsbox\src\main\components\files\module\loaders\loader-base.js
 * @Description: Coding something
 */

import {searchFileByAbsolutePath} from '../file-searcher';


export class Loader {
    compiler = (content) => content;
    name = '';
    constructor ({compiler, name} = {}) {
        if (name) this.name = name;
        if (compiler) this.compiler = compiler;
    }

    compileByAbsolutePath (path) {
        if (!this.compiler) return null;
        const file = searchFileByAbsolutePath(path);
        return this.compileContent(file.editorContent());
    }

    compileContent (content) {
        return this.compiler(content);
    }

}