<template>
    <div class='files-header-w' ref='header'>
        <span v-for='(item, index) in openFiles'
              :key='index' draggable='true'
              @mousedown='activeFile(index)'
              @dragstart='dragStart(index)'
              @drop='drop(index)'
              @dragover='allowDrop(index)'
              class='files-header'
              :class='{
                  "file-open": item.id === opendId,
                  "unsaved": item.unsave === true,
                  "drag-over": index === dragOverIndex
              }'>
            <i class='ei-file-code file-type'></i>
            <span class='file-name'>{{item.name}}</span>
            <i class='ei-times file-close file-tail' @click='closeFile(index)'></i>
            <i class='ei-circle file-unsave file-tail'></i>
        </span>
    </div>
</template>
<script>
    export default {
        methods: {
            drop (dropIndex) {
                console.log(this.dragIndex, dropIndex);
                if (dropIndex !== this.dragIndex) {
                    let item = this.openFiles[this.dragIndex];
                    let target = this.openFiles[dropIndex];
                    this.openFiles.splice(this.dragIndex, 1, target);
                    this.openFiles.splice(dropIndex, 1, item);
                }
            },
            allowDrop (index) {
                if (index !== this.dragOverIndex) {
                    this.dragOverIndex = index;
                }
                event.preventDefault();
            },
            // getTarget (el) {
            //     while (el.className.indexOf('files-header') === -1 && el.tagName !== 'BODY') {
            //         el = el.parentNode;
            //     }
            //     return el;
            // },
            dragStart (index) {
                this.dragIndex = index;
            },
            closeFile (index) {
                this.removeFromOpenPath(this.openFiles[index].id);
                this.openFiles.splice(index, 1);
                event.stopPropagation();
            },
            activeFile (index) {
                let id = this.openFiles[index].id;
                if (id !== this.opendId) {
                    this.opendId = id;
                    this.pushIntoOpenPath();
                }
            },
            removeFromOpenPath (id) {
                for (let i = this.openPath.length - 1; i >= 0; i--) {
                    if (this.openPath[i] === id) {
                        this.openPath.splice(i, 1);
                    }
                }
                this.activeFileByClose();
            },
            pushIntoOpenPath () {
                this.openPath.push(this.opendId);
            },
            activeFileByClose () {
                if (this.openPath.length > 0) {
                    this.opendId = this.openPath[this.openPath.length - 1];
                }
            },
            initOpenPath () {
                this.openPath = this.openFiles.map(item => {return item.id;});
                this.activeFileByClose();
            }
        },
        mounted () {
            this.initOpenPath();
        },
        data () {
            return {
                openPath: [], // 维护一个最近打开的数组，用户关闭时打开上一次打开的文件
                dragOverIndex: -1,
                dragIndex: -1,
                opendId: -1,
                openFiles: [{
                    id: 0,
                    name: 'index0.txt',
                }, {
                    id: 1,
                    name: 'index1.txt',
                    unsave: true,
                }, {
                    id: 2,
                    name: 'index2.txt',
                }, {
                    id: 3,
                    name: 'index3.txt',
                // }, {
                //     id: 3,
                //     name: 'index311111.txt',
                // }, {
                //     id: 3,
                //     name: 'index3.txt',
                // }, {
                //     id: 3,
                //     name: 'index311111.txt',
                // }, {
                //     id: 3,
                //     name: 'index3.txt',
                // }, {
                //     id: 3,
                //     name: 'index311111.txt',
                // }, {
                //     id: 3,
                //     name: 'index3.txt',
                // }, {
                //     id: 3,
                //     name: 'index311111.txt',
                // }, {
                //     id: 3,
                //     name: 'index3.txt',
                // }, {
                //     id: 3,
                //     name: 'index311111.txt',
                // }, {
                //     id: 3,
                //     name: 'index3.txt',
                // }, {
                //     id: 3,
                //     name: 'index311111.txt',
                // }, {
                //     id: 3,
                //     name: 'index3.txt',
                // }, {
                //     id: 3,
                //     name: 'index311111.txt',
                }]
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
    background-color: #252526;
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
        background-color: #2d2d2d;
        font-size: 14px;
        padding: 5px 10px;
        display: inline-block;
        height: 30px;
        border-left: 1px solid #252525;
        color: #c1c1c1;
        cursor: pointer;
        position: relative;
        padding-right: 25px;
        &:first-child{
            border: none;
        }
        &.drag-over{
            background-color: #3c3f42;
        }
        &.file-open{
            background-color: #1e1e1e;
        }
        .file-type{

        }
        .file-name{

        }
        .file-tail{
            position: absolute;
            right: 5px;
            top: 10px;
            display: none;
        }
        .file-unsave{
            font-size: 12px;
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
</style>