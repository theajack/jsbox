
function require () {
    return 'req';
};

console.log(exports, require);

export function getModule (path) {
    // const exports = {};
    console.log(path);
}

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.x = x;

var _a = require('./a.js');

var _a2 = _interopRequireDefault(_a);

function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : {default: obj}; }

console.log(_a2.default);
console.log(_a.a, _a.b);
exports.default = {a: 1};
function x () {
    console.log(11);
}