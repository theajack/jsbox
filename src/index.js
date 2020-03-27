import 'easy-icon';
import $ from 'easy-dom-util';
import Vue from 'vue/dist/vue.esm';
import Main from './main/main.vue';
import './main/js/style';

$.query('body').append($.create('div#jsbox-container'));

new Vue({
    render: h => h(Main)
}).$mount('#jsbox-container');
  