<template>
    <div class='log-panel' :class='{"log-hide": codeFull, "html-mode":isHtml}' :style='{width: percent+"%"}'>
        <!-- <div class='drag-bar' ref='drag'></div> -->
        <drag-bar name='log'></drag-bar>
        <div class='log-html' :class='{"hide-log": !htmlLog}'>
            <i :class='"ei-chevron-"+(htmlLog?"right":"left")'
               @click='toggleLogShow'
               :title='(htmlLog?"隐藏":"显示")+"log(ctrl + k)"'></i>
            <div class='log-content' v-html='html'></div>
        </div>
        <div class='log-log' ref='logWrapper' :class='{"hide-log": !htmlLog}'>
            <div class='console-mask' @click='focuConsole'></div>
            <div ref='log'></div>
            <console-editor ref='editor' @onwheel='onwheel' @scrollToBottom='scrollToBottom'></console-editor>
        </div>
    </div>
</template>
<script>
    import {EVENT} from '../js/constant';
    import event from '../js/event';
    import Log from '../log';
    import {LANG} from './js/editor';
    import {htmlLog, language, dragPercent} from '../js/status';
    // import {initConsole, focusEnd} from './js/log-console';
    // import {initConsole, focusEnd} from './js/log-console';
    import ConsoleEditor from './console-editor.vue';
    import DragBar from './drag-bar.vue';
    let lang = language.get();
    export default {
        components: {ConsoleEditor, DragBar},
        data () {
            return {
                percent: 100 - dragPercent.get(),
                codeFull: (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML),
                isHtml: (lang === LANG.HTML),
                htmlLog: true,
                html: '',
                showPh: true
            };
        },
        mounted () {
            this.isHtml = language.get() === LANG.HTML;
            event.regist({
                [EVENT.DRAG_PERCENT]: (percent) => {
                    this.percent = 100 - percent;
                },
                [EVENT.LANG_CHANGE]: (lang) => {
                    this.codeFull = (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML);
                    if (!this.codeFull) {
                        this.isHtml = (lang === LANG.HTML);
                    }
                },
                [EVENT.HTML_PANEL_CHANGE]: (bool) => {
                    this.htmlLog = bool;
                },
                [EVENT.HTML_CONTENT_CHANGE]: (html) => {
                    this.html = html;
                }
            });
            this.initLog();
            htmlLog.init();
        },
        methods: {
            initLog () {
                let log = new Log();
                log.page = this.$refs.log;
                log.index = 0;
                log.mounted();
                // initConsole(this.$refs.console);
            },
            toggleLogShow () {
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