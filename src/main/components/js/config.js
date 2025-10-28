// 负责加载config和id参数 或者 id参数

import {getUrlParam} from '../../js/util';
import {loadResources} from './lib';
import {LANG, THEME} from './editor';
import {language, code, theme, dragPercent} from '../../js/status';
import {EVENT} from '../../js/constant';
import event from '../../js/event';
import {initCodeSrcFromEnv, parseGithubParam} from '../../../import';
import {store} from './store';
import {getCodeConfig} from './require';
// import {GlobalInfo} from './iframe-runner';

// config > env > lib

export let isCustomConfig = (() => {
    let config = getUrlParam('config');
    return (config !== null);
})();

function setCode (v) {
    code.init(v, false);
}

function initLib (success) {
    let libs = getUrlParam('lib');
    if (libs) {
        libs = libs.split(',');
    } else {
        if (typeof window.jsboxCode === 'object') {
            libs = window.jsboxCode.lib;
            if (libs && !(libs instanceof Array)) {
                libs = [libs];
            }
        }
    }
    if (libs) {
        loadResources({
            array: libs,
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
    const envItem = envs[env];
    initCodeSrcFromEnv(envItem);
    let _code = envItem.code || serachCode || '';
    _code = _code.trim();
    extractLang(envItem);
    if (envItem.deps && envItem.deps.length > 0) {
        loadResources({
            array: envItem.deps,
            success () {
                setCode(_code);
                success();
                event.emit(EVENT.SET_ENV, env);
            }
        });
    } else {
        setCode(_code);
        success();
        event.emit(EVENT.SET_ENV, env);
    }
    theme.init(THEME.DARK); // 默认使用黑色主题
    return true;
}

function extractLang (obj) {
    let lang = obj.lang;
    if (lang === 'html') {
        lang = LANG.HTML;
    } else if (lang === 'js' || lang === 'javascript' || typeof lang === 'undefined') {
        lang = LANG.JAVASCRIPT;
    }
    language.init(lang, false);
    return lang;
}

let _map = null;

export function getConfigCodes () {
    if (_map) return _map;
    let configs = getCodeConfig();
    if (!configs || !configs.codes) {
        _map = [];
        return [];
    }
    let data = [];
    for (let k in configs.codes) {
        data.push(valueToCodeItem(k, configs.codes[k]));
    }
    _map = data;
    return data;
}

function valueToCodeItem (k, value) {
    let item = value;
    if (typeof item === 'string') {
        item = {
            code: item,
            id: k
        };
    }
    return {
        code: item.code,
        lang: item.lang || 'javascript',
        dep: item.dep || [],
        desc: item.desc || '',
        needUI: item.needUI || (item.lang === 'html'),
        hideLog: item.hideLog || false,
        doc: item.doc || '',
        title: item.title || '',
        id: k
    };
}

export function loadIdInConfigMap (id, success = () => {}, serachCode = '') {
    let config = getCodeConfig();
    if (config.codes && id && config.codes[id]) {
        const value = valueToCodeItem(id, config.codes[id]);
        const _code = value.code || serachCode;
        extractLang(value);
        let deps = value.dep;
        loadDeps({
            array: deps,
            libs: config.libs,
            success: () => {
                store.needUI = value.needUI;
                store.hideLog = value.hideLog;
                store.doc = value.doc;
                store.id = value.id;
                event.emit(EVENT.STORE_CHANGE, '');
                setCode(_code);
                success();
            }
        });
    } else { // 如果没有codes，则加载所有依赖
        if (config.codes && id && !config.codes[id]) {
            console.warn('不存在的codeid：' + id);
        }
        loadDeps({
            libs: config.libs,
            success
        });
    }
}

export function initConfig (serachCode, success = () => {}, none = () => {}) {
    let url = getUrlParam('config');

    
    if (!/^https?:\/\//.test(url)) {
        url = parseGithubParam('config', 'jsbox.config.js'); ;
    }
    
    if (!url) {
        if (!initEnv(serachCode, success)) {
            initLib(none);
        }
        return;
    }
    url = decodeURIComponent(url);
    store.showCodeMap = (true);
    dragPercent.emit();
    loadResources({
        array: [url],
        jsboxLib: false,
        success: () => {
            const config = getCodeConfig() || {};

            if (config.theme) {
                theme.set(config.theme);
            }

            let hash = location.hash;
            let id = '';
            if (hash) {
                id = hash.substring(1);
            } else {
                id = getUrlParam('id');
                if (!id) {
                    id = Object.keys(config.codes)[0];
                }
            }
            id = decodeURIComponent(id);
            event.emit(EVENT.CODE_MAP_INIT, id);
            loadIdInConfigMap(id, success, serachCode);
        },
        showToast: false
    });
}

function loadDeps ({
    libs,
    success,
    array
}) {
    if (libs && Object.keys(libs).length > 0) {
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