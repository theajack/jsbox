<template>
    <div class='jsbox-status-bar' :class='{"code-full":codeFull}' :style='{width: percent+"%"}'>
        <span v-if='env.lib!==""' class='status-item hover' @click='showLib' title='第三方库'>
            <i class='ei-book'></i>
            <span>{{env.lib}}</span>
        </span>
        <span v-if='env.env!==""' class='status-item hover' @click='selectEnv' title='运行环境'>
            <i class='ei-cube-alt'></i>
            <span>{{env.env}}</span>
        </span>
        <span v-if='env.lang!==""' class='status-item hover' @click='selectLang' title='语言'>
            <i class='ei-code'></i>
            <span>{{env.lang}}</span>
        </span>
        <span class='status-item'>
            <i :class='file.modified?"ei-file":"ei-file-code"' :title='file.modified?"未暂存":"已暂存"' @click='saveCode'></i>
            <span title='文件大小'>{{file.size}}</span>
        </span>
        <span class='status-item status-right'>
            行 {{lineNumber}}, 列 {{column}}
        </span>
    </div>
</template>
<script>
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {LANG} from './js/editor';
    import {fileStatus, envStstus} from './js/status-plugin';
    // import {dragPercent} from '../js/status';
    export default {
        data () {
            return {
                percent: 100,
                codeFull: false,
                file: fileStatus.data,
                env: envStstus.data,
                lineNumber: 0,
                column: 0,
            };
        },
        mounted () {
            event.regist({
                [EVENT.DRAG_PERCENT]: (percent) => {
                    this.percent = percent;
                },
                [EVENT.LANG_CHANGE]: (lang) => {
                    this.codeFull = (lang !== LANG.JAVASCRIPT && lang !== LANG.HTML);
                },
                [EVENT.CURSOR_CHANGE]: (position) => {
                    this.lineNumber = position.lineNumber;
                    this.column = position.column;
                },
            });
        },
        methods: {
            saveCode: fileStatus.method.saveCode,
            showLib: envStstus.method.showLib,
            selectEnv: envStstus.method.selectEnv,
            selectLang: envStstus.method.selectLang,
            
        }
    };
</script>
<style lang="less" scoped>
    .jsbox-status-bar{
        color: #fff;
        background-color: #007acc;
        position: fixed;
        border: 0;
        width: 100%;
        z-index: 10;
        height: 25px;
        left: 0;
        bottom: 0;
        font-size: 12px;
        line-height: 25px;
        padding: 0 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &.code-full{
            width: 100%!important;
            bottom: 0!important;
            transform: translateY(0)!important;
        }
        i{
            cursor: pointer;
        }
        i:hover{
            color: #ddd;
        }
        .status-item{
            margin-right: 5px;
            &.hover:hover{
                cursor: pointer;
                color: #ddd;
            }
            &.status-right{
                float:right;
            }
        }
    }
    @media (max-width: 600px){
        .jsbox-status-bar{
            width: 100%!important;
            bottom: 50%;
            transform: translateY(16px);
        }
    }
</style>