<template>
    <div class='file-block' :style="{'margin-left': (5+deep*13 -3) +'px'}">
        <div class='file-line'></div>
        <div class='file-list' :style="{'margin-left': -(5+deep*13 -3) +'px'}" v-for='(item, index) in list' :key='index'>
            <div class='file-name'
                 :class='{active: globalFileAttr.contentId === item.id}'
                 :style="{'padding-left': 5+deep*13 +'px'}"
                 @click='clickFile(item)'>
                <div class='file-name-w'>
                    <i :class="'file-icon '+fileIcon(item)" :style='{color: fileIconColor(item)}'></i>
                    <span>{{item.name}}</span>
                </div>
            </div>
            <file-block v-if='item.children' v-show='item.opened' :list='item.children' type='child' :deep='deep+1'></file-block>
        </div>
    </div>
</template>
<script>
    import {globalFileAttr} from '../file';
    import {THEME, ROOT, FILE_TYPE} from '../../../js/constant';
    
    export default {
        name: 'file-block',
        data () {
            return {
                globalFileAttr
            };
        },
        props: {
            deep: {
                required: false,
                default: 0,
                type: Number
            },
            type: {
                required: false,
                default: ROOT,
                type: String
            },
            list: {
                required: true,
                type: Array
            },
        },
        mounted () {
            window._v = this;
        },
        methods: {
            clickFile (item) {
                if (item.type === FILE_TYPE.FILE) {
                    item.click();
                } else {
                    item.click();
                }
            },
            fileIcon (item) {
                if (item.type === FILE_TYPE.FILE) {
                    return item.style.icon;
                } else {
                    return (item.opened) ? 'ei-angle-down' : 'ei-angle-right';
                }
            },
            fileIconColor (item) {
                let isDark = globalFileAttr.theme === THEME.DARK;
                if (item.type === FILE_TYPE.FILE) {
                    return isDark ? item.style.dark : item.style.light;
                } else {
                    return isDark ? '#bbb' : '#444';
                }
            }
        }
    };
</script>
<style lang="less" scoped>
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
            .file-icon{
                margin-right: 3px;
            }
        }
        &:hover{
            background-color: #aaa2;
        }
        &.active{
            background-color: #aaa4;
        }
        &.active + .file-block{
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
    .file-block{
        .file-name{
            color: #aaa;
            .file-name-w{
            
            }
            &:hover{
                background-color: #aaa1;
            }
            &.active{
                background-color: #aaa2;
            }
            &.active + .file-block{
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