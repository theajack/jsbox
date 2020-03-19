import {tool as $, loading, alert, toast} from 'tacl-ui';

export function getTypeByFix (lib) {
    return (lib.substr(lib.lastIndexOf('.')) === '.css') ? 'style' : 'script';
}

function checkIsJsBoxLib (item) {
    if (item.indexOf('jsbox.') === 0) {
        return item.replace('jsbox.', '');
    }
    return item;
}

function isUsefullLib (name) {
    if (!name) {return false;}
    return !(typeof name === 'string' && name.indexOf('jsbox.') === 0);
}

function checkResource (libs, array) {
    let res = [];
    for (let i = 0; i < array.length; i++) {
        let url, type, name;
        let item = array[i];
        item = checkIsJsBoxLib(item);
        name = item;
        let inLib = false;
        for (let j = 0; j < libs.length; j++) {
            let singleLib = libs[j];
            let lib = singleLib[item];
            if (isUsefullLib(lib)) {
                if (typeof lib === 'object') {
                    url = lib.url;
                    type = lib.type || getTypeByFix(url);
                } else {
                    url = lib;
                    type = getTypeByFix(lib);
                }
                inLib = true;
                break;
            }
        }
        if (!inLib) {
            let index = item.lastIndexOf('.');
            let fileName = item.substr(index);
            if (index === -1 || (fileName !== '.css' && fileName !== '.js')) {
                url = `https://unpkg.com/${name}`;
                type = 'script';
            } else {
                url = item;
                type = getTypeByFix(item);
            }
        }
        res.push({
            url, type, name
        });
    }
    return res;
}

export const LOAD_TYPE = {
    SET: 'set',
    CONFIG: 'config',
};

export function loadResources ({
    libs = [],
    array,
    success,
    jsboxLib = true,
    showToast = true
}) {
    if (array.length === 0) {
        return;
    }
    if (!(libs instanceof Array)) {
        libs = [libs];
    }
    if (jsboxLib) {
        libs.push(window.jsbox_libs);
    }
    array =  checkResource(libs, array);
    let stopLoad = false;
    let num = 0;

    loading('0 / ' + array.length);
    array.forEach((item) => {
        let ele;
        if (item.type === 'script') {
            ele = $.create('script').attr('src', item.url);
            $.query('body').append(ele);
        } else {
            ele = $.create('link').attr({
                rel: 'stylesheet',
                href: item.url
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
                if (showToast)
                    toast('所有资源加载成功!');
                if (success)success();
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
    let text = null;
    if (!item.url) {
        text = '请输入正确的url地址';
    } else if (item.url === item.name) {
        text = item.url;
    } else {
        text = `${item.name}:${item.url}`;
    }
    alert({
        title: '资源加载失败',
        confirmText: '关闭',
        theme: 'gamer',
        text
    });
}