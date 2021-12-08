import {PARAM, THEME, LIB, ENV} from './constant';
import {compressToEncodedURIComponent} from 'lz-string';

let JSBox = {
    PARAM,
    THEME,
    LIB,
    ENV,
    open,
    config
};

let CONFIG = {
    theme: 'normal',
    code: 'console.log("Hello JSBox!")',
    lib: null,
    config: null,
    id: null,
    env: null,
    run: null,
    remind: null,
    mes: null,
    lang: null,

    codeSrc: '',
    github: '',
    githubConfig: '',
};

const BASE_URL = 'https://theajack.gitee.io/jsbox?';

function open (options) {
    let _config = handleConfig(options || CONFIG);
    let url = BASE_URL;
    if (_config[PARAM.CONFIG]) {
        url = appendParam(url, PARAM.CONFIG, _config);
        if (_config[PARAM.ID]) {
            url = appendParam(url, PARAM.ID, _config);
        }
    } else if (_config[PARAM.ENV]) {
        url = appendParam(url, PARAM.ENV, _config);
    } else if (_config[PARAM.LIB]) {
        url = appendParam(url, PARAM.LIB, _config);
    }
    if (!((_config[PARAM.CONFIG] && _config[PARAM.ID]) || _config[PARAM.ENV])) {
        if (_config[PARAM.CODE]) {
            url = appendParam(url, PARAM.CODE, _config);
        }
        if (_config[PARAM.LANG]) {
            url = appendParam(url, PARAM.LANG, _config);
        }
    }
    // 公共参数
    [
        PARAM.THEME,
        PARAM.RUN,
        PARAM.REMIND,
        PARAM.MES
    ].forEach(name => {
        if (_config[name] !== null) {
            url = appendParam(url, name, _config);
        }
    });
    url = url.substr(0, url.length - 1);
    window.open(url);
}

function appendParam (url, name, _config) {
    return `${url}${name}=${_config[name]}&`;
}

function config (options) {
    CONFIG = handleConfig(options, false);
    return CONFIG;
};

function handleConfig ({
    theme = CONFIG[PARAM.THEME],
    code = CONFIG[PARAM.CODE],
    lib = CONFIG[PARAM.LIB],
    config = CONFIG[PARAM.CONFIG],
    id = CONFIG[PARAM.ID],
    env = CONFIG[PARAM.ENV],
    run = CONFIG[PARAM.RUN],
    remind = CONFIG[PARAM.REMIND],
    mes = CONFIG[PARAM.MES],
}, needEncode = true) {
    if (code) {
        code = encode(code, needEncode, true);
    }
    let res = {code, theme,  run, remind, mes};
    if (config) {
        res[PARAM.CONFIG] = encode(config, needEncode);
        if (id) {
            res[PARAM.ID] = encode(id, needEncode);
        }
    } else if (env) {
        res[PARAM.ENV] = encode(env, needEncode);
    } else if (lib) {
        res[PARAM.LIB] = encode(lib, needEncode);
    }
    return res;
}

function encode (v, needEncode, compress = false) {
    if (!needEncode) {
        return v;
    }
    if (compress) {
        return compressToEncodedURIComponent(v);
    }
    return window.encodeURIComponent(v);
}

export default JSBox;