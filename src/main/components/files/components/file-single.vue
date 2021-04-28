<template>
    <div class='file-name file-name-comp'
         :file-id='file.id'
         :class='{
             active: chooseActive(file),
             "line-active": lineActive(),
             "drag-over": globalFileAttr.dragOverId === file.id,
             "selected": isSelected(file),
         }'
         :style="{'padding-left': 5+deep*13 +'px'}"
         @click='clickFile()'
         
         :draggable='dragable'
         @dragstart='dragStart'
         @drop='drop'
         @dragover='dragOver'
    >
        <div class='file-name-w file-name-comp' :title='file.path'>
            <i :class="'file-icon file-name-comp '+fileIcon()" :style='{color: fileIconColor()}'></i>
            <input
                class='file-rename'
                :class='{"file-name-error": file.renameError!==""}'
                type='text'
                :id='"rename-input-"+file.id'
                @click='clickInput'
                @keydown='renameKeyDown'
                @blur='renameFinish'
                @input='renameCheck'
                v-if='file.renamed'
                v-model='file.tempName'>
            <span class='file-name-comp' v-else>{{file.name}} {{file.id}}</span>
            <span class='repeat-tip' v-if='file.renameError!==""'>{{file.renameError | renameErrorText}}</span>
        </div>
    </div>
</template>
<script>
    import {globalFileAttr} from '../file';
    import {THEME, FILE_TYPE, KEY_CODE, RENAME_ERROR_TEXT, FILE_NONE, DROP_TYPE, EVENT, SELECT_TYPE} from '../../../js/constant';
    import {cutFile, idFiles, pasteFile} from '../file-system';
    import event from '../../../js/event';
    import {getEditorByFileId} from '../../js/editor-pool';
    import {checkDoubleClick} from '../../../log/util';
    import {isSelectShiftOrCtrlDown, selectFile, unselectFile} from '../../js/file-selected';
    // import {checkDoubleClick} from '../../../log/util';
    
    export default {
        name: 'file-block',
        data () {
            return {
                globalFileAttr,
                dragable: true,
                lastClickTime: 0,
            };
        },
        props: {
            deep: {
                required: false,
                default: 0,
                type: Number
            },
            contentId: {
                required: true,
                type: Number
            },
            file: {
                required: true,
                type: Object
            },
        },
        // mounted () {
        //     this.focusRename();
        // },
        filters: {
            renameErrorText (v) {
                return RENAME_ERROR_TEXT[v];
            }
        },
        mounted () {
            // 当正在拖动资源管理器大小时 解决与拖拽文件冲突问题x
            event.regist(EVENT.FILE_DRAG_STATUS, (bool) => {
                this.dragable = !bool;
            });
        },
        methods: {
            dragStart () {
                globalFileAttr.dragId = this.file.id;
                globalFileAttr.dropType = DROP_TYPE.FILE;
            },
            drop () {
                const dragId = globalFileAttr.dragId;
                if (
                    (this.file.type === FILE_TYPE.DIR ||
                        idFiles[dragId].parentId !== this.file.parentId)
                    && dragId !== this.file.id // 拖拽的不能放在自己身上
                ) {
                    cutFile(SELECT_TYPE.DRAG);
                    pasteFile(this.file.id);
                }
                globalFileAttr.dragId = FILE_NONE;
                globalFileAttr.dragOverId = FILE_NONE;
                globalFileAttr.dropType = DROP_TYPE.NONE;
            },
            dragOver (event) {
                if (globalFileAttr.dropType === DROP_TYPE.FILE) {
                    globalFileAttr.dragOverId = this.file.id;
                    event.preventDefault();
                }
            },
            renameKeyDown (e) {
                if (e.keyCode === KEY_CODE.ENTER) {
                    console.log('renameKeyDown byEnter');
                    this.file.renameFinish(true);
                }
            },
            renameFinish () {
                this.file.renameFinish();
            },
            renameCheck () {
                this.file.renameCheck();
            },
            clickInput (e) {
                e.stopPropagation();
            },
            // focusRename () {
            //     console.log(this.$refs.input, this.file);
            //     if (this.file.renamed) {
            //         this.$refs.input.focus();
            //     }
            // },
            isOpen () {
                return this.file.id === globalFileAttr.openedId;
            },
            chooseActive (file) {
                return this.contentId === file.id;
            },
            isSelected (file) {
                return globalFileAttr.selectedIds.includes(file.id);
            },
            lineActive () {
                if (this.file.type === FILE_TYPE.DIR && this.chooseActive(this.file)) {
                    return true;
                }
                if (this.file.type === FILE_TYPE.DIR) {
                    if (this.file.children.find(file => {
                        return file.type === FILE_TYPE.FILE && this.chooseActive(file);
                    })) {
                        return true;
                    }
                }
                return false;
            },
            clickFile () {
                const disableClick = isSelectShiftOrCtrlDown();
                const isFile = this.file.type === FILE_TYPE.FILE;
                if (checkDoubleClick(`fc_${this.file.id}`)) {
                    // console.log('doubole click');
                    if (!disableClick) {
                        this.file.click();
                    }
                    if (isFile) {
                        if (!disableClick) {
                            getEditorByFileId(this.file.id).focus();
                        }
                        unselectFile(this.file);
                    }
                } else {
                    // console.log('single click');
                    if (selectFile(this.file)) {
                        if (!disableClick) {
                            this.file.click();
                        }
                    }
                }
            },
            fileIcon () {
                if (this.file.type === FILE_TYPE.FILE) {
                    return this.file.style.icon;
                } else {
                    return (this.file.opened) ? 'ei-angle-down' : 'ei-angle-right';
                }
            },
            fileIconColor () {
                const isDark = globalFileAttr.theme === THEME.DARK;
                if (this.file.type === FILE_TYPE.FILE) {
                    return isDark ? this.file.style.dark : this.file.style.light;
                } else {
                    return isDark ? '#bbb' : '#444';
                }
            }
        }
    };
</script>