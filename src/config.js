import {getUrlParam} from './util';
import {loadResources} from './load';

export function initConfig (serachCode, editor) {
    let url = getUrlParam('config');
    if (!url) {
        return;
    }

    loadResources([decodeURIComponent(url)], () => {
        let id = getUrlParam('id');
        let config = window.jsbox_config;
        
        if (config.codes && id && config.codes[id]) {
            let code, value = config.codes[id];
            if (typeof value === 'object') {
                code = value.code || serachCode;
                let deps = value.dep;
                if (deps && !(deps instanceof Array)) { // 没有dep
                    loadAllDep(config, () => {
                        editor.code(code);
                    });
                } else { // 如果有codes且id有dep属性，则加载id需要的所有依赖
                    deps.forEach((item, index) => {
                        if (config.scripts && config.scripts[item]) {
                            deps[index] = config.scripts[item];
                        } else if (config.styles && config.styles[item]) {
                            deps[index] = config.styles[item];
                        }
                    });
                    loadResources(deps, () => {
                        editor.code(code);
                    });
                }
            } else if (typeof value === 'string') {
                code = value;
                loadAllDep(config, () => {
                    editor.code(code);
                });
            } else {
                loadAllDep(config);
            }
        } else { // 如果没有codes，则加载所有依赖
            if (config.codes && id && !config.codes[id]) {
                console.warn('不存在的codeid：' + id);
            }
            loadAllDep(config);
        }
    }, false);
}

function loadAllDep (config, call) {
    let array = [];
    if (config.scripts) {
        array = array.concat(Object.values(config.scripts));
    }
    if (config.styles) {
        array = array.concat(Object.values(config.styles));
    }
    loadResources(array, call);
}
