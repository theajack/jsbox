<template>
    <div class='log-panel' :class='{"log-hide": codeFull, "html-mode":isHtml}' :style='{width: percent+"%"}'>
        <div class='drag-bar' ref='drag'></div>
        <div class='log-html' :class='{"hide-log": !htmlLog}'>
            <i :class='"ei-chevron-"+(htmlLog?"right":"left")'
               @click='toggleLogShow'
               :title='(htmlLog?"隐藏":"显示")+"log(ctrl + k)"'></i>
            <div class='log-content' :class="{'jx-ui': jxUI}" id='jx-app' ref='logContent'></div>
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

                initedLogEdit: false,
            };
        },
        mounted () {
            // console.log(this.htmlLog);
            this.initCodeConfig();
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
                    this.$refs.logContent.innerHTML = html;
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
            },
            needShowUI (lang) {
                return lang === LANG.HTML || getAttrFromCodeSrc('needUI', false);
            },
            initLog () {
                let log = new Console({
                    container: this.$refs.log,
                    mode: 'light',
                });
                event.regist(EVENT.THEME_CHANGE, ()=>{
                    log.setMode(theme.get())
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