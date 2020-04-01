// 负责加载config和id参数 或者 id参数

import {getUrlParam} from '../../js/util';
import {loadResources} from './lib';
import {LANG} from './editor';
import {language, code} from '../../js/status';

// config > env > lib

function setCode (v) {
    code.init(v, false);
}

function initLib (success) {
    let libs = getUrlParam('lib');
    if (libs) {
        loadResources({
            array: libs.split(','),
            success
        });
        return true;
    }
    success();
    return false;
}

function initEnv (serachCode, success) {
    let env = getUrlParam('env');
    let envs = window.jsbox_envs;
    if (!env || !envs || !envs[env]) {
        return false;
    }
    let _code = envs[env].code || serachCode || '';
    _code = _code.trim();
    let lang = envs[env].type;
    if (lang === 'html') {
        lang = LANG.HTML;
    } else if (lang === 'js' || lang === 'javascript' || typeof lang === 'undefined') {
        lang = LANG.JAVASCRIPT;
    }
    language.init(lang, false);
    if (envs[env].deps && envs[env].deps.length > 0) {
        loadResources({
            array: envs[env].deps,
            success () {
                setCode(_code);
                success();
            }
        });
    } else {
        setCode(_code);
        success();
    }
    return true;
}

export function initConfig (serachCode, success = () => {}, none = () => {}) {
    let url = getUrlParam('config');
    if (!url) {
        if (!initEnv(serachCode, success)) {
            initLib(none);
        }
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
                let _code, value = config.codes[id];
                if (typeof value === 'object') {
                    _code = value.code || serachCode;
                    let deps = value.dep;
                    if (!deps || !(deps instanceof Array)) { // 没有dep
                        loadDeps({
                            libs: config.libs,
                            success: () => {
                                setCode(_code);
                                success();
                            }
                        });
                    } else { // 如果有codes且id有dep属性，则加载id需要的所有依赖
                        loadDeps({
                            array: deps,
                            libs: config.libs || [],
                            success: () => {
                                setCode(_code);
                                success();
                            }
                        });
                    }
                } else if (typeof value === 'string') {
                    _code = value;
                    loadDeps({
                        libs: config.libs,
                        success: () => {
                            setCode(_code);
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