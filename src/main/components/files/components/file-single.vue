<template>
    <div class='file-name'
         :file-id='file.id'
         :class='{active: chooseActive(), "line-active": lineActive()}'
         :style="{'padding-left': 5+deep*13 +'px'}"
         @click='clickFile()'
    >
        <div class='file-name-w'>
            <i :class="'file-icon '+fileIcon()" :style='{color: fileIconColor()}'></i>
            <input ref='input'
                   class='file-rename'
                   type='text'
                   @click='clickInput'
                   @keydown='renameKeyDown'
                   @blur='renameFinish'
                   v-if='file.renamed'
                   v-model='file.tempName'>
            <span v-else>{{file.name}}</span>
        </div>
    </div>
</template>
<script>
    import {globalFileAttr} from '../file';
    import {THEME, FILE_TYPE, KEY_CODE} from '../../../js/constant';
    
    export default {
        name: 'file-block',
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
        mounted () {
            this.focusRename();
        },
        methods: {
            renameKeyDown (e) {
                if (e.keyCode === KEY_CODE.ENTER) {
                    this.renameFinish();
                }
            },
            renameFinish () {
                this.file.renameFinish();
            },
            clickInput (e) {
                e.stopPropagation();
            },
            focusRename () {
                if (this.file.renamed) {
                    this.$refs.input.focus();
                }
            },
            chooseActive () {
                return this.contentId === this.file.id;
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