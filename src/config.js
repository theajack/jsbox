import {getUrlParam} from './util';
import {loadResources} from './load';

function initLib (success) {
    let libs = getUrlParam('lib');
    if (libs) {
        loadResources({
            array: libs.split(','),
            success
        });
    }
}

export function initConfig (serachCode, editor, success = () => {}) {
    let url = getUrlParam('config');
    if (!url) {
        initLib(success);
        return;
    }
    url = decodeURIComponent(url);
    loadResources({
        array: [url],
        jsboxLib: false,
        success: () => {
            let id = getUrlParam('id');
            let config = window.jsbox_config;
            
            if (config.codes && id && config.codes[id]) {
                let code, value = config.codes[id];
                if (typeof value === 'object') {
                    code = value.code || serachCode;
                    let deps = value.dep;
                    if (!deps || !(deps instanceof Array)) { // 没有dep
                        loadDeps({
                            libs: config.libs,
                            success: () => {
                                editor.code(code);
                                success();
                            }
                        });
                    } else { // 如果有codes且id有dep属性，则加载id需要的所有依赖
                        loadDeps({
                            array: deps,
                            libs: config.libs || [],
                            success: () => {
                                editor.code(code);
                                success();
                            }
                        });
                    }
                } else if (typeof value === 'string') {
                    code = value;
                    loadDeps({
                        libs: config.libs,
                        success: () => {
                            editor.code(code);
                            success();
                        }
                    });
                } else {
                    loadDeps({
                        libs: config.libs,
                        success
                    });
                }
            } else { // 如果没有codes，则加载所有依赖
                if (config.codes && id && !config.codes[id]) {
                    console.warn('不存在的codeid：' + id);
                }
                loadDeps({
                    libs: config.libs,
                    success
                });
            }
        },
        showToast: false
    });
}

function loadDeps ({
    libs,
    success,
    array
}) {
    if (libs) {
        if (!array) {
            array = Object.keys(libs);
        }
        let res = checkKeys(array, libs);
        loadResources({
            libs,
            array: res.keys,
            jsboxLib: res.jsboxLib,
            success
        });
    } else {
        if (success)
            success();
    }
}

function checkKeys (keys, libs) {
    let jsboxLib = false;
    if (typeof libs === 'object') {
        keys.forEach((key, i) => {
            let item = libs[key];
            if (item && item.indexOf('jsbox.') === 0) {
                keys[i] = item;
                if (!jsboxLib) {
                    jsboxLib = true;
                }
            } else if (key.indexOf('jsbox.') === 0) {
                if (!jsboxLib) {
                    jsboxLib = true;
                }
            }
        });
    }
    return {keys, jsboxLib};
}