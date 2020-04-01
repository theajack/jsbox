<template>
    <div class='code-panel' :class='{"code-full":codeFull}' :style='{width: percent+"%"}' ref='editor'>
    </div>
</template>
<script>
    import '../style/editor.less';
    import {Editor, LANG, THEME} from './js/editor';
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {code, language, theme, fontSize} from '../js/status';
    import {toast} from 'tacl-ui';
    export default {
        data () {
            return {
                percent: 50,
                codeFull: false,
            };
        },
        mounted () {
            let editor = new Editor({
                el: this.$refs.editor,
                fontSize: fontSize.get()
            });
            window.editor = editor;
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
                [EVENT.CODE_CHANGE]: (value) => {
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
            code.init();
            language.init();
            theme.init();
        },
    };
</script>