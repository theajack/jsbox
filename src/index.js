// import 'easy-icon';
// import 'easy-icon/easy-icon-f';
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
import {initSelectKeyEvent} from './main/components/js/file-selected';
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
$.query('body').append($.create('div#jsbox-container'));

initResize();
initKeyEvent();
initWindowFunc();
initSelectKeyEvent();


new Vue({
    render: h => h(Main)
}).$mount('#jsbox-container');
  