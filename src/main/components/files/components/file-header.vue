<template>
    <div class='files-header-w' ref='header'><!--
        --><span class='files-header-block' :style='{width: fileWidth+"px"}'>
            <span><i class='ef-package'></i> 资源管理器</span>
        </span><!--
        --><span v-for='(item, index) in openFiles'
              :key='index' draggable='true'
              @mousedown='activeFile(index)'
              @dragstart='dragStart(index)'
              @drop='drop(index)'
              @dragover='allowDrop(index)'
              class='files-header'
              :class='{
                  "file-open": item.id === globalFileAttr.openedId,
                  "unsaved": item.unsave === true,
                  "drag-over": index === dragOverIndex
              }'>
            <i :class='"file-type "+item.style.icon' :style='{color: fileIconColor(item)}'></i>
            <span class='file-name'>{{item.name}}{{item.id}}</span>
            <i class='ei-times file-close file-tail' @mousedown='stopPropagation' @mouseup='closeFile(index)'></i>
            <i class='ei-circle file-unsave file-tail'></i>
        </span>
    </div>
</template>
<script>
    import {EVENT, THEME, MOUSE_BTN} from '../../../js/constant';
    import {evt} from '../../../js/event';
    import {fileDragPercent, dragPercent} from '../../../js/status';
    import $ from 'easy-dom-util';
    import {globalFileAttr} from '../file';
    import {initFileHeaders, onRemoveFileHeader, onOpenFile, onChangeContentFile, checkParent} from '../file-header';
    import {writeFilesHeader, writeOpenFileID} from '../storage';
    export default {
        methods: {
            drop (dropIndex) {
                if (dropIndex !== this.dragIndex) {
                    let dragItem = this.openFiles[this.dragIndex];
                    if (dropIndex >  this.dragIndex) {
                        for (let i = this.dragIndex; i < dropIndex; i++) {
                            this.openFiles[i] = this.openFiles[i + 1];
                        }
                    } else {
                        for (let i = this.dragIndex; i > dropIndex; i--) {
                            this.openFiles[i] = this.openFiles[i - 1];
                        }
                    }
                    this.openFiles.splice(dropIndex, 1, dragItem);

                    writeFilesHeader();
                }
                this.dragOverIndex = -1;
            },
            allowDrop (index) {
                if (index !== this.dragOverIndex) {
                    this.dragOverIndex = index;
                }
                event.preventDefault();
            },
            dragStart (index) {
                this.dragIndex = index;
            },
            closeFile (index) {
                if (event.button !== MOUSE_BTN.LEFT) {
                    return;
                }
                this.removeFromOpenPath(this.openFiles[index].id);
                onRemoveFileHeader(index);
                console.log(event);
                event.stopPropagation();
            },
            stopPropagation (event) {
                if (event.button !== MOUSE_BTN.LEFT) {
                    return;
                }
                event.stopPropagation();
            },
            activeFile (index) {
                if (event.button !== MOUSE_BTN.LEFT) {
                    return;
                }
                let id = this.openFiles[index].id;
                if (id !== this.globalFileAttr.contentId) {
                    onChangeContentFile(id);
                }
                if (id !== this.globalFileAttr.openedId) {
                    onOpenFile(id);
                    this.pushIntoOpenPath();
                } else {
                    checkParent(id);
                }
            },
            removeFromOpenPath (id) {
                for (let i = this.openPath.length - 1; i >= 0; i--) {
                    if (this.openPath[i] === id) {
                        this.openPath.splice(i, 1);
                        writeFilesHeader();
                        break;
                    }
                }
                this.activeFileByClose();
            },
            pushIntoOpenPath () {
                this.openPath.push(this.globalFileAttr.openedId);
            },
            activeFileByClose () {
                if (this.openPath.length > 0) {
                    onOpenFile(this.openPath[this.openPath.length - 1]);
                    writeOpenFileID();
                }
            },
            initOpenPath () {
                this.openPath = this.openFiles.map(item => {return item.id;});
                let index = this.openPath.indexOf(this.globalFileAttr.openedId);
                if (index !== -1) {
                    this.openPath.splice(index, 1);
                    this.openPath.push(this.globalFileAttr.openedId);
                }
            },
            countWidth () {
                let w = $.windowSize().width;
                if (w > 600) {
                    this.fileWidth = w * dragPercent.get() * fileDragPercent.get() * 0.0001;
                } else {
                    this.fileWidth = w * fileDragPercent.get() * 0.01;
                }
            },
            findFileIndex (id) {
                for (let i = 0; i < this.openFiles.length; i++) {
                    if (id === this.openFiles[i].id) {
                        return i;
                    }
                }
                return -1;
            },
            reinitPosition (id) {
                this.$nextTick(() => {
                    let index = this.findFileIndex(id);
                    if (index === -1) {
                        return;
                    }
                    let el = this.$refs.header.children[index + 1];
                    let w = $.windowSize().width;
                    let left = el.offsetLeft - this.$refs.header.scrollLeft;
                    if (left < 0 || left > w - el.offsetWidth) {
                        this.$refs.header.scrollLeft = el.offsetLeft - this.fileWidth;
                    }
                });
            },
            fileIconColor (item) {
                let isDark = globalFileAttr.theme === THEME.DARK;
                return isDark ? item.style.dark : item.style.light;
            }
        },
        mounted () {
            this.initOpenPath();
            this.countWidth();
            evt.regist({
                [EVENT.FILE_DRAG_PERCENT]: this.countWidth,
                [EVENT.DRAG_PERCENT]: this.countWidth,
                [EVENT.RESIZE]: this.countWidth,
                [EVENT.FILE_CLICK]: (item) => {
                    this.reinitPosition(item.id);
                }
            });
            this.$refs.header.onwheel = function (event) {
                event.preventDefault();
                var step = 100;
                if (event.deltaY < 0) {
                    this.scrollLeft -= step;
                } else {
                    this.scrollLeft += step;
                }
            };
            this.reinitPosition(this.globalFileAttr.openedId);
        },
        data () {
            return {
                fileWidth: 100,
                openPath: [], // 维护一个最近打开的数组，用户关闭时打开上一次打开的文件
                dragOverIndex: -1,
                dragIndex: -1,
                globalFileAttr,
                openFiles: initFileHeaders()
                // [{
                //     id: 0,
                //     name: 'index0.txt',
                // }, {
                //     id: 1,
                //     name: 'index1.txt',
                //     unsave: true,
                // }, {
                //     id: 2,
                //     name: 'index2.txt',
                // }, {
                //     id: 3,
                //     name: 'index3.txt',
                // }, {
                //     id: 4,
                //     name: 'index311111.txt',
                // }, {
                //     id: 5,
                //     name: 'index3.txt',
                // }, {
                //     id: 6,
                //     name: 'index311111.txt',
                // }, {
                //     id: 7,
                //     name: 'index3.txt',
                // }, {
                //     id: 8,
                //     name: 'index311111.txt',
                // }, {
                //     id: 9,
                //     name: 'index3.txt',
                // }, {
                //     id: 10,
                //     name: 'index311111.txt',
                // }, {
                //     id: 11,
                //     name: 'index3.txt',
                // }, {
                //     id: 12,
                //     name: 'index311111.txt',
                // }, {
                //     id: 13,
                //     name: 'index3.txt',
                // }, {
                //     id: 14,
                //     name: 'index311111.txt',
                // }, {
                //     id: 15,
                //     name: 'index3.txt',
                // }, {
                //     id: 16,
                //     name: 'index311111.txt',
                // }]
            };
        }
    };
</script>
<style lang="less" scoped>
    .files-header-w{
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        height: 30px;
        background-color: #f3f3f3;
        .files-header-block{
            display: inline-block;
            height: 100%;
            line-height: 30px;
            font-size: 12px;
            color: #888;
            span{
                margin-left: 10px;
            }
        }
        &::-webkit-scrollbar {
            width:2px;
            cursor: pointer;
            height: 2px;
            display: none;
            // opacity: 0;
        }
        &:hover{
            &::-webkit-scrollbar {
                display: block;
                // opacity: 1;
            }
        }
        .files-header{
            background-color: #ececec;
            border-bottom: 1px solid #f3f3f3;
            font-size: 14px;
            padding: 5px 10px;
            display: inline-block;
            height: 30px;
            border-left: 1px solid #f3f3f3;
            color: #444;
            cursor: pointer;
            position: relative;
            padding-right: 25px;
            &:first-child{
                border: none;
            }
            &.drag-over{
                background-color: #cedcec;
            }
            &.file-open{
                background-color: #fff;
                color: #222;
            }
            .file-type{
                font-size: 13px;
            }
            .file-name{

            }
            .file-tail{
                position: absolute;
                right: 5px;
                top: 9px;
                display: none;
            }
            .file-unsave{
                font-size: 12px;
                transform: scale(0.75);
            }
            .file-close{
                top:8px;
            }
            &.active{
                .file-close{
                    display: inline;
                }
            }
            &.unsaved{
                .file-close{
                    display: none;
                }
                .file-unsave{
                    display: inline;
                }
            }
            &:hover{
                .file-close{
                    display: inline;
                }
                .file-unsave{
                    display: none;
                }
            }
        }
    }
    body.dark{
        .files-header-w{
            background-color: #252526;
            .files-header{
                border-bottom: 1px solid #2d2d2d;
                background-color: #2d2d2d;
                border-left: 1px solid #252525;
                color: #969696;
                &.drag-over{
                    background-color: #3c3f42;
                }
                &.file-open{
                    background-color: #1e1e1e;
                    color: #fff;
                }
            }
        }
    }
</style>