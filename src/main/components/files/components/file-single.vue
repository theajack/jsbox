<template>
    <div class='file-name'
         :file-id='file.id'
         :class='{active: chooseActive(file), "line-active": lineActive(), "drag-over": globalFileAttr.dragOverId === file.id}'
         :style="{'padding-left': 5+deep*13 +'px'}"
         @click='clickFile()'
         
         draggable='true'
         @dragstart='dragStart'
         @drop='drop'
         @dragover='dragOver'
    >
        <div class='file-name-w' :title='file.path'>
            <i :class="'file-icon '+fileIcon()" :style='{color: fileIconColor()}'></i>
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
            <span v-else>{{file.name}} {{file.id}}</span>
            <span class='repeat-tip' v-if='file.renameError!==""'>{{file.renameError | renameErrorText}}</span>
        </div>
    </div>
</template>
<script>
    import {globalFileAttr} from '../file';
    import {THEME, FILE_TYPE, KEY_CODE, RENAME_ERROR_TEXT, FILE_NONE, DROP_TYPE} from '../../../js/constant';
    import {cutFile, idFiles, pasteFile} from '../file-system';
    
    export default {
        name: 'file-block',
        data () {
            return {
                globalFileAttr,
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
        methods: {
            dragStart () {
                globalFileAttr.dragId = this.file.id;
                globalFileAttr.dropType = DROP_TYPE.FILE;
            },
            drop () {
                let dragId = globalFileAttr.dragId;
                if (
                    (this.file.type === FILE_TYPE.DIR ||
                        idFiles[dragId].parentId !== this.file.parentId)
                    && dragId !== this.file.id // 拖拽的不能放在自己身上
                ) {
                    cutFile(dragId);
                    pasteFile(this.file.id);
                }
                globalFileAttr.dragId = FILE_NONE;
                globalFileAttr.dragOverId = FILE_NONE;
                globalFileAttr.dropType = DROP_TYPE.NONE;
            },
            dragOver () {
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
            chooseActive (file) {
                return this.contentId === file.id;
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
                this.file.click();
            },
            fileIcon () {
                if (this.file.type === FILE_TYPE.FILE) {
                    return this.file.style.icon;
                } else {
                    return (this.file.opened) ? 'ei-angle-down' : 'ei-angle-right';
                }
            },
            fileIconColor () {
                let isDark = globalFileAttr.theme === THEME.DARK;
                if (this.file.type === FILE_TYPE.FILE) {
                    return isDark ? this.file.style.dark : this.file.style.light;
                } else {
                    return isDark ? '#bbb' : '#444';
                }
            }
        }
    };
</script>