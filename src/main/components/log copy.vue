<template>
    <div class='log-panel' :class='{"log-hide": codeFull, "html-mode":isHtml}' :style='{width: percent+"%"}'>
        <div class='drag-bar' ref='drag'></div>
        <div class='log-html' :class='{"hide-log": !htmlLog}'>
            <i :class='"ei-chevron-"+(htmlLog?"right":"left")'
               @click='toggleLogShow'
               :title='(htmlLog?"隐藏":"显示")+"log(ctrl + k)"'></i>
            <div class='log-content' v-html='html'></div>
        </div>
        <div class='log-log' :class='{"hide-log": !htmlLog}'>
            <div class='console-mask' @click='focuConsole'></div>
            <div ref='log'></div>
            <div class='console-w'>
                <i class='ei-angle-right console-i'></i>
                <div v-show='showPh' class='console-placeholder'>运行代码…</div>
                <div type='text' ref='console' contenteditable='true' class='console-input'></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {EVENT} from '../js/constant';
    import {initDrag} from '../js/initEvent';
    import event from '../js/event';
    import Log from '../log';
    import {LANG} from './js/editor';
    import {htmlLog, language, dragPercent} from '../js/status';
    import {initConsole, focusEnd} from './js/log-console';
    let lang = language.get();
    export default {
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
                },
                [EVENT.CONSOLE_VAL_CHANGE]: (val) => {
                    this.showPh = val === '';
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
                initConsole(this.$refs.console);
            },
            toggleLogShow () {
                htmlLog.set(!this.htmlLog);
            },
            focuConsole: focusEnd,
        }
    };
</script>
<style lang="less">
    .log-log{
        padding-bottom: 30px;
        .tc-log-list{
            padding-bottom: 0!important;
        }
        .console-w{
            position: relative;
            .console-i{
                position: absolute;
                top: 2px;
            }
            .console-input{
                padding-left: 20px;
                outline: none;
                font-size: 13px;
                position: relative;
                top: 2px;
            }
            .console-placeholder{
                font-size: 12px;
                position: absolute;
                padding-left: 21px;
                top: 2px;
                color: #bbb;
            }
        }
        .console-mask{
            position: absolute;
            width: 100%;
            height: 100%;
        }
    }
    body.dark{
        .console-placeholder{
            color: #666;
        }
    }
</style>