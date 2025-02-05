/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-22 11:16:21
 * @Description: Coding something
 */
import 'easy-icon';
import $ from 'easy-dom-util';
import Vue from 'vue/dist/vue.esm';
import Main from './main/main.vue';
import {Dialog, Select, Option, Button} from 'element-ui';
import 'element-ui/lib/theme-chalk/base.css';
import 'element-ui/lib/theme-chalk/dialog.css';
import 'element-ui/lib/theme-chalk/select.css';
import 'element-ui/lib/theme-chalk/button.css';
import 'element-ui/lib/theme-chalk/select-dropdown.css';
import './main/style/element.less';
import './main/js/style';
import {initResize, initKeyEvent} from './main/js/initEvent';
import {initWindowFunc} from './main/js/util';
import {initFileSystem} from './main/components/files/file-system';
import {initCodeSrc} from './import';
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);

async function main () {
    $.query('body').append($.create('div#jsbox-container'));
    initFileSystem();
    initResize();
    initKeyEvent();
    initWindowFunc();
    await initCodeSrc();
    new Vue({
        render: h => h(Main)
    }).$mount('#jsbox-container');
}

main();
  