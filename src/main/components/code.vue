<template>
    <div class='code-panel' :class='{"code-full":codeFull}' :style='{width: percent+"%"}' ref='editor'>
        <status-bar></status-bar>
    </div>
</template>
<script>
    import '../style/editor.less';
    import {Editor, LANG, THEME} from './js/editor';
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {code, language, theme, fontSize} from '../js/status';
    import {toast} from 'tacl-ui';
    import {getUrlParam, DEFAULT_CODE} from '../js/util';
    import {initConfig} from './js/config';
    import StatusBar from './status.vue';
    export default {
        components: {StatusBar},
        data () {
            return {
                percent: 50,
                codeFull: false,
            };
        },
        mounted () {
            let editor = new Editor({
                el: this.$refs.editor,
                fontSize: fontSize.get(),
                onchange () {
                    event.emit(EVENT.CODE_CHANGE);
                }
            });
            event.regist({
                [EVENT.RESIZE]: () => {
                    setTimeout(() => {
                        editor.resize();
                    }, 10);
                },
                [EVENT.DRAG_PERCENT]: (percent) => {
                    this.percent = percent;
                    this.$nextTick(() => {
                        editor.resize();
                    });
                },
                [EVENT.LANG_CHANGE]: (lang) => {
                    editor.changeLang(lang);
                    this.codeFull = (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML);
                    this.$nextTick(() => {
                        editor.resize();
                    });
                },
                [EVENT.SET_CODE]: (value) => {
                    editor.code(value);
                },
                [EVENT.USE_CODE]: (fn) => {
                    fn(editor.code());
                },
                [EVENT.THEME_CHANGE]: (theme) => {
                    document.body.className = (theme === THEME.DARK) ? 'dark' : '';
                    editor.changeTheme(theme);
                },
                [EVENT.FONT_SIZE_CHANGE]: (type) => {
                    if (!editor[type === 'up' ? 'fontSizeUp' : 'fontSizeDown']()) {
                        toast('超过可设置大小');
                    } else {
                        fontSize.set(editor.fontSize, true, false);
                    }
                }
            });
            event.emit(EVENT.EDITOR_MOUNTED, editor);
            this.initCode();
        },
        methods: {
            initCode () {
                theme.init(getUrlParam('theme'));
                initConfig(code, () => {
                    event.emit(EVENT.RUN_CODE);
                }, () => {
                    let _code = getUrlParam('code');
                    let _lang = getUrlParam('lang');
                    if (_lang === 'js' || _lang === 'javascript') {
                        _lang = LANG.JAVASCRIPT;
                    }
                    if (_lang === 'html') {
                        _lang = LANG.HTML;
                    }
                    if (location.hash === '#hello') {
                        _code = DEFAULT_CODE;
                        _lang = LANG.JAVASCRIPT;
                    }
                    code.init(_code);
                    language.init(_lang);
                });
            }
        }
    };
</script>