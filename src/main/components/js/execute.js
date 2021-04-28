import {toast, loading} from 'tacl-ui';
import event from '../../js/event';
import {EVENT} from '../../js/constant';
import {loadResources} from './lib';
let inExe = false;
let script = null;

export function exeHTML (code) {
    if (inExe) {
        toast('正在执行中，请勿重复操作');
        return;
    }
    const libs = [];
    code = extractLink(code, libs);
    const res = extractScript(code, libs);
    code = res.html.trim();
    const exe = () => {
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
    const reg = /<link(.|\n)*?href( ?)*=(.|\n)*?>/g;
    const res = html.match(reg);
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
    const reg = /<script(.|\n)*?>(.|\n)*?<\/script>/g;
    const arr = html.match(reg);
    if (!arr) {
        return {html, js: ''};
    }
    let js = arr.map(item => {
        html = html.replace(item, ''); // 待提取src
        if (!(/<script(.|\n)*?src( ?)*=(.|\n)*?>/.test(item))) {
            let _js = extractContent(item);
            if (/<script(.|\n)*? babel(>|([ \n=]+.*?>))/.test(item) && window.Babel) {
                const opt = {presets: ['es2015']};
                if (/<script(.|\n)*? react(>|([ \n=]+.*?>))/.test(item)) {
                    opt.presets.push('react');
                }
                _js = window.Babel.transform(_js, opt).code;
            }
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
    }).join('\n').trim();
    if (js) {
        js = '//@ sourceURL=jsbox_run.js \n' + js;
    }
    return {html, js};
}

function transformLess (html) {
    if (!window.less || !window.less.toCss) {
        return html;
    }
    const reg = /<style(.|\n)*?>(.|\n)*?<\/style>/g;
    const arr = html.match(reg);
    if (!arr) {
        return html;
    }
    arr.forEach(item => {
        if ((/<style(.|\n)*? less(>|([ \n=]+.*?>))/.test(item))) {
            const less = extractContent(item, 'style');
            const css = window.less.toCss(less);
            html = html.replace(less, css); // 待提取src
        }
    });
    return html;
}

export function extractContent (html, tag = 'script') {
    return html.substring(html.indexOf('>') + 1, html.lastIndexOf('</' + tag + '>')).trim();
}

export function exeJs (code) {
    if (inExe) {
        toast('正在执行中，请勿重复操作');
        return;
    }
    if (script) {
        document.body.removeChild(script);
    }
    if (code.indexOf('\n') === -1) {
        code = `log(${code})`;
    } else {
        if (/\/\/(.)*?babel(.)*?/.test(code.substring(0, code.indexOf('\n'))) && window.Babel) {
            code = window.Babel.transform(code,  {presets: ['es2015']}).code;
            console.log(code);
        }
    }
    inExe = true;
    loading();
    const blob = new Blob([code], {type: 'application/text'});
    const objectURL = window.URL.createObjectURL(blob);
    script = document.createElement('script');
    script.onload = () => {
        inExe = false;
        loading.close();
    };
    script.src = objectURL;
    document.body.appendChild(script);
}