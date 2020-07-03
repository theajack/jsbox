<template>
    <el-dialog
        class='jx-select-dialog jx-confirm-dialog'
        :visible.sync='visible'>
        {{text}}
        <div slot='footer' class='dialog-footer'>
            <i class='ei-check' :class='{"confirm-focus": this.focusComfirm}' @click='confirmClick'></i>
            <i class='ei-times' :class='{"confirm-focus": !this.focusComfirm}' @click='cancelClick'></i>
        </div>
    </el-dialog>
</template>
<script>
    import event from '../../js/event';
    import {EVENT, KEY_CODE} from '../../js/constant';
    export default {
        data () {
            return {
                visible: false,
                text: '',
                confirm: null,
                cancel: null,
                focusComfirm: true
            };
        },
        mounted () {
            this.handler = (e) => {
                let kc = e.keyCode;
                if (kc === KEY_CODE.RIGHT || kc === KEY_CODE.LEFT) {
                    this.focusComfirm = !this.focusComfirm;
                } else if (kc === KEY_CODE.ENTER) {
                    if (this.focusComfirm) {
                        this.confirmClick();
                    } else {
                        this.cancelClick();
                    }
                }
            };
            event.regist(EVENT.OPEN_CONFIRM, ({
                text = '是否确认该操作',
                confirm = null,
                cancel = null,
                focusComfirm = true
            }) => {
                this.text = text;
                this.confirm = confirm;
                this.cancel = cancel;
                this.open();
                this.focusComfirm = focusComfirm;
            });
        },
        methods: {
            initEvent () {
                document.addEventListener('keydown', this.handler, false);
            },
            removeEvent () {
                document.removeEventListener('keydown', this.handler, false);
            },
            open () {
                this.visible = true;
                this.initEvent();
            },
            close () {
                this.visible = false;
                this.removeEvent();
            },
            cancelClick () {
                if (this.cancel) {
                    this.cancel();
                }
                this.close();
            },
            confirmClick () {
                if (this.confirm) {
                    this.confirm();
                }
                this.close();
            },
        }
    };
</script>
<style>

</style>