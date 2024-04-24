/*
 * @Author: theajack
 * @Date: 2023-04-04 23:20:27
 * @Description: Coding something
 */
// import './gpt/gpt-main';

import { createApp } from 'vue';
import App from './App.vue';
import 'easy-icon/offline';
import 'easy-icon/offline/easy-icon-f';
import 'easy-icon/offline/easy-icon-t';

// import { router } from './scripts/router';
import { createPinia } from 'pinia';
import './styles/style.less';
import { initMonacoEnv } from './scripts/manaco/manaco';

initMonacoEnv();

const app = createApp(App);
// app.use(router);
app.use(createPinia());
app.mount('#app');

console.warn(`isDEV=${__DEV__}`);