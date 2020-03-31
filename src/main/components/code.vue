<template>
    <div class='code-panel' :class='{"code-full":codeFull}' :style='{width: percent+"%"}' ref='editor'>
    </div>
</template>
<script>
    import '../style/editor.less';
    import {Editor, LANG, THEME} from './js/editor';
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {code, language} from '../js/status';
    export default {
        data () {
            return {
                percent: 50,
                codeFull: false,
            };
        },
        mounted () {
            let editor = new Editor({
                el: this.$refs.editor
            });
            window.editor = editor;
            event.regist({
                [EVENT.RESIZE]: () => {
                    editor.resize();
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
                }
            });
            code.init();
            language.init();
            editor.changeTheme(THEME.DARK);
        },
    };
</script>