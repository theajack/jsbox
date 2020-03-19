import {write, read} from './notebook';
import {getUrlParam, toggleCls, exeJs} from './util';
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
    if (read('mode') === 'html' || getUrlParam('mode' === 'html')) {
        changeMode(editor, btn, true);
    }
}

export function changeMode (editor, btn, init = false) {
    if (!editor) {return;}
    let language = editor.config.language;
    let index = language.indexOf('html');
    toggleCls(btn, 'ei-code', 'ei-file-code');
    btn.attr('title', `使用${index === -1 ? 'js' : 'html'}(ctrl + g)`);
    if (!init) {
        toast(`已切换至${index === -1 ? 'html' : 'js'}模式`);
    }
    let code = editor.code();
    if (index === -1) {
        language.push('html');
        showHtml();
    } else {
        language.splice(index, 1);
        hideHtml();
    }
    editor.code(code);
    write('mode', index === -1 ? 'html' : 'js');

}

export function isHtmlMode () {
    return _editor.config.language.indexOf('html') !== -1;
}

export function extractScript (html) {
    let reg = /<script(.|\n)*?>(.|\n)*?<\/script>/g;
    let arr = html.match(reg);
    if (!arr) {
        return {html, js: ''};
    }
    let js = arr.map(item => {
        if (!(/<script(.|\n)*?src( ?)*=(.|\n)*?>/.test(item))) {
            html = html.replace(item, ''); // 待提取src
        }
        return item.substring(item.indexOf('>') + 1, item.lastIndexOf('</script>')).trim();
    }).join('\n').trim();
    if (js) {
        js = '//@ sourceURL=jsbox_run.js \n' + js;
    }
    return {html, js};
}