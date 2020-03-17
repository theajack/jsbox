import {tool as $, loading, alert, toast} from 'tacl-ui';

let scripts = window.jsbox_scripts;
let styles = window.jsbox_styles;

export function loadResources (array, call) {
    let stopLoad = false;
    let num = 0;

    loading('0 / ' + array.length);
    array.forEach((item) => {
        let type = 'script';
        if (scripts[item]) {
            item = scripts[item];
        } else if (styles[item]) {
            item = styles[item];
            type = 'style';
        } else if (item.substr(item.lastIndexOf('.') === '.css')) {
            type = 'style';
        }
        let ele;
        if (type === 'script') {
            ele = $.create('script').attr('src', item);
            $.query('body').append(ele);
        } else {
            ele = $.create('link').attr({
                rel: 'stylesheet',
                href: item
            });
            $.query('head').append(ele);
        }
        let timer = setTimeout(() => {
            if (stopLoad) {return;}
            stopLoad = true;
            loadError(item);
        }, 8000);
        ele.el.onload = function () {
            if (stopLoad) {return;}
            num ++;
            if (num >= array.length) {
                loading(`${num} / ${array.length}`);
                loading.close();
                toast('所有资源加载成功!');
                if (call)call();
            } else {
                loading(`${num} / ${array.length}`);
            }
            clearTimeout(timer);
        };
        ele.el.onerror = function () {
            if (stopLoad) {return;}
            stopLoad = true;
            loadError(item);
            clearTimeout(timer);
        };
    });
}

function loadError (item) {
    loading.close();
    alert({
        title: '资源加载失败',
        confirmText: '关闭',
        theme: 'gamer',
        text: item
    });
}