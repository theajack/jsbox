<template>
    <div :class='"drag-bar drag-bar-"+name' ref='drag'></div>
</template>
<script>
    import {getDragStatus, dragPercent as logPercent, language} from '../js/status';
    import $ from 'easy-dom-util';
    import {LANG, DRAG_TYPE, EVENT} from '../js/constant';
    import event from '../js/event';
    
    export default {
        props: {
            name: {
                type: String,
                required: true,
            }
        },
        mounted () {
            const drag = getDragStatus(this.name);
            this.initDrag(drag.percent, drag.status);
        },
        methods: {
            initDrag (dragPercent, dragStatus) {
                const drag = this.$refs.drag;
                let width = 0;
                const minWidth = (this.name === DRAG_TYPE.FILE) ? 100 : 200;
                dragPercent.init();
                const setDrag = (bool) => {
                    dragStatus.set(bool);
                    if (bool) {
                        width = $.windowSize().width;
                        if (this.name === DRAG_TYPE.FILE && width > 600 && (language.get() === LANG.JAVASCRIPT || language.get() === LANG.HTML)) {
                            width = width * logPercent.get() * 0.01;
                        }
                    } else {
                        dragPercent.save();
                    }
                };
                let logVisable = true;
                const setLogVisable = (bool) => {
                    if (this.name !== DRAG_TYPE.LOG) {return;}
                    if (bool !== logVisable) {
                        logVisable = bool;
                        event.emit(EVENT.LOG_PANEL_VIS_CHANGE, bool);
                    }
                };
                if (this.name === DRAG_TYPE.LOG) {
                    setTimeout(() => {
                        setLogVisable(dragPercent.get() < 90);
                    }, 0);
                }
                const setSize = (x) => {
                    if (x < minWidth || x > width - minWidth) {
                        if (x < minWidth / 2 && this.name === DRAG_TYPE.FILE) {
                            dragPercent.stash(0);
                        }
                        if (x > width - minWidth / 2 && this.name === DRAG_TYPE.LOG) {
                            setLogVisable(false);
                            dragPercent.stash((1 - 6 / width) * 100);
                        }
                        return;
                    }
                    setLogVisable(true);
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