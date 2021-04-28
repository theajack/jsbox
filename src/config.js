// 负责加载config和id参数 或者 id参数

import {getUrlParam} from './util';
import {loadResources} from './load';
import {changeMode} from './html';

// config > env > lib

function initLib (success) {
    const libs = getUrlParam('lib');
    if (libs) {
        loadResources({
            array: libs.split(','),
            success
        });
        return true;
    }
    return false;
}

function initEnv (serachCode, editor, success, modeBtn) {
    const env = getUrlParam('env');
    const envs = window.jsbox_envs;
    if (!env || !envs || !envs[env]) {
        return false;
    }
    let code = envs[env].code || serachCode || '';
    code = code.trim();
    const type = envs[env].type || 'js';
    changeMode(type, editor, modeBtn, true);
    if (envs[env].deps && envs[env].deps.length > 0) {
        loadResources({
            array: envs[env].deps,
            success () {
                editor.config.code = code;
                editor.code(code);
                success();
            }
        });
    } else {
        editor.config.code = code;
        editor.code(code);
    }
    return true;
}

export function initConfig (serachCode, editor, success = () => {}, modeBtn) {
    let url = getUrlParam('config');
    if (!url) {
        if (!initEnv(serachCode, editor, success, modeBtn)) {
            initLib(success);
        }
        return;
    }
    url = decodeURIComponent(url);
    loadResources({
        array: [url],
        jsboxLib: false,
        success: () => {
            const id = getUrlParam('id');
            const config = window.jsbox_config;
            
            if (config.codes && id && config.codes[id]) {
                let code;
                const value = config.codes[id];
                if (typeof value === 'object') {
                    code = value.code || serachCode;
                    const deps = value.dep;
                    if (!deps || !(deps instanceof Array)) { // 没有dep
                        loadDeps({
                            libs: config.libs,
                            success: () => {
                                editor.config.code = code;
                                editor.code(code);
                                success();
                            }
                        });
                    } else { // 如果有codes且id有dep属性，则加载id需要的所有依赖
                        loadDeps({
                            array: deps,
                            libs: config.libs || [],
                            success: () => {
                                editor.config.code = code;
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
                            editor.config.code = code;
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
        const res = checkKeys(array, libs);
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
            const item = libs[key];
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