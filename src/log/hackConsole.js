import obejectViewer from './objectViewer';
import valueViewer from './valueViewer';
import TYPE from './type';
let hconsole = {
    onConsole: function () {}
};
function hackConsole () {
    // 定义一个输出运行js结果的函数
    window.console.tc = window.console.log;
    window.console.html = window.console.log;
    TYPE.list.forEach((name) => {
        hack(name);
    });
    window.addEventListener('error', function (err) {
        console.error(`${err.constructor.name}:\n${err.message || err.error.stack}`);
    }, false);
    return hconsole;
}

function hack (name) {
    let f = window.console[name];
    console['_' + name] = f;
    window.console[name] = function (...arg) {
        console.trace();
        f(...arg);
        if (arg.length == 0) {
            return;
        }
        if (arg.length === 1) {
            arg = arg[0];
            if (obejectViewer.test(arg)) {
                hconsole.onConsole(obejectViewer(arg, name), arg, name);
            } else {
                hconsole.onConsole(valueViewer(arg, name), arg, name);
            }
        } else {
            renderMutil(arg, name);
        }
    };
}

function renderMutil (arg, name) {
    let str = '';
    let objArr = [];
    for (var i = 0; i < arg.length; i++) {
        let value = arg[i];
        if (obejectViewer.test(value)) {
            objArr.push(value);
            str += '[' + spanStr('key', 'Object' + (objArr.length)) + '] ';
        } else {
            str += generateHtml(value) + ' ';
        }
    }
    hconsole.onConsole(valueViewer(str, name, true), str, name);
    objArr.forEach((obj, i) => {
        hconsole.onConsole(obejectViewer(obj, 'tc', 'Object' + (i + 1)), obj, name);
    });
}

function generateHtml (value) {
    let str = '';
    switch (typeof value) {
        case 'undefined': str = spanStr('key', 'undefined'); break;
        case 'object': str = spanStr('key', 'null'); break;// 只可能是null
        case 'string': str = spanStr('string', value); break;
        case 'number': str = spanStr('number', value); break;
        case 'boolean': str = spanStr('key', value); break;
        case 'function': str = spanStr('def', value.toString()); break;
        default :;break;
    }
    return str;
}

function spanStr (cls, text) {
    return '<span class="tc-obj-' + cls + '">' + text + '</span>';
}

export default hackConsole;