<template>
    <div class='code-panel' ref='editor'>
    </div>
</template>
<script>
    import {Editor} from './js/editor';
    import event from '../js/event';
    export default {
        data () {
            return {
                
            };
        },
        mounted () {
            new Editor({
                el: this.$refs.editor,
                code: 'aa'
            });
            event.regist('');
        }
    };
</script>