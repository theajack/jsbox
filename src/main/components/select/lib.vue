<template>
    <div class='dialog-wrapper'>
        <el-dialog title='加载第三方库' :close-on-click-modal='false' :visible.sync='visible' :before-close='beforeClose'>
            <el-select
                v-model='value'
                multiple
                filterable
                allow-create
                default-first-option
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
                <el-button type='primary' @click='load' icon='el-icon-download'>加载</el-button>
                <el-button @click='close' icon='el-icon-close'>取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {getLibOption} from '../js/select-data';
    import event from '../../js/event';
    import {EVENT} from '../../js/constant';
    export default {
        data () {
            return {
                libs: getLibOption(),
                value: [],
                visible: false,
            };
        },
        mounted () {
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
                // loadResources({
                //     array: this.value,
                //     success: () => {
                //         this.close();
                //     }
                // });
            },
        }
    };
</script>
<style>

</style>