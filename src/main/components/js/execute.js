import {toast, loading} from 'tacl-ui';
import event from '../../js/event';
import {EVENT} from '../../js/constant';
import {loadResources} from './lib';
import {getAttrFromCodeSrc} from '../../../import';
// import {Application} from 'webos-module';
import {Application} from 'webos-module';
let inExe = false;
// console.log(Application);

// console.log(1111111);
const app = new Application();

// console.log('111', app);

export function exeHTML (code) {
    if (inExe) {
        toast('正在执行中，请勿重复操作');
        return;
    }
    let libs = [];
    code = extractLink(code, libs);
    let res = extractScript(code, libs);
    code = res.html.trim();
    let exe = () => {
        event.emit(EVENT.HTML_CONTENT_CHANGE, code);
        if (res.js) {
            setTimeout(() => {
                exeJs(res.js);
            }, 50);
        }
    };
    if (libs.length > 0) {
        loadResources({
            array: libs,
            jsboxLib: false,
            isDep: true,
            success () {
                exe();
            }
        });
    } else {
        exe();
    }
}

function extractLink (html, libs) {
    html = transformLess(html);
    let syb = symbol(html);
    let reg = new RegExp(`<link(.|${syb.reg})*?href( ?)*=(.|${syb.reg})*?>`, 'g');
    // let reg = /<link(.|\r\n)*?href( ?)*=(.|\r\n)*?>/g;
    let res = html.match(reg);
    if (!res) {
        return html;
    }
    res.forEach(item => {
        html = html.replace(item, '');
        let arr = item.match(/href *?= *?["'].*["']/);
        if (arr) {
            arr = arr[0].match(/["'].*["']/);
            if (arr) {
                libs.push(arr[0].substring(1, arr[0].length - 1));
            }
        }
    });
    return html;
}

export function extractScript (html, libs) {
    html = transformLess(html);
    let syb = symbol(html);
    let reg = new RegExp(`<script(.|${syb.reg})*?>(.|${syb.reg})*?<\\/script>`, 'g');
    // let reg = /<script(.|\r\n)*?>(.|\r\n)*?<\/script>/g;
    let arr = html.match(reg);
    if (!arr) {
        return {html, js: ''};
    }
    let js = arr.map(item => {
        html = html.replace(item, ''); // 待提取src
        
        if (!(new RegExp(`<script(.|${syb.reg})*?src( ?)*=(.|${syb.reg})*?>`, 'i').test(item))) {
        // if (!(/<script(.|\r\n)*?src( ?)*=(.|\r\n)*?>/.test(item))) {
            let _js = extractContent(item);
            // if (new RegExp(`<script(.|${syb.reg})*? babel(>|([ ${syb.reg}=]+.*?>))`, 'i').test(item) && window.Babel) {
            // // if (/<script(.|\r\n)*? babel(>|([ \r\n=]+.*?>))/.test(item) && window.Babel) {
            //     let opt = {presets: ['es2015']};
            //     if (new RegExp(`<script(.|${syb.reg})*? react(>|([ ${syb.reg}=]+.*?>))`, 'i').test(item)) {
            //     // if (/<script(.|\r\n)*? react(>|([ \r\n=]+.*?>))/.test(item)) {
            //         opt.presets.push('react');
            //     }
            //     _js = window.Babel.transform(_js, opt).code;
            // }
            return _js;
        } else {
            let arr = item.match(/src *?= *?["'].*["']/);
            if (arr) {
                arr = arr[0].match(/["'].*["']/);
                if (arr) {
                    libs.push(arr[0].substring(1, arr[0].length - 1));
                }
            }
        }
        return '';
    }).join(syb.str).trim();
    if (js) {
        js = '//@ sourceURL=jsbox_run.js ' + syb.str + js;
    }
    return {html, js};
}

function transformLess (html) {
    if (!window.less || !window.less.toCss) {
        return html;
    }
    let syb = symbol(html);
    let reg = new RegExp(`<style(.|${syb.reg})*?>(.|${syb.reg})*?<\\/style>`, 'g');
    // let reg = /<style(.|\r\n)*?>(.|\r\n)*?<\/style>/g;
    let arr = html.match(reg);
    if (!arr) {
        return html;
    }
    arr.forEach(item => {
        if ((new RegExp(`<style(.|${syb.reg})*? less(>|([ ${syb.reg}=]+.*?>))`, 'g').test(item))) {
        // if ((/<style(.|\r\n)*? less(>|([ \r\n=]+.*?>))/.test(item))) {
            let less = extractContent(item, 'style');
            let css = window.less.toCss(less);
            html = html.replace(less, css); // 待提取src
        }
    });
    return html;
}

export function extractContent (html, tag = 'script') {
    return html.substring(html.indexOf('>') + 1, html.lastIndexOf('</' + tag + '>')).trim();
}

// function executeWithModule () {

// }

// window.createApp = () => new Application({
//     // onLoaded?: TModuleLoaded,
//     // iifeNameMap?: Record<string, string>;
//     // mainMap?: Record<string, string>;
//     // onDependenciesParsed?(graph: Record<string, object>): void;
//     // onProgress?: TModuleProgress;
//     // env?: Record<string, any>;
//     // code?: string;
//     code: 'console.log(111)',
//     onDependenciesParsed (d) {
//         console.log('onDependenciesParsed', d);
//     },
//     onProgress (d) {
//         console.log('onProgress', d);
//     },
//     onLoaded (d) {
//         console.log('onLoaded', d);
//     },
// });

export function exeJs (code) {
    if (inExe) {
        toast('正在执行中，请勿重复操作');
        return;
    }

    inExe = true;
    loading();
    if (getAttrFromCodeSrc('wrapCode', false)) {
        code = `(function(){${code}})()`;
    }

    inExe = true;
    loading();
    app.exec(code).finally(() => {
        inExe = false;
        loading.close();
    });
}

function symbol (code) {
    if (code.indexOf('\r\n') === -1) {
        return {str: '\n', reg: '\\n'};
    }
    return {str: '\r\n', reg: '\\r\\n'};
}