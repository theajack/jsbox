<template>
    <span
        draggable='true'
        @mousedown='activeFile'
        @dragstart='dragStart'
        @drop='drop'
        @dragover='dragOver'
        class='files-header'
        :class='{
            "file-open": file.id === openedId,
            "unsaved": file.unsave === true,
            "drag-over": index === dragOverIndex
        }'>
        <i :class='"file-type "+file.style.icon' :style='{color: fileIconColor()}'></i>
        <span class='file-name'>{{file.name}}</span>
        <i class='ei-times file-close file-tail' @mousedown='stopPropagation' @mouseup='closeFile'></i>
        <i class='ei-circle file-unsave file-tail'></i>
    </span>
</template>
<script>
    import {THEME, MOUSE_BTN} from '../../../js/constant';
    export default {
        props: {
            theme: {
                required: true,
                type: String
            },
            openedId: {
                required: true,
                type: Number
            },
            file: {
                required: true,
                type: Object
            },
            index: {
                required: true,
                type: Number
            },
            dragOverIndex: {
                required: true,
                type: Number
            }
        },
        methods: {
            drop () {
                this.$emit('drop', this.index);
            },
            dragOver () {
                this.$emit('dragOver', this.index);
            },
            dragStart () {
                this.$emit('dragStart', this.index);
            },
            closeFile () {
                this.$emit('closeFile', this.index);
            },
            activeFile () {
                this.$emit('activeFile', this.index);
            },
            stopPropagation (event) {
                if (event.button !== MOUSE_BTN.LEFT) {
                    return;
                }
                event.stopPropagation();
            },
            fileIconColor () {
                let isDark = this.theme === THEME.DARK;
                return this.file.style[isDark ? 'dark' : 'light'];
            }
        },
        data () {
            return {
            };
        }
    };
</script>