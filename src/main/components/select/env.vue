<template>
    <el-dialog class='select-dialog' :close-on-click-modal='false' :visible.sync='visible' :before-close='beforeClose'>
        <el-select
            v-model='value'
            filterable
            default-first-option
            placeholder='请选择运行环境'>
            <el-option
                v-for='item in envs'
                :key='item.name'
                :label='item.name'
                :value='item.name'>
                <span class='lib-name'>{{ item.name }}</span>
                <span class='lib-url'>deps: {{item.deps}}</span>
                <span class='lib-version'>[{{ item.type }}]</span>
            </el-option>
        </el-select>
        <div slot='footer' class='dialog-footer'>
            <i class='ei-cloud-download' @click='load'></i>
            <i class='ei-times' @click='close'></i>
        </div>
    </el-dialog>
</template>
<script>
    import {getEnvOption} from '../js/select-data';
    import event from '../../js/event';
    import {EVENT} from '../../js/constant';
    export default {
        data () {
            return {
                envs: getEnvOption(),
                value: '',
                visible: false,
            };
        },
        mounted () {
            event.regist(EVENT.OPEN_ENV_CHOOSE, () => {
                this.open();
            });
            event.regist(EVENT.CLOSE_ENV_CHOOSE, () => {
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
                this.value = '';
            },
            load () {
                window.open(`${location.protocol}//${location.host}${location.pathname}?env=${this.value}`);
                this.close();
            },
        }
    };
</script>
<style>

</style>