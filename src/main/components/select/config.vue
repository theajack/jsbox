<!--
 * @Author: chenzhongsheng
 * @Date: 2025-02-05 23:57:11
 * @Description: Coding something
-->
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
            placeholder='请选择代码'>
            <el-option
                v-for='item in codes'
                :key='item.id'
                :label='item.id'
                :value='item.id'>
                <span class='lib-name'>{{ item.id }}</span>
                <span class='lib-url' v-show='item.dep.desc !== ""'>{{ item.desc }}</span>
                <span class='lib-url' v-show='item.dep.length > 0'>依赖: {{ item.dep.join(',') }}</span>
                <span class='lib-version'>{{ item.lang }}</span>
            </el-option>
        </el-select>
        <div slot='footer' class='dialog-footer'>
            <i class='ei-check' @click='load'></i>
            <i class='ei-times' @click='close'></i>
        </div>
    </el-dialog>
</template>
<script>
    import event from '../../js/event';
    import {EVENT} from '../../js/constant';
    import fixSelect from '../js/fix-select';
    import {getUrlParam} from '../../js/util';
    import {getConfigCodes} from '../js/config';
    export default {
        data () {
            return {
                codes: [],
                value: '',
                visible: false,
            };
        },
        mounted () {
            event.regist(EVENT.OPEN_CONFIG_CHOOSE, () => {
                this.open();
            });
        },
        methods: {
            open () {
                this.visible = true;
                fixSelect.call(this);
                this.value = getUrlParam('id');
                if (this.codes.length === 0) {
                    this.codes = getConfigCodes();
                }
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
                // let url = location.href;
                // window.location.href = url.replace(/[\?\&]id=.*?([\&#]|$)/, (str) => {
                //     let res = str.substr(0, 4);
                //     let tail = str[str.length - 1];
                //     res += this.value;
                //     if (tail === '#' || tail === '&') {
                //         res += tail;
                //     }
                //     return res;
                // });
                event.emit(EVENT.SWITCH_CODE, this.value);
                this.visible = false;
                // console.log()
            },
        }
    };
</script>