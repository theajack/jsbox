<template>
    <div class='code-panel' :class='{"code-full":codeFull}' :style='{width: percent+"%"}'>
        <jsbox-files></jsbox-files>
        <div ref='editor' class='code-area' :style='{width: filePercent+"%"}'>
            <drag-bar name='file'></drag-bar>
            <monaco
                v-for='file in openFiles'
                v-bind:key='file.id'
                :file='file'>
            </monaco>
        </div>
        <status-bar></status-bar>
    </div>
</template>
<script>
    import '../style/editor.less';
    // import {Editor, loadMonaco} from './js/editor';
    import event from '../js/event';
    import {LANG, ALIAS, EVENT, THEME} from '../js/constant';
    import {code, language, theme, dragPercent, fileDragPercent} from '../js/status';
    import {getUrlParam, DEFAULT_CODE} from '../js/util';
    // import {LANG, THEME, ALIAS, EVENT} from '../js/constant';
    // import {code, language, theme, fontSize, dragPercent, fileDragPercent} from '../js/status';
    // import {getUrlParam, DEFAULT_CODE, toast} from '../js/util';
    import {initConfig} from './js/config';
    import StatusBar from './status.vue';
    import {decompressUrl} from '../js/compress';
    import JsboxFiles from './files/components/files.vue';
    import Monaco from './monaco.vue';
    import DragBar from './drag-bar.vue';
    import {initFileHeaders} from './files/file-header';
    import {globalFileAttr} from './files/file';
    
    export default {
        components: {StatusBar, JsboxFiles, DragBar, Monaco},
        data () {
            return {
                globalFileAttr,
                openFiles: initFileHeaders(),
                percent: dragPercent.get(),
                filePercent: 100 - fileDragPercent.get(),
                codeFull: false,
            };
        },
        mounted () {
            window._v = this;
            event.regist({
                [EVENT.DRAG_PERCENT]: (percent) => {
                    this.percent = percent;
                },
                [EVENT.FILE_DRAG_PERCENT]: (filePercent) => {
                    this.filePercent = 100 - filePercent;
                },
                [EVENT.THEME_CHANGE]: (theme) => {
                    document.body.className = (theme === THEME.DARK) ? 'dark' : '';
                },
            });
            theme.init(getUrlParam('theme'));
            // loadMonaco().then(() => {
            //     let editor = new Editor({
            //         el: this.$refs.editor,
            //         fontSize: fontSize.get(),
            //         onchange (c) {
            //             event.emit(EVENT.CODE_CHANGE, c);
            //         },
            //         oncursorchange (position) {
            //             event.emit(EVENT.CURSOR_CHANGE, position);
            //         }
            //     });
            //     event.regist({
            //         [EVENT.RESIZE]: () => {
            //             setTimeout(() => {
            //                 editor.resize();
            //             }, 10);
            //         },
            //         [EVENT.DRAG_PERCENT]: (percent) => {
            //             this.percent = percent;
            //             this.$nextTick(() => {
            //                 editor.resize();
            //             });
            //         },
            //         [EVENT.FILE_DRAG_PERCENT]: (filePercent) => {
            //             this.filePercent = 100 - filePercent;
            //             this.$nextTick(() => {
            //                 editor.resize();
            //             });
            //         },
            //         [EVENT.LANG_CHANGE]: (lang) => {
            //             editor.changeLang(lang);
            //             this.codeFull = (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML);
            //             this.$nextTick(() => {
            //                 editor.resize();
            //             });
            //             event.emit(EVENT.EDITOR_MOUNTED, editor);
            //             event.emit(EVENT.MIAN_EDITOR_INITED, editor);
            //         },
            //         [EVENT.SET_CODE]: (value) => {
            //             editor.code(value);
            //         },
            //         [EVENT.USE_CODE]: (fn) => {
            //             fn(editor.code());
            //         },
            //         [EVENT.THEME_CHANGE]: (theme) => {
            //             document.body.className = (theme === THEME.DARK) ? 'dark' : '';
            //             editor.changeTheme(theme);
            //         },
            //         [EVENT.FONT_SIZE_CHANGE]: (type) => {
            //             if (!editor[type === 'up' ? 'fontSizeUp' : 'fontSizeDown']()) {
            //                 toast('超过可设置大小');
            //             } else {
            //                 fontSize.set(editor.fontSize, true, false);
            //                 event.emit(EVENT.EDITOR_MOUNTED, editor);
            //             }
            //         }
            //     });
            //     event.emit(EVENT.EDITOR_MOUNTED, editor);
            //     this.initCode();
            // });
        },
        methods: {
            initCode () {
                let autoRun = getUrlParam('run') !== 'false';
                theme.init(getUrlParam('theme'));
                initConfig(code, () => {
                    if (autoRun) {
                        event.emit(EVENT.RUN_CODE);
                    }
                }, () => {
                    let _code = getUrlParam('code');
                    if (_code === null) {
                        _code = '';
                    } else {
                        _code = decompressUrl(_code);
                    }
                    let _lang = getUrlParam('lang');
                    if (ALIAS[_lang]) {
                        _lang = ALIAS[_lang];
                    }
                    if (location.hash === '#hello') {
                        _code = DEFAULT_CODE;
                        _lang = LANG.JAVASCRIPT;
                    }
                    code.init(_code);
                    language.init(_lang);
                    if (_code !== '' && autoRun) {
                        event.emit(EVENT.RUN_CODE);
                    }
                });
            }
        }
    };
</script>
<style lang="less">
    .code-panel{
        .drag-bar{

        }
        .files-w{
            width: 20%;
            height: 100%;
            float: left;
            overflow: hidden;
        }
        .code-area{
            width: 80%;
            height: 100%;
            float: left;
            position: relative;
        }
    }
</style>