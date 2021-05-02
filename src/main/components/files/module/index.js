
import {getLoaderByFilePath} from './loader';
import {handleRelativePath, pathArrayToAbsolutePath} from './file-searcher';


const entry = '/index.html';

export function getEntryPath () {
    return entry;
}

export const CompilePathStack = (() => {
    const stack = [entry];

    return {
        current () {
            return stack[stack.length - 1];
        },
        push (path) {
            const current =  pathArrayToAbsolutePath(
                handleRelativePath(this.current, path)
            );
            stack.push(current);
            return current;
        },
        pop () {
            return stack.pop();
        }
    };
})();

export function startCompileModules () {

    // console.log(entryFile);
    console.log(`编译开始，入口文件=${entry}`);
    const sandBoxResult = compileSingleFile(entry);
    console.log(sandBoxResult);

}

// 应返回 {style:[], dom:[], script: []}
// 当filePath 可传入绝对或相对路径
export function compileSingleFile (filePath) {
    const current = CompilePathStack.push(filePath);
    const loader = getLoaderByFilePath(current);
    const compileResult = loader.compileByAbsolutePath(current);

    console.log(filePath, loader, compileResult);
    window.script = compileResult.script[0];
    CompilePathStack.pop();
}

// import a from '../a'
// import {a1, b1} from '../a/b'
// import {a2 as x} from '../a/b'
// console.log(a.x);
// console.log(b);
// export let b ={};
// export default {a:1};


// 'use strict';
// var __jxbox_path = '';
// var exports = {};

// Object.defineProperty(exports, "__esModule", {
//     value: true
// });
// exports.b = undefined;
// var _a = require('../a');
// var _a2 = _interopRequireDefault(_a);
// var _b = require('../a/b');
// function _interopRequireDefault(obj) {
//     return obj && obj.__esModule ? obj : { default: obj };
// }

// console.log(_a2.default.x);
// console.log(b);
// var b = exports.b = {};
// exports.default = { a: 1 };

    