<template>
    <div class='log-panel' :class='{"log-hide": codeFull, "html-mode":isHtml}' :style='{width: percent+"%"}'>
        <div class='drag-bar' ref='drag'></div>
        <div class='log-html' :class='{"hide-log": !htmlLog}'>
            <i :class='"ei-chevron-"+(htmlLog?"right":"left")'
               @click='toggleLogShow'
               :title='(htmlLog?"隐藏":"显示")+"log(ctrl + k)"'></i>
            <div class='log-content' v-html='html'></div>
        </div>
        <div ref='log' class='log-log' :class='{"hide-log": !htmlLog}'></div>
    </div>
</template>
<script>
    import {EVENT} from '../js/constant';
    import {initDrag} from '../js/initEvent';
    import event from '../js/event';
    import Log from '../log';
    import {LANG} from './js/editor';
    import {htmlLog, language} from '../js/status';
    export default {
        data () {
            return {
                percent: 50,
                codeFull: false,
                isHtml: false,
                htmlLog: true,
                html: '',
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
            initDrag(this.$refs.drag);
            this.initLog();
            htmlLog.init();
        },
        methods: {
            initLog () {
                let log = new Log();
                log.page = this.$refs.log;
                log.index = 0;
                log.mounted();
                log.page.querySelector('.tc-log-clear').title = '清空log(ctrl + e)';
            },
            toggleLogShow () {
                htmlLog.set(!this.htmlLog);
            }
        }
    };
</script>