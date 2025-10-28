<template>
    <el-dialog
        ref='dialog'
        class='jx-select-dialog jx-diff-dialog'
        :visible.sync='visible'
        :before-close='beforeClose'>
        <span class='close-diff' @click='close'>×</span>
        <div class='diff-editor' ref='editor'></div>
    </el-dialog>
</template>
<script>
    import {JsboxEditor} from './js/editor';
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {code, fontSize, theme, language} from '../js/status';
    export default {
        data () {
            return {
                visible: false,
                editor: null
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
                [EVENT.OPEN_DIFF]: () => {
                    this.open();
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
            open () {
                this.visible = true;
                this.$nextTick(() => {
                    event.emit(EVENT.USE_CODE, c => {
                        this.editor = new JsboxEditor({
                            el: this.$refs.editor,
                            code: c,
                            lang: language.get(),
                            diffCode: code.get(),
                            fontSize: fontSize.get(),
                            theme: theme.get()
                        });
                        event.emit(EVENT.EDITOR_MOUNTED, this.editor);
                    });
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
        .close-diff{
            color: #ffa6a6;
            position: absolute;
            top: -30px;
            z-index: 10;
            font-size: 25px;
            right: 0;
            cursor: pointer;
            &:hover{
                color: #f44;
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