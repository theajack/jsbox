<!--
 * @Author: chenzhongsheng
 * @Date: 2025-01-22 20:45:10
 * @Description: Coding something
-->
<template>
    <div class='jsbox-list-panel' v-if="list.length > 0">
        111
    </div>
</template>
<script>
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {LANG} from './js/editor';
    import {getConfigCodes, loadIdInConfigMap} from './js/config';
    import {fileStatus, envStstus} from './js/status-plugin';
    export default {
        data () {
            return {
                list: [],
                open: true,
            };
        },
        mounted () {
            event.regist(EVENT.CODE_MAP_INIT, () => {
                this.initList();
            });
        },
        methods: {
            initList(){
                console.log(getConfigCodes());

                window._test=()=>{
                    loadIdInConfigMap('helloWorldHtml', ()=>{
                        console.log('xxxxxx');
                        event.emit(EVENT.LANG_CHANGE, 'html');
                            event.emit(EVENT.RUN_CODE);
                    });
                }
            }
        }
    };
</script>
<style lang="less" scoped>
</style>