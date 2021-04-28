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
    import {fontSize, theme} from '../js/status';
    import {globalFileAttr} from './files/file';
    import {toast} from '../js/util';
    import {addIntoEditorPool} from './js/editor-pool';
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
                    if (this._editor) {
                        if (this.isActive()) {
                            this.$nextTick(() => {
                                this._editor.resize();
                                this._editor.changeTheme(theme.get());
                                this._editor.setFontSize(fontSize.get());
                                this.focus();
                            });
                        }
                    } else {
                        this.initEditor();
                    }
                }
            },
            'file.lang': function (lang) {
                if (this._editor)
                    this._editor.changeLang(lang);
            }
        },
        mounted () {
            if (this.isActive()) {
                this.initEditor();
            }
        },
        methods: {
            focus (end = false) {
                setTimeout(() => {
                    this._editor[end ? 'focusEnd' : 'focus']();
                }, 100);
            },
            isActive (callback) {
                const active = this.globalFileAttr.openedId === this.file.id;
                if (active && typeof callback === 'function') {callback();}
                return active;
            },
            resize () {
                if (this.isActive()) {
                    this.$nextTick(() => {
                        this._editor.resize();
                    });
                }
            },
            initEditor () {
                if (this._editor) {
                    return;
                }
                loadMonaco().then(() => {
                    this._editor = new Editor({
                        el: this.$refs.editor,
                        fontSize: fontSize.get(),
                        theme: theme.get(),
                        code: this.file.content,
                        lang: this.file.style.lang,
                        onchange (c) {
                            event.emit(EVENT.CODE_CHANGE, c);
                        },
                        oncursorchange (position) {
                            event.emit(EVENT.CURSOR_CHANGE, position);
                        }
                    });
                    addIntoEditorPool(this.file.id, this._editor);
                    event.regist({
                        [EVENT.RESIZE]: () => {
                            console.log('resize');
                            this.resize();
                        },
                        [EVENT.DRAG_PERCENT]: () => {
                            this.resize();
                        },
                        [EVENT.FILE_DRAG_PERCENT]: () => {
                            this.resize();
                        },
                        [EVENT.USE_CODE]: (fn) => {
                            if (this.isActive()) {
                                fn(this._editor.code());
                            }
                        },
                        [EVENT.THEME_CHANGE]: (theme) => {
                            if (this.isActive()) {
                                this._editor.changeTheme(theme);
                            }
                        },
                        [EVENT.FONT_SIZE_CHANGE]: (type) => {
                            if (this.isActive()) {
                                if (!this._editor[type === 'up' ? 'fontSizeUp' : 'fontSizeDown']()) {
                                    toast('超过可设置大小');
                                } else {
                                    fontSize.set(this._editor.fontSize, true, false);
                                    // event.emit(EVENT.EDITOR_MOUNTED, editor);
                                }
                            }
                        }
                        // [EVENT.LANG_CHANGE]: (lang) => {
                        //     this._editor.changeLang(lang);
                        //     this.codeFull = (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML);
                        //     this.$nextTick(() => {
                        //         this._editor.resize();
                        //     });
                        //     // event.emit(EVENT.EDITOR_MOUNTED, editor);
                        //     // event.emit(EVENT.MIAN_EDITOR_INITED, editor);
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
                    event.emit(EVENT.EDITOR_MOUNTED, this._editor);
                    this.focus(true);
                // this.initCode();
                });
            },
        }
    };
</script>
<style lang="less">
.c-monaco-editor{
    width: 100%;
    height: 100%;
}
</style>