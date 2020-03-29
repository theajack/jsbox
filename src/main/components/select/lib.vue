<template>
    <el-dialog
        ref='dialog' class='select-dialog' :close-on-click-modal='false' :visible.sync='visible' :before-close='beforeClose'>
        <el-select
            v-model='value'
            multiple
            filterable
            allow-create
            default-first-option
            :automatic-dropdown='true'
            placeholder='请选择或输入依赖'>
            <el-option
                v-for='item in libs'
                :key='item.name'
                :label='item.name'
                :value='item.name'>
                <span class='lib-name'>{{ item.name }}</span>
                <span class='lib-url'>{{item.url}}</span>
                <a class='lib-version' :href='item.url' target='view_window'>@{{ item.version }}</a>
            </el-option>
        </el-select>
        <div slot='footer' class='dialog-footer'>
            <i class='ei-cloud-download' @click='load'></i>
            <i class='ei-times' @click='close'></i>
        </div>
    </el-dialog>
</template>
<script>
    import {getLibOption} from '../js/select-data';
    import event from '../../js/event';
    import {EVENT} from '../../js/constant';
    import {loadResources} from '../js/lib';
    import $ from 'easy-dom-util';
    export default {
        data () {
            return {
                libs: getLibOption(),
                value: [],
                visible: false,
            };
        },
        mounted () {
            window.dialog = this.$refs.dialog;
            event.regist(EVENT.OPEN_LIB_CHOOSE, () => {
                this.open();
            });
            event.regist(EVENT.CLOSE_LIB_CHOOSE, () => {
                this.close();
            });
        },
        methods: {
            open () {
                this.visible = true;
                window.$ = $;
                setTimeout(() => {
                    let dialog = this.$refs.dialog;
                    dialog.$children[0].handleFocus();
                    let arrow = $.query(dialog.$el).query('.el-select__caret')[0];
                    if (!arrow.el.__init) {
                        arrow.el.__init = true;
                        arrow.click(() => {
                            console.log(111);
                            if (arrow.hasClass('is-reverse')) {
                                setTimeout(() => {
                                    dialog.$children[0].handleClose();
                                }, 100);
                            }
                        });
                    }
                }, 200);
            },
            close () {
                this.clearData();
                this.visible = false;
            },
            beforeClose (done) {
                this.clearData();
                done();
            },
            clearData () {
                this.value = [];
            },
            load () {
                loadResources({
                    array: this.value,
                    success: () => {
                        this.close();
                    }
                });
            }
        }
    };
</script>
<style>

</style>