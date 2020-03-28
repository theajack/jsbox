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
import './main/style/element.css';
import './main/js/style';
import {initResize} from './main/js/initEvent';
// initResize
Vue.use(Dialog);
Vue.use(Select);
Vue.use(Option);
Vue.use(Button);
$.query('body').append($.create('div#jsbox-container'));
initResize();
new Vue({
    render: h => h(Main)
}).$mount('#jsbox-container');
  