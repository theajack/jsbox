

function getVersion (item) {
    if (item.version) {
        return item.version;
    }
    let res = item.url.match(/@(\d|\.)*?\//);
    if (!res) {
        return 'latest';
    }
    return res[0].substr(1, res[0].length - 2);
}

export function getTypeByFix (lib) {
    return (lib.substr(lib.lastIndexOf('.')) === '.css') ? 'style' : 'script';
}

export function getLibOption () {
    let libs = [];
    let lib = window.jsbox_libs;
    for (let key in lib) {
        let item = lib[key];
        if (typeof item === 'string') {
            item = {url: item};
        }
        
        libs.push({
            name: key,
            url: item.url,
            version: getVersion(item),
            type: item.type || getTypeByFix(item.url)
        });
    }
    return libs;
}

export function getEnvOption () {
    let envs = [];
    let env = window.jsbox_envs;
    for (let key in env) {
        let item = env[key];
        if (!item.type) {
            item.type = 'js';
        }
        if (!item.deps) {
            item.deps = [];
        }
        envs.push({
            name: key,
            type: item.type,
            deps: JSON.stringify(item.deps)
        });
    }
    return envs;
}