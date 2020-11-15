<template>
    <div class='files-w'
         @dragover='dragOver'
         @drop='drop'
         :class='{"files-w-active": filesWActive}'
         :style='{width: filePercent+"%"}' @contextmenu='onMenu' @click='clickFilesW'>
        <file-tool></file-tool>
        <file-block :list='files'></file-block>
        <menu-dropdown
            :menus='menus'
            @menuClick='menuClick'
            @reinitTop='reinitTop'
            position='fixed'
            :left='left'
            :top='top'
            :visible='menuVisible'
        ></menu-dropdown>
    </div>
</template>
<script>
    import {fileDragPercent} from '../../../js/status';
    import {DROP_TYPE, EVENT, FILE_NONE, ROOT} from '../../../js/constant';
    import event from '../../../js/event';
    import FileBlock from './file-block.vue';
    import FileTool from './file-tool.vue';
    import {cutFile, idFiles, initFileSystem, pasteFile} from '../file-system';
    import MenuDropdown from '../../menu-dropdown.vue';
    import {fileMenus, setFileMenuVue} from '../file-menu';
    import {hitEventParent} from '../../../js/util';
    import {globalFileAttr} from '../file';
    import {writeContentFileID} from '../storage';
    export default {
        name: 'files',
        components: {FileBlock, FileTool, MenuDropdown},
        data () {
            return {
                globalFileAttr,
                files: initFileSystem(),
                filePercent: fileDragPercent.get(),
                menus: fileMenus,
                left: 0,
                top: 0,
                menuVisible: false,
            };
        },
        computed: {
            filesWActive () {
                return this.globalFileAttr.contentId === -1;
            }
        },
        mounted () {
            event.regist({
                [EVENT.FILE_DRAG_PERCENT]: (filePercent) => {
                    this.filePercent = filePercent;
                }
            });
            
            document.addEventListener('click', () => {
                this.menuVisible = false;
            });
            setFileMenuVue(this);
        },
        methods: {
            dragOver (event) {
                if (globalFileAttr.dropType === DROP_TYPE.FILE) {
                    event.preventDefault();
                }
            },
            drop () {
                let dragId = globalFileAttr.dragId;
                if (dragId === FILE_NONE) { // 已经被文件接受了
                    return;
                }
                if (idFiles[dragId].parentId !== ROOT) {
                    cutFile(dragId);
                    pasteFile(ROOT);
                }
                globalFileAttr.dragId = FILE_NONE;
                globalFileAttr.dragOverId = FILE_NONE;
                globalFileAttr.dropType = DROP_TYPE.NONE;
            },
            reinitTop (top) {
                this.top = top;
            },
            onMenu (e) {
                e.preventDefault();
                if (hitEventParent(e, 'file-tools', 'files-w')) {
                    this.menuVisible = false;
                    return;
                }
                let el = hitEventParent(e, 'file-name', 'files-w');
                let menuFileId = -1;
                if (el) {
                    menuFileId = parseInt(el.attr('file-id'));
                }
                globalFileAttr.menuFileId = menuFileId;
                this.left = e.clientX;
                this.top = e.clientY;
                this.menuVisible = true;
            },
            // getF
            menuClick () {
                this.menuVisible = false;
            },
            clickFilesW (e) {
                if (e.target.className !== 'files-w') {
                    return;
                }
                this.globalFileAttr.contentId = -1;
                writeContentFileID();
            }
        }
    };
</script>
<style lang="less">
    .files-w{
        background-color: #f3f3f3;
        &.files-w-active{
            background-color: #eee;
        }
    }
    .file-block{
        border-left: 1px solid transparent;
        .file-name{
            user-select: none;
            font-size: 13px;
            white-space: nowrap;
            color: #555;
            cursor: pointer;
            .file-name-w{
                padding-top: 3px;
                padding-bottom: 3px;
                padding-left: 3px;
                display: flex;
                align-items: center;
                position: relative;
                .file-icon{
                    margin-right: 3px;
                }
                .file-rename{
                    padding-left: 1px;
                    width: 100%;
                    height: 17px;
                    outline: none;
                    border-radius: 0;
                    background-color: #fff;
                    color: #555;
                    border: 1px solid #ccc;
                    &.file-name-error{
                        border: 1px solid #f44;
                        background-color: rgba(255,55,55,.1);
                    }
                }
                .repeat-tip{
                    position: absolute;
                    width: 100%;
                    white-space: normal;
                    font-size: 12px;
                    left: 0;
                    top: 19px;
                    background-color: #f4e0e0;
                    text-align: center;
                    border: 1px solid #f44;
                    padding: 3px 0;
                    z-index: 10;
                }
            }
            &:hover{
                background-color: #aaa2;
            }
            &.active{
                background-color: #aaa4;
            }
            &.drag-over{
                background-color: #aaa3;
            }
            &.line-active + .file-block{
                border-left: 1px solid #a9a9a9;
            }
        }
    }
    .files-w:hover{
        .file-block{
            border-left: 1px solid #d6d6d6;
        }
    }
    body.dark{
        .files-w{
            background-color: #252525;
            &.files-w-active{
                background-color: #2a2a2a;
            }
        }
        .file-block{
            .file-name{
                color: #aaa;
                .file-name-w{
                    .file-rename{
                        background-color: #3c3c3c;
                        color: #aaa;
                        border: 1px solid #888;
                        &.file-name-error{
                            border: 1px solid #b44;
                            background-color: rgba(255,55,55,.1);
                        }
                    }
                    .repeat-tip{
                        background-color: rgb(59, 39, 39);
                        border: 1px solid #b44;
                        color: #aaa;
                    }
                }
                &:hover{
                    background-color: #aaa1;
                }
                &.active{
                    background-color: #aaa2;
                }
                &.drag-over{
                    background-color: #aaa3;
                }
                &.line-active + .file-block{
                    border-left: 1px solid #585858;
                }
            }
        }
        .files-w:hover{
            .file-block{
                border-left: 1px solid #39393a;
            }
        }
    }
</style>