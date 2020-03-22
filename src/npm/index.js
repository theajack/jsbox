let CONFIG = {
    theme: 'normal',
    code: 'console.log("Hello JSBox!")',
    lib: null,
    config: null,
    id: null,
    env: null
};

export default function jsbox (options) {
    let _config = handleConfig(options);
    let baseUrl = 'https://theajack.gitee.io/jsbox?';
    if (_config.config) {
        baseUrl += `config=${_config.config}&`;
        if (_config.id) {
            baseUrl += `id=${_config.id}&`;
        }
    } else if (_config.env) {
        baseUrl += `env=${_config.env}&`;
    } else if (_config.lib) {
        baseUrl += `lib=${_config.lib}&`;
    }
    if (!((_config.config && _config.id) || _config.env)) {
        baseUrl += `code=${_config.code}&`;
    }
    baseUrl = baseUrl.substr(0, baseUrl.length - 1);
    window.open(baseUrl);
};

jsbox.config = function (options) {
    CONFIG = handleConfig(options);
    return CONFIG;
};

function handleConfig ({
    theme = CONFIG.theme,
    code = CONFIG.code,
    lib = CONFIG.lib,
    config = CONFIG.config,
    id = CONFIG.id,
    env = CONFIG.env,
}) {
    code = encode(code);
    let res = {theme, code};
    if (config) {
        res.config = encode(config);
        if (id) {
            res.id = encode(id);
        }
    } else if (env) {
        res.env = encode(env);
    } else if (lib) {
        res.lib = encode(lib);
    }
    return res;
}

function encode (v) {
    return window.encodeURIComponent(v);
}