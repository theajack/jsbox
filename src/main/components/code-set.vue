<!--
 * @Author: chenzhongsheng
 * @Date: 2025-01-22 20:45:10
 * @Description: Coding something
-->
<template>
    <div class='jsbox-list-panel' v-if="list.length > 0">
        <div 
            v-for="(item, index) in list" 
            class="jsbox-list-item" 
            :class="{active: activeIndex === index}" 
            @click="switchCode(index)"
        >
            <div style="width:100%">
                <div class="jsbox-list-title">{{ item.id }}</div>
                <div class="jsbox-list-desc" v-if="item.desc">{{ item.desc }}</div>
            </div>
         </div>
    </div>
</template>
<script>
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {store} from './js/store';
    import {LANG} from './js/editor';
    import {getConfigCodes, loadIdInConfigMap} from './js/config';
    import {fileStatus, envStstus} from './js/status-plugin';
    export default {
        data () {
            return {
                activeIndex: -1,
                list: [],
                open: true,
            };
        },
        mounted () {
            event.regist(EVENT.CODE_MAP_INIT, (id) => {
                this.initList(id);
            });
        },
        methods: {
            switchCode(index){
                this.activeIndex = index;
                location.hash = this.list[index].id;
                loadIdInConfigMap(this.list[index].id, ()=>{
                    event.emit(EVENT.RUN_CODE);
                });
            },
            initList(id){
                this.list = getConfigCodes();
                this.activeIndex = this.list.findIndex(item => {
                    return item.id === id;
                });
            }
        }
    };
</script>
<style lang="less" scoped>
.jsbox-list-panel{
    background-color: #eee;
    font-family: menlo, monospace;
    font-size: 15px;
    height: 100%;
    overflow: auto;
    padding-bottom: 25px;
    .jsbox-list-item{
        padding: 0px 15px;
        width: 180px;
        height: 50px;
        border-left: 4px solid transparent;
        display: flex;
        align-items: center;
        cursor: pointer;
        &.active{
            background-color: #fff;
            border-color: #007acc;
        }
        .jsbox-list-title{
            color: #000;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .jsbox-list-desc{
            color: #555;
            font-size: 12px;
            margin-top: 3px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>