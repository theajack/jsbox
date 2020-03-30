<template>
    <div class='log-panel' :style='{width: percent+"%"}'>
        <div class='drag-bar' ref='drag'></div>
        <div class='log-html'>
            <i class='ei-chevron-right' title='隐藏log(ctrl + k)'></i>
            <div class='log-content'></div>
        </div>
        <div class='log-log'></div>
    </div>
</template>
<script>
    import {EVENT} from '../js/constant';
    import {initDrag} from '../js/initEvent';
    import event from '../js/event';
    export default {
        data () {
            return {
                percent: 50
            };
        },
        mounted () {
            event.regist({
                [EVENT.DRAG_PERCENT]: (percent) => {
                    this.percent = 100 - percent;
                }
            });
            initDrag(this.$refs.drag);
        },
    };
</script>