<!--
 * @Author: chenzhongsheng
 * @Date: 2025-01-22 20:45:10
 * @Description: Coding something
-->
<!--
 * @Author: chenzhongsheng
 * @Date: 2025-01-22 20:45:10
 * @Description: Coding something
-->
<template>
    <div class='jsbox-list-panel' v-if='list.length > 1'>
        <div
            v-for='(item, index) in list'
            :key='index'
        >
            <div style='width:100%'>
                <div v-if='item.title' class='jsbox-list-title'>{{ item.title }}</div>
                <div
                    class='jsbox-list-item'
                    :class='{active: activeIndex === index}'
                    :title='title(item)'
                    @click='switchCode(index)'
                >
                    <div class='jsbox-list-id'>{{ item.id }}</div>
                    <div class='jsbox-list-desc' v-if='item.desc'>{{ item.desc }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import event from '../js/event';
    import {EVENT} from '../js/constant';
    import {getConfigCodes, loadIdInConfigMap} from './js/config';
    import {store} from './js/store';
    import {dragPercent} from '../js/status';
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
            event.regist(EVENT.SWITCH_CODE, (id) => {
                this.activeIndex = this.list.findIndex(item => item.id === id);
                this.switchById(id);
            });
        },
        methods: {
            title (item) {
                return `${item.id}${item.desc ? '\n' : ''}${item.desc}`;
            },
            switchCode (index) {
                if (index === this.activeIndex) return;
                event.emit(EVENT.CLEAR_LOG);
                this.activeIndex = index;
                this.switchById(this.list[index].id);
            },
            switchById (id) {
                location.hash = id;
                loadIdInConfigMap(id, () => {
                    event.emit(EVENT.RUN_CODE);
                    event.emit(EVENT.RECOUNT_FILE_SIZE);
                });
            },
            initList (id) {
                this.list = getConfigCodes();
                store.showCodeMap = this.list.length > 1;
                dragPercent.emit();
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
    .jsbox-list-title{
        font-size: 14px;
        color: #007acc;
        padding: 5px 0;
        padding-left: 15px;
        border-left: 4px solid #777;
    }
    .jsbox-list-item{
        padding: 0px 15px;
        width: 180px;
        height: 50px;
        border-left: 4px solid transparent;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &.active{
            background-color: #fff;
            border-color: #007acc;
        }
        .jsbox-list-id{
            color: #000;
        }
        .jsbox-list-desc{
            color: #555;
            font-size: 12px;
            margin-top: 3px;
        }
        .jsbox-list-id, .jsbox-list-desc {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>