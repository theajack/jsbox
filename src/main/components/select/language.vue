<template>
    <el-dialog
        ref='dialog'
        class='jx-select-dialog'
        :close-on-click-modal='false'
        :visible.sync='visible'
        :before-close='beforeClose'>
        <el-select
            v-model='value'
            filterable
            popper-class='jx-select-dd'
            default-first-option
            placeholder='请选择编程语言'>
            <el-option
                v-for='item in langs'
                :key='item.name'
                :label='item.name'
                :value='item.value'>
                <span class='lib-name'>{{ item.name }}</span>
                <!-- <span class='lib-version'>{{ item.value }}</span> -->
            </el-option>
        </el-select>
        <div slot='footer' class='dialog-footer'>
            <i class='ei-check' @click='load'></i>
            <i class='ei-times' @click='close'></i>
        </div>
    </el-dialog>
</template>
<script>
    import {langs} from '../js/select-data';
    import event from '../../js/event';
    import {EVENT} from '../../js/constant';
    import fixSelect from '../js/fix-select';
    import {language} from '../../js/status';
    export default {
        data () {
            return {
                langs,
                value: '',
                visible: false,
            };
        },
        mounted () {
            event.regist(EVENT.OPEN_LANG_CHOOSE, () => {
                this.open();
            });
            event.regist(EVENT.CLOSE_LANG_CHOOSE, () => {
                this.close();
            });
        },
        methods: {
            open () {
                this.value = language.get();
                this.visible = true;
                fixSelect.call(this);
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
                this.value = '';
            },
            load () {
                language.set(this.value);
                this.close();
            },
        }
    };
</script>