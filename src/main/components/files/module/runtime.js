import {getEntryPath} from '.';


/*
 * @Author: tackchen
 * @Date: 2021-04-30 16:27:15
 * @LastEditors: tackchen
 * @LastEditTime: 2021-04-30 17:01:18
 * @FilePath: \jsbox\src\main\components\files\module\runtime.js
 * @Description: Coding something
 */
const RuntimePathStack = (() => {
    const stack = [getEntryPath()];
    return {
        current () {
            return stack[stack.length - 1];
        },
        push (path) {
            const current = pathArrayToAbsolutePath(
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

const modules = {};

export function initRunTime () {
    window.loadModule = () => {
        
    };
    window.require = (relative) => {

    };

    // window.
}

'use strict';
Object.defineProperty(exports, '__esModule', {value: true});
exports.b = undefined;
require('../111111');
var _ = require('../222222');
var _2 = _interopRequireDefault(_);
var _3 = require('../a/33333');
var _4 = require('../a/44444444444');
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : {default: obj}; }
console.log(_2.default.x);
console.log(b);
var b = exports.b = {};
exports.default = {a: 1};