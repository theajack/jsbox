<template>
    <div class='drag-bar' ref='drag'></div>
</template>
<script>
    import {getDragStatus} from '../js/status';
    import $ from 'easy-dom-util';

    export default {
        props: {
            name: {
                type: String,
                required: true
            }
        },
        mounted () {
            let drag = getDragStatus(this.name);
            this.initDrag(drag.percent, drag.status);
        },
        methods: {
            initDrag (dragPercent, dragStatus) {
                let drag = this.$refs.drag;
                let width = 0;
                let minWidth = 200;
                dragPercent.init();
                let setDrag = (bool) => {
                    dragStatus.set(bool);
                    if (bool) {
                        width = $.windowSize().width;
                    } else {
                        dragPercent.save();
                    }
                };
                let setSize = (x) => {
                    if (x < minWidth || x > width - minWidth) {
                        return;
                    }
                    dragPercent.stash((x / width) * 100);
                };
                $.query('body').on({
                    mousemove (e) {
                        if (dragStatus.get()) {
                            setSize(e.clientX);
                        }
                    },
                    mouseup () {
                        if (dragStatus.get()) {
                            setDrag(false);
                        }
                    },
                    mouseenter () {
                        setDrag(false);
                    }
                });
                $.query(drag).on({
                    mousedown () {
                        setDrag(true);
                    }
                });
            }
        }
    };
</script>