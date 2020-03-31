import {toast, loading} from 'tacl-ui';
import event from '../../js/event';
import {EVENT} from '../../js/constant';
let inExe = false;
let script = null;

export function exeHTML (code) {
    if (inExe) {
        toast('正在执行中，请勿重复操作');
        return;
    }
    let res = extractScript(code);
    event.emit(EVENT.HTML_CONTENT_CHANGE, res.html);
    if (res.js) {
        exeJs(res.js);
    }
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
    }
    inExe = true;
    loading();
    let blob = new Blob([code], {type: 'application/text'});
    let objectURL = window.URL.createObjectURL(blob);
    script = document.createElement('script');
    script.onload = () => {
        inExe = false;
        loading.close();
    };
    script.src = objectURL;
    document.body.appendChild(script);
}