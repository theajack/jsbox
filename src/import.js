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

let app = null;
let libs = [];

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
}

function initEl () {
    initLibs();
    $.query('body').append($.create('div#SetApp'));
    app = new Vue({
        components: {Dialog, Select, Option, Button},
        template: /* html*/`
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
        `,
        data () {
            return {
                showDialog: false,
                libs,
                value: []
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
            }
        }
    });
    app.$mount('#SetApp');
}
initEl();

export function open () {
    app.open();
}