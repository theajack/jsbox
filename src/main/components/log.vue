<template>
    <div class='log-panel' :class='{"log-hide": codeFull, "html-mode":isHtml}' :style='{width: percent+"%"}'>
        <div class='drag-bar' ref='drag'></div>
        <div class='log-html' :class='{"hide-log": !htmlLog}'>
            <i :class='"ei-chevron-"+(htmlLog?"right":"left")'
               @click='toggleLogShow'
               :title='(htmlLog?"隐藏":"显示")+"log(ctrl + k)"'></i>
            <div class='log-content'>
                <div :class="{'jx-ui': jxUI}" v-show="!hideHTMLResult" id='jx-app'>
                    <iframe  sandbox="allow-same-origin allow-scripts" :src="iframeSrc" style="height: 100%;width: 100%;border: none;"/>
                </div>
                <div v-if="doc" class="jx-doc">
                    <div class="jx-doc-title">{{id}} Docs</div>
                    <div v-html="doc"></div>
                </div>
            </div>
        </div>
        <div class='log-log' @click="focusEditor" ref='logWrapper' :class='{"hide-log": !htmlLog}'>
            <!-- <div class='console-mask' @click='focuConsole'></div> -->
            <div ref='log' @click.stop></div>
            <console-editor ref='editor'
                            @onwheel='onwheel'
                            @scrollToBottom='scrollToBottom'></console-editor>
        </div>
    </div>
</template>
<script>
    import {EVENT} from '../js/constant';
    import {initDrag} from '../js/initEvent';
    import {store} from './js/store';
    import event from '../js/event';
    // import Log from '../log';
    import {LANG} from './js/editor';
    import {htmlLog, language, dragPercent, theme} from '../js/status';
    // import {initConsole, focusEnd} from './js/log-console';
    // import {initConsole, focusEnd} from './js/log-console';
    import ConsoleEditor from './console-editor.vue';
    import {getAttrFromCodeSrc} from '../../import';
    import './jx-demo';
    import {Console} from 'console-container';
    import {parseMD, parseCode} from '../js/util';
    let lang = language.get();

    export default {
        components: {ConsoleEditor},
        data () {
            return {
                jxUI: false,
                percent: 100 - dragPercent.get(),
                codeFull: (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML),
                isHtml: this.needShowUI(lang),
                htmlLog: true,
                html: '',
                showPh: true,
                doc: '',
                id: '',
                initedLogEdit: false,

                hideHTMLResult: false,
                iframeSrc: '',

                iframeLoading: true,
            };
        },
        mounted () {
            console.log('mounted log');
            this.initCodeConfig();
            window.addEventListener('message', (e)=>{
                const data = e.data;
                if(data.type === 'iframe_log'){
                    console.log(...data.data);
                }else if(data.type === 'iframe_clear_log'){
                    console.clear();
                }else if(data.type === 'iframe_loaded'){
                    this.iframeLoading = false;
                }else if(data.type === 'run_code'){
                    event.emit(EVENT.RUN_CODE);
                }
            });
            event.regist({
                [EVENT.JSBOX_CODE_CHANGE]: () => {
                    this.initCodeConfig();
                },
                [EVENT.DRAG_PERCENT]: (percent) => {
                    this.percent = 100 - percent;
                },
                [EVENT.LANG_CHANGE]: (lang) => {
                    this.codeFull = (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML);
                    if (!this.codeFull) {
                        this.isHtml = this.needShowUI(lang);
                    }
                },
                [EVENT.HTML_PANEL_CHANGE]: (bool) => {
                    this.htmlLog = bool;
                },
                [EVENT.HTML_CONTENT_CHANGE]: (html) => {
                    this.html = html;
                    // this.$refs.logContent.innerHTML = html;
                },
                [EVENT.IFRAME_SRC]: (src) => {
                    this.iframeSrc = src;
                    // this.$refs.logContent.innerHTML = html;
                },
                [EVENT.STORE_CHANGE]: () => {
                    this.isHtml = this.needShowUI(language.get());
                    this.hideHTMLResult = !this.isHtml;
                    this.htmlLog = !store.hideLog;
                    this.id = store.id;

                    if(store.doc) {
                        const doc = parseMD(store.doc);
                        const div = document.createElement('div');
                        div.innerHTML = doc;
                        const codes = div.querySelectorAll('code');
                        if(codes.length > 0){
                            for(let i=0;i<codes.length;i++){
                                const el = codes[i];
                                el.innerHTML = parseCode(el.innerText);
                            }
                            this.doc = div.innerHTML;
                        }else{
                            this.doc = doc;
                        }
                        if(!store.needUI){
                            this.isHtml = true;
                            this.hideHTMLResult = true;
                        }
                    }else{
                        this.doc = '';
                    }
                },
            });
            initDrag(this.$refs.drag);
            this.initLog();
            htmlLog.init(this.htmlLog);
        },
        methods: {
            focusEditor(){
                this.$refs.editor.editor.focus();
            },
            initCodeConfig () {
                this.isHtml = this.needShowUI(language.get());
                this.jxUI = getAttrFromCodeSrc('useDefaultUI', false);
                this.htmlLog = !getAttrFromCodeSrc('hideLog', false);
                store.hideLog = !this.htmlLog;
            },
            needShowUI (lang) {
                return lang === LANG.HTML || getAttrFromCodeSrc('needUI', false) || store.needUI;
            },
            initLog () {
                let log = new Console({
                    container: this.$refs.log,
                    mode: 'light',
                });
                event.regist(EVENT.THEME_CHANGE, ()=>{
                    log.setMode(theme.get())
                });
                event.regist(EVENT.CLEAR_LOG, ()=>{
                    let el = document.querySelector('.cc-log-list');
                    if(el) el.innerHTML = '';
                });
                // let log = new Log();
                // log.page = this.$refs.log;
                // log.index = 0;
                // log.mounted();
                // initConsole(this.$refs.console);
            },
            toggleLogShow () {
                if (!this.initedLogEdit) {
                    if (!this.htmlLog) {
                        setTimeout(() => {this.$refs.editor.editor.layout();}, 0);
                    }
                    this.initedLogEdit = true;
                }
                htmlLog.set(!this.htmlLog);
            },
            onwheel (scroll) {
                let el = this.$refs.logWrapper;
                let top = el.scrollTop + scroll;
                if (top > el.scrollHeight) {
                    el.scrollTop = el.scrollHeight;
                } else if (top < 0) {
                    el.scrollTop = 0;
                } else {
                    el.scrollTop = top;
                }
            },
            scrollToBottom () {
                let el = this.$refs.logWrapper;
                el.scrollTop = el.scrollHeight;
            },
            focuConsole () {
                this.$refs.editor.focuConsole();
            }
        }
    };
</script>
<style lang="less">
    .log-log{
        .tc-log-list{
            padding-bottom: 0!important;
        }
        .console-mask{
            position: absolute;
            width: 100%;
            height: 100%;
            cursor: text;
        }
    }
</style>