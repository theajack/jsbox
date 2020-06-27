<template>
    <div :class='"drag-bar drag-bar-"+name' ref='drag'></div>
</template>
<script>
    import {getDragStatus, dragPercent as logPercent, language} from '../js/status';
    import $ from 'easy-dom-util';
    import {LANG} from '../js/constant';
    
    export default {
        props: {
            name: {
                type: String,
                required: true,
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
                let minWidth = (this.name === 'file') ? 100 : 200;
                dragPercent.init();
                let setDrag = (bool) => {
                    dragStatus.set(bool);
                    if (bool) {
                        width = $.windowSize().width;
                        if (this.name === 'file' && width > 600 && (language.get() === LANG.JAVASCRIPT || language.get() === LANG.HTML)) {
                            width = width * logPercent.get() * 0.01;
                        }
                    } else {
                        dragPercent.save();
                    }
                };
                let setSize = (x) => {
                    if (x < minWidth || x > width - minWidth) {
                        if (x < minWidth / 2 && this.name === 'file') {
                            dragPercent.stash(0);
                        }
                        if (x > width - minWidth / 2 && this.name === 'log') {
                            dragPercent.stash((1 - 6 / width) * 100);
                        }
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