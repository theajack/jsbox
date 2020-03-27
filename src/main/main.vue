<template>
    <div>
        <jsbox-menu></jsbox-menu>
        <div class='jsbox-main-panel' ref='panel'>
            <jsbox-code></jsbox-code>
            <div @el='logPanel' class='log-panel'>
                <div @el='drag' class='drag-bar'></div>
                <div @el='html' class='log-html'>
                    <i @el='htmlBtn' class='ei-chevron-right' title='隐藏log(ctrl + k)' @event='toggleLog'></i>
                    <div @el='htmlContent' class='log-content'></div>
                </div>
                <div @el='log' class='log-log'></div>
            </div>
        </div>
    </div>
</template>
<script>
    import './style/index.css';
    import JsboxMenu from './components/menu.vue';
    import JsboxCode from './components/code.vue';
    // import JsboxLog from './components/log.vue';
    export default {
        components: {
            JsboxMenu,
            JsboxCode,
            // JsboxLog
        },
        data () {
            return {
            };
        }
    };
    
// import 'easy-icon';
// import $ from 'easy-dom-util';
// import {toast, confirm} from 'tacl-ui';
// import TCEditor from 'tc-editor';
// import Log from './log';
// import {TOOL_HEIGHT, initResize, initKeyEvent} from './event';
// import {getUrlParam, DEFAULT_CODE, initWindowFunc, IsPC, toggleCls, exeJs} from './util';
// import {copyText} from './log/util';
// import {read, write, TYPE} from './notebook';
// import {open, openEnv} from './import';
// import {initConfig} from './config';
// import {initHtml, initMode, changeMode, isHtmlMode, toggleLog, exeHtml} from './html';
// import Vue from 'vue/dist/vue.esm';
// import './menu.vue';
// import './log.vue';
// import './code.vue';
// import './style/index.css';


// $.reportStyle({
//     func: initStyle,
//     usePool: true
// });

// $.initStylePool();

// const host = 'https://theajack.gitee.io/';

// function main () {
//     let editor = null;

//     $.query('body').append($.create('div#jsbox-container'));
//     let app = new Vue({
//         template: /* html*/`
//             <div>

                
//             </div>
//         `,
//         data () {
           
//         },
//         methods: {
//         }
//     });
//     app.$mount('#jsbox-container');
// }

// function initCode (els, success) {
//     let theme = getUrlParam('theme');
//     if (!theme) {
//         theme = read(TYPE.THEME);
//     }
//     if (theme === 'dark') {
//         els.theme.cls('ei-sun');
//     }
//     // code 优先级 config&id>#saved|#hello>code
//     let code = '';
//     if (location.hash === '#saved') {
//         code = read(TYPE.CODE);
//     } else if (location.hash === '#hello') {
//         code = DEFAULT_CODE;
//     }
//     if (!code) {
//         code = getUrlParam('code');
//         if (code) {code = decodeURIComponent(code);}
//     }
//     let editor = new TCEditor({
//         el: els.code.el,
//         code: code ? code : '',
//         theme: theme === 'dark' ? 'dark' : 'normal',
//         width: '100%',
//         height: '100%',
//         tab: '  ',
//         toast,
//         buttons: false,
//     });
//     window.editor = editor;
//     initConfig(code, editor, success, els.codeMode);
//     return editor;
// }

// function initLog (logDiv) {
//     let log = new Log();
//     log.page = logDiv.el;
//     log.index = 0;
//     log.mounted();
//     log.page.querySelector('.tc-log-clear').title = '清空log(ctrl + e)';
// }

// function initDrag (el) {
//     let isDrag = false;
//     let width = 0;
//     let minWidth = 200;
//     let percent = 50;
//     let setDrag = (bool) => {
//         isDrag = bool;
//         el.panel[bool ? 'addClass' : 'rmClass']('no-select');
//         if (bool) {
//             width = $.windowSize().width;
//         } else {
//             write(TYPE.PERCENT, percent);
//         }
//     };
//     let setPercent = () => {
//         el.codew.style('width', `${percent}%`);
//         el.logPanel.style('width', `${100 - percent}%`);
//     };
//     let setSize = (x) => {
//         if (x < minWidth || x > width - minWidth) {
//             return;
//         }
//         percent = (x / width) * 100;
//         setPercent();
//     };
//     if (read(TYPE.PERCENT)) {
//         percent = read(TYPE.PERCENT);
//         setPercent();
//     }
//     $.query('body').on({
//         mousemove (e) {
//             if (isDrag) {
//                 setSize(e.clientX);
//             }
//         },
//         mouseup () {
//             if (isDrag) {
//                 setDrag(false);
//             }
//         },
//         mouseenter () {
//             setDrag(false);
//         }
//     });
//     el.drag.on({
//         mousedown () {
//             setDrag(true);
//         }
//     });
// }

// function initStyle () {
//     let size = $.windowSize();
//     // let barWidth = 4;
    
//     return /* css */`
//         .jsbox-main-panel{
//             height: ${size.height - TOOL_HEIGHT}px;
//         }
//         .jsbox-tool-w {
//             height: ${TOOL_HEIGHT}px;
//             line-height: ${TOOL_HEIGHT}px;
//             background-color: #f6f6f6;
//         }
//         ::-webkit-scrollbar {
//             width:5px;
//             cursor: pointer;
//             height: 5px;
//         }
//         ${IsPC() ? `
//         ::-webkit-scrollbar-button    {
//             display: none;
//         }
//         ::-webkit-scrollbar-track     {
//             display: none;
//         }
//         ::-webkit-scrollbar-track-piece {
//             background-color:#ddd;
//         }
//         ::-webkit-scrollbar-thumb{
//             background-color:#bbb;
//             border-radius:5px;
//             cursor: pointer;
//         }
//         ::-webkit-scrollbar-thumb:hover{
//             background-color:#aaa;
//             cursor: pointer;
//         }` : ''}
//     `;
// }

// main();
</script>

