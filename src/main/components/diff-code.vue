<template>
    <el-dialog
        ref='dialog'
        class='jx-select-dialog jx-diff-dialog'
        :visible.sync='visible'
        :before-close='beforeClose'>
        <i class='ei-times close-diff' @click='close'></i>
        <div class='diff-title'>
            <span class='diff-file-name' :title='diffCodes.prevPath'>{{diffCodes.prevPath}}</span>
            <span class='diff-file-name' :title='diffCodes.nextPath'>{{diffCodes.nextPath}}</span>
        </div>
        <div class='diff-editor' ref='editor'></div>
    </el-dialog>
</template>
<script>
    import {Editor} from './js/editor';
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {fontSize, theme} from '../js/status';
    import {diffCodes} from './js/store';
    export default {
        data () {
            return {
                visible: false,
                editor: null,
                diffCodes,
            };
        },
        mounted () {
            event.regist({
                [EVENT.RESIZE]: () => {
                    if (this.visible && this.editor) {
                        setTimeout(() => {
                            this.editor.resize();
                        }, 10);
                    }
                },
                [EVENT.OPEN_DIFF]: (codes) => {
                    this.open(codes);
                },
                [EVENT.FONT_SIZE_CHANGE]: (type) => {
                    if (this.visible && this.editor) {
                        if (this.editor[type === 'up' ? 'fontSizeUp' : 'fontSizeDown']()) {
                            fontSize.set(this.editor.fontSize, true, false);
                            event.emit(EVENT.EDITOR_MOUNTED, this.editor);
                        }
                    }
                },
                [EVENT.LANG_CHANGE]: (lang) => {
                    if (this.visible && this.editor) {
                        this.editor.changeLang(lang);
                        event.emit(EVENT.EDITOR_MOUNTED, this.editor);
                    }
                },
            });
        },
        methods: {
            open (codes) {
                this.visible = true;
                this.$nextTick(() => {
                    this.editor = new Editor({
                        el: this.$refs.editor,
                        code: codes.next,
                        lang: codes.lang,
                        diffCode: codes.prev,
                        fontSize: fontSize.get(),
                        theme: theme.get()
                    });
                    event.emit(EVENT.EDITOR_MOUNTED, this.editor);
                });
            },
            close () {
                this.visible = false;
                this.dispose();
            },
            beforeClose (done) {
                this.dispose();
                done();
            },
            dispose () {
                if (this.editor) {
                    this.editor.destroy();
                    this.editor = null;
                }
            }
        }
    };
</script>
<style lang="less">
    .jx-diff-dialog{
        display: flex;
        align-items: center;
        .diff-title{
            position: absolute;
            top: -26px;
            color: #eee;
            width: 100%;
            .diff-file-name{
                display: inline-block;
                width: 48%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
        .close-diff{
            color: #eee;
            position: absolute;
            top: -24px;
            z-index: 10;
            font-size: 22px;
            right: 0;
            cursor: pointer;
            &:hover{
                color: #ffa6a6;
            }
        }
        .el-dialog{
            height: 90%;
            max-width: 1200px!important;
            .el-dialog__body{
                height: 100%;
                .diff-editor{
                    height: 100%;
                }
            }
        }
        @media (max-width: 600px){
            .el-dialog{
                width: 98%!important;
            }
        }
    }
</style>