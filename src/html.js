import {write, read} from './notebook';
import {getUrlParam, exeJs} from './util';
import {toast} from 'tacl-ui';
let _editor = null;
export let showHtml = () => {};
export let hideHtml = () => {};
export let toggleLog = () => {};
export let exeHtml = () => {};

export function initHtml (els) {
    showHtml = () => {
        toggleLog(true);
        setTimeout(() => {
        }, 10);
    };
    hideHtml = () => {
        els.html.cls('log-html');
        els.log.cls('log-log');
        els.htmlContent.html('');
    };
    toggleLog = (isInit) => {
        let showlog = read('showlog');
        if (showlog === null) showlog = true;
        if (!isInit) {
            showlog = !showlog;
            write('showlog', showlog);
        }
        if (isHtmlMode()) {
            if (showlog) {
                els.html.cls('log-html log-half');
                els.log.cls('log-log log-half');
                els.htmlBtn.cls('ei-chevron-right').attr('title', '隐藏log(ctrl + k)');
            } else {
                els.html.cls('log-html log-full');
                els.log.cls('log-log log-hide');
                els.htmlBtn.cls('ei-chevron-left').attr('title', '显示log(ctrl + k)');
            }
        }
    };
    exeHtml = (code) => {
        let res = extractScript(code);
        els.htmlContent.html(res.html);
        if (res.js) {
            exeJs(res.js);
        }
    };
    window.toggleLog = toggleLog;
}

export function initMode (editor, btn) {
    _editor = editor;
    let mode = getUrlParam('mode');
    if (mode !== 'html' && mode !== 'js') {
        mode = read('mode') === 'html' ? 'html' : 'js';
    }
    changeMode(mode, editor, btn, true);
}

export function changeMode (mode, editor, btn, init = false) {
    if (!editor) {return;}
    if (mode === 'html') {
        editor.config.language = ['html', 'js'];
        btn.replaceClass('ei-code', 'ei-file-code');
        showHtml();
    } else {
        btn.replaceClass('ei-file-code', 'ei-code');
        editor.config.language = ['js'];
        hideHtml();
    }
    btn.attr('title', `使用${mode}(ctrl + g)`);
    let code = editor.code();
    if (!init) {
        toast(`已切换至${mode}模式`);
    }
    write('mode', mode);
    editor.code(code);
}

export function isHtmlMode () {
    if (!_editor) {return false;}
    return _editor.config.language.indexOf('html') !== -1;
}

export function extractScript (html) {
    html = transformLess(html);
    let reg = /<script(.|\n)*?>(.|\n)*?<\/script>/g;
    let arr = html.match(reg);
    if (!arr) {
        return {html, js: ''};
    }
    let js = arr.map(item => {
        if (!(/<script(.|\n)*?src( ?)*=(.|\n)*?>/.test(item))) {
            html = html.replace(item, ''); // 待提取src
            let js = extractContent(item);
            if (/<script(.|\n)*? babel[ \n=]?*>/.test(item) && window.Babel) {
                let opt = {presets: ['es2015']};
                if (/<script(.|\n)*? react[ \n=]?*>/.test(item)) {
                    opt.presets.push('react');
                }
                js = window.Babel.transform(js, opt);
            }
            return js;
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
    let reg = /<style(.|\n)*?>(.|\n)*?<\/style>/g;
    let arr = html.match(reg);
    if (!arr) {
        return html;
    }
    arr.forEach(item => {
        if ((/<style(.|\n)*? less[ \n=]?*>/.test(item))) {
            let less = extractContent();
            html = html.replace(less, window.less.toCss(less)); // 待提取src
        }
    });
    return html;
}

export function extractContent (html) {
    return html.substring(html.indexOf('>') + 1, html.lastIndexOf('</')).trim();
}