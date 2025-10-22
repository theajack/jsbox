import $ from 'easy-dom-util';
// import {toast} from 'tacl-ui';
// import {loadResources} from './load';
import {getTypeByFix, loadResources} from './load';
import Vue from 'vue/dist/vue.esm';
import {Dialog, Select, Option, Button} from 'element-ui';
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/select-dropdown.css';
import './style/import.css';
import {getUrlParam, importScript} from './util';
import {loading} from 'tacl-ui';
import {LANG, THEME} from './main/components/js/editor';
import event from './main/js/event';
import {EVENT} from './main/js/constant';

let app = null;
let libs = [];
let envs = [];

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

function initLibs () {
    let lib = window.jsbox_libs;
    let env = window.jsbox_envs;
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
}

function initEl () {
    initLibs();
    $.query('body').append($.create('div#SetApp'));
    app = new Vue({
        components: {Dialog, Select, Option, Button},
        template: /* html*/`
            <div>
            <Dialog title='加载第三方库' :visible.sync="showDialog" :before-close='beforeClose'>
                <Select
                v-model="value"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择或输入依赖">
                    <Option
                    v-for="item in libs"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    <span class='lib-name'>{{ item.name }}</span>
                    <span class='lib-url'>{{item.url}}</span>
                    <a class='lib-version' :href='item.url' target="view_window">@{{ item.version }}</a>
                    </Option>
                </Select>
                <div slot="footer" class="dialog-footer">
                    <Button type="primary" @click="load" icon='el-icon-download'>加载</Button>
                    <Button @click="close" icon='el-icon-close'>取消</Button>
                </div>
            </Dialog>
            <Dialog title='加载运行环境' :visible.sync="showEnvDialog" :before-close='beforeEnvClose'>
                <Select
                v-model="envValue"
                filterable
                default-first-option
                placeholder="请选择运行环境">
                    <Option
                    v-for="item in envs"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    <span class='lib-name'>{{ item.name }}</span>
                    <span class='lib-url'>deps: {{item.deps}}</span>
                    <span class='lib-version'>[{{ item.type }}]</span>
                    </Option>
                </Select>
                <div slot="footer" class="dialog-footer">
                    <Button type="primary" @click="loadEnv" icon='el-icon-check'>确认</Button>
                    <Button @click="closeEnv" icon='el-icon-close'>取消</Button>
                </div>
            </Dialog>
            </div>
        `,
        data () {
            return {
                showDialog: false,
                showEnvDialog: false,
                libs,
                envs,
                value: [],
                envValue: ''
            };
        },
        methods: {
            open () {
                this.showDialog = true;
            },
            close () {
                this.clearData();
                this.showDialog = false;
            },
            load () {
                loadResources({
                    array: this.value,
                    success: () => {
                        this.close();
                    }
                });
            },
            beforeClose (done) {
                this.clearData();
                done();
            },
            clearData () {
                this.value = [];
            },
            openEnv () {
                this.showEnvDialog = true;
            },
            loadEnv () {
                window.open(`${location.protocol}//${location.host}${location.pathname}?env=${this.envValue}`);
            },
            closeEnv () {
                this.clearEnvData();
                this.showEnvDialog = false;
            },
            beforeEnvClose (done) {
                this.clearEnvData();
                done();
            },
            clearEnvData () {
                this.envValue = '';
            }
        }
    });
    app.$mount('#SetApp');
}
initEl();

export function open () {
    app.open();
}

export function openEnv () {
    app.openEnv();
}

export async function initCodeSrc () {
    let src = '';
    const codeSrc = getUrlParam('codeSrc'); // window.jsboxCode
    if (codeSrc) {
        src = decodeURIComponent(codeSrc);
    } else {
        src = parseGithubParam('github', 'jsbox.code.js');
    }
    if (src) {
        loading('正在加载实例代码...');
        // // debug
        // await importScript('http://localhost:8080/a.js');
        await importScript(src);
        loading.close();
    }
}

let githubInfo = null;

export function getGithubInfo () {
    return githubInfo;
}

export function parseGithubParam (name, defaultFile) {
    let githubRep = getUrlParam(name);
    if (githubRep) {
        githubRep = decodeURIComponent(githubRep);
        let user = '', rep = '', gitPath = '', file = defaultFile;
        const arr = githubRep.split('.');
        user = arr[0];
        gitPath = arr[1];
        if (gitPath.indexOf('@') !== -1) {
            rep = gitPath.split('@')[0];
        } else {
            rep = gitPath;
        }
        if (arr.length > 2) {
            file = arr.splice(2).join('.');
        }
        githubInfo = {user, rep, file};
        document.title = `${user}/${rep} Online - Powered by JsBox`;
        const host = getUrlParam('cdn_prefix', 'cdn');
        return `https://${host}.jsdelivr.net/gh/${user}/${gitPath}/${file}`;
    }
    return '';
}

export function getCodeFromCodeSrc () {
    return getAttrFromCodeSrc('code', '');
}
export function getLangFromCodeSrc () {
    return getAttrFromCodeSrc('lang', LANG.JAVASCRIPT);
}
export function getThemeFromCodeSrc () {
    return getAttrFromCodeSrc('theme', THEME.DARK);
}

export function initCodeSrcFromEnv (env) {
    let changed = false;
    ['theme', 'needUI', 'useDefaultUI', 'hideLog'].forEach(
        name => {
            if (typeof env[name] !== 'undefined') {
                if (setAttrCodeSrc(name, env[name]))
                    changed = true;
            }
        }
    );
    if (changed) {
        event.emit(EVENT.JSBOX_CODE_CHANGE, window.jsboxCode);
    }
}

export function setAttrCodeSrc (name, value) {
    let config = window.jsboxCode;
    if (!config) {
        config = {};
        window.jsboxCode = config;
    }
    if (config[name] !== value) {
        config[name] = value;
        return true;
    }
    return false;
}

export function getAttrFromCodeSrc (attr, def) {
    if (!window.jsboxCode) return def;
    if (typeof window.jsboxCode === 'string')
        return attr === 'code' ? window.jsboxCode : def;
    return window.jsboxCode[attr] || def;
}