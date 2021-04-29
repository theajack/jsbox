/*
 * @Author: tackchen
 * @Date: 2021-04-29 11:19:33
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-29 11:27:53
 * @FilePath: \jsbox\src\main\components\files\module\loaders\loader-base.js
 * @Description: Coding something
 */

function readContentFromPath (path) {
    return path;
}

export class Loader {
    compiler = null;
    name = '';
    constructor ({compiler, name} = {}) {
        if (name) this.name = name;
        if (compiler) this.compiler = compiler;
    }

    loadFile (path) {
        if (!this.compiler) return null;
        const content = readContentFromPath(path);

        return this.compiler(content);
    }

}