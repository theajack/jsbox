<template>
    <div class='code-panel' :style='{width: percent+"%"}' ref='editor'>
    </div>
</template>
<script>
    import '../style/editor.less';
    import {Editor} from './js/editor';
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    export default {
        data () {
            return {
                percent: 50
            };
        },
        mounted () {
            let editor = new Editor({
                el: this.$refs.editor,
                code: 'var a = "Hello world"'
            });
            event.regist({
                [EVENT.RESIZE]: () => {
                    editor.resize();
                },
                [EVENT.DRAG_PERCENT]: (percent) => {
                    this.percent = percent;
                    this.$nextTick(() => {
                        editor.resize();
                    });
                }
            });
        },
    };
</script>