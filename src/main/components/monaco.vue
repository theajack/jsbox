<template>
    <div ref='editor' v-show='globalFileAttr.openedId === file.id' class='c-monaco-editor'>
    </div>
</template>
<script>
    import '../style/editor.less';
    import {Editor, loadMonaco} from './js/editor';
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    // import {LANG, THEME, ALIAS, EVENT} from '../js/constant';
    // import {code, language, theme, fontSize} from '../js/status';
    import {fontSize} from '../js/status';
    import {globalFileAttr} from './files/file';
    // import {getUrlParam, DEFAULT_CODE, toast} from '../js/util';
    // import {initConfig} from './js/config';
    // import {decompressUrl} from '../js/compress';
    
    export default {
        data () {
            return {
                globalFileAttr,
                init: false
            };
        },
        props: {
            file: {
                type: Object,
                required: true
            }
        },
        watch: {
            'globalFileAttr.openedId': function (newOid) {
                if (newOid === this.file.id) {
                    this.initEditor();
                }
            }
        },
        mounted () {
            if (this.globalFileAttr.openedId === this.file.id) {
                this.initEditor();
            }
        },
        methods: {
            initEditor () {
                if (this.init) {
                    return;
                }
                this.init = true;
                loadMonaco().then(() => {
                    let editor = new Editor({
                        el: this.$refs.editor,
                        fontSize: fontSize.get(),
                        onchange (c) {
                            event.emit(EVENT.CODE_CHANGE, c);
                        },
                        oncursorchange (position) {
                            event.emit(EVENT.CURSOR_CHANGE, position);
                        }
                    });
                    console._log(editor);
                    event.regist({
                        [EVENT.RESIZE]: () => {
                            setTimeout(() => {
                                editor.resize();
                            }, 10);
                        },
                    // [EVENT.DRAG_PERCENT]: () => {
                    //     this.$nextTick(() => {
                    //         editor.resize();
                    //     });
                    // },
                    // [EVENT.FILE_DRAG_PERCENT]: () => {
                    //     this.$nextTick(() => {
                    //         editor.resize();
                    //     });
                    // },
                    // [EVENT.LANG_CHANGE]: (lang) => {
                    //     editor.changeLang(lang);
                    //     this.codeFull = (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML);
                    //     this.$nextTick(() => {
                    //         editor.resize();
                    //     });
                    //     event.emit(EVENT.EDITOR_MOUNTED, editor);
                    //     event.emit(EVENT.MIAN_EDITOR_INITED, editor);
                    // },
                    // [EVENT.SET_CODE]: (value) => {
                    //     editor.code(value);
                    // },
                    // [EVENT.USE_CODE]: (fn) => {
                    //     fn(editor.code());
                    // },
                    // [EVENT.THEME_CHANGE]: (theme) => {
                    //     document.body.className = (theme === THEME.DARK) ? 'dark' : '';
                    //     editor.changeTheme(theme);
                    // },
                    // [EVENT.FONT_SIZE_CHANGE]: (type) => {
                    //     if (!editor[type === 'up' ? 'fontSizeUp' : 'fontSizeDown']()) {
                    //         toast('超过可设置大小');
                    //     } else {
                    //         fontSize.set(editor.fontSize, true, false);
                    //         event.emit(EVENT.EDITOR_MOUNTED, editor);
                    //     }
                    // }
                    });
                // event.emit(EVENT.EDITOR_MOUNTED, editor);
                // this.initCode();
                });
            }
        }
    };
</script>
<style lang="less">
.c-monaco-editor{
    width: 100%;
    height: 100%;
}
</style>