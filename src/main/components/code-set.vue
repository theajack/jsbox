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
            class='jsbox-list-item'
            :class='{active: activeIndex === index}'
            :title='title(item)'
            @click='switchCode(index)'
        >
            <div style='width:100%'>
                <div class='jsbox-list-title'>{{ item.id }}</div>
                <div class='jsbox-list-desc' v-if='item.desc'>{{ item.desc }}</div>
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
        },
        methods: {
            title (item) {
                return `${item.id}${item.desc ? '\n' : ''}${item.desc}`;
            },
            switchCode (index) {
                if (index === this.activeIndex) return;
                event.emit(EVENT.CLEAR_LOG);
                this.activeIndex = index;
                location.hash = this.list[index].id;
                loadIdInConfigMap(this.list[index].id, () => {
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
        }
        .jsbox-list-desc{
            color: #555;
            font-size: 12px;
            margin-top: 3px;
        }
        .jsbox-list-title, .jsbox-list-desc {
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>