<template>
    <div class='file-block' :style="{'margin-left': (5+deep*13 -3) +'px'}">
        <div class='file-line'></div>
        <div class='file-list' :style="{'margin-left': -(5+deep*13 -3) +'px'}" v-for='(item, index) in list' :key='index'>
            <file-single :file='item' :contentId='globalFileAttr.contentId' :deep='deep'></file-single>
            <file-block v-if='item.children' v-show='item.opened' :list='item.children' type='child' :deep='deep+1'></file-block>
        </div>
    </div>
</template>
<script>
    import {globalFileAttr} from '../file';
    import {ROOT} from '../../../js/constant';
    import FileSingle from './file-single.vue';
    
    export default {
        name: 'file-block',
        components: {FileSingle},
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
        methods: {
        }
    };
</script>
<style lang="less">
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
            .file-icon{
                margin-right: 3px;
            }
            .file-rename{
                width: 100%;
                height: 17px;
                outline: none;
                border-radius: 0;
                background-color: #fff;
                color: #555;
                border: 1px solid #ccc;
            }
        }
        &:hover{
            background-color: #aaa2;
        }
        &.active{
            background-color: #aaa4;
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
    .file-block{
        .file-name{
            color: #aaa;
            .file-name-w{
                .file-rename{
                    background-color: #3c3c3c;
                    color: #aaa;
                    border: 1px solid #888;
                }
            }
            &:hover{
                background-color: #aaa1;
            }
            &.active{
                background-color: #aaa2;
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