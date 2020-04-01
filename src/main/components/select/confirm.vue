<template>
    <el-dialog
        class='jx-select-dialog jx-confirm-dialog'
        :visible.sync='visible'>
        {{text}}
        <div slot='footer' class='dialog-footer'>
            <i class='ei-check' @click='confirmClick'></i>
            <i class='ei-times' @click='cancelClick'></i>
        </div>
    </el-dialog>
</template>
<script>
    import event from '../../js/event';
    import {EVENT} from '../../js/constant';
    export default {
        data () {
            return {
                visible: false,
                text: '',
                confirm: null,
                cancel: null,
            };
        },
        mounted () {
            event.regist(EVENT.OPEN_CONFIRM, ({
                text = '是否确认该操作',
                confirm = null,
                cancel = null,
            }) => {
                this.text = text;
                this.confirm = confirm;
                this.cancel = cancel;
                this.open();
            });
        },
        methods: {
            open () {
                this.visible = true;
            },
            close () {
                this.visible = false;
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