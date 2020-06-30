<template>
    <div class='menu-item' :class='{"active": active}' @click='menuClick' @mouseenter='menuMouseEnter'>
        <div :title='title'>
            <span>{{text || title}}</span>
            <i v-if='items.length>0' class='ei-angle-down menu-icon'></i>
            <i v-else :class='"ei-"+icon'></i>
        </div>
        <menu-dropdown
            :menus='items'
            @menuClick='menuClick'
        ></menu-dropdown>
    </div>
</template>
<script>
    import MenuDropdown from './menu-dropdown.vue';
    import {IsPC} from '../js/util';
    export default {
        components: {MenuDropdown},
        props: {
            text: {type: String},
            title: {type: String},
            index: {type: Number},
            dot: {type: Boolean},
            active: {type: Boolean},
            hasActiveItem: {type: Boolean},
            icon: {
                type: String,
                default: 'angle-down'
            },
            onclick: {
                type: Function
            },
            mounted: {
                type: Function
            },
            items: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        mounted () {
            if (this.mounted) {
                this.mounted();
            }
        },
        methods: {
            menuClick (isClick) {
                if (this.items.length > 0) {
                    this.$emit('active', this.index);
                } else if (this.onclick && isClick !== false) {
                    this.onclick();
                }
            },
            menuMouseEnter () {
                if (IsPC() && this.hasActiveItem && !this.active) {
                    this.menuClick(false);
                }
            },
        }
    };
</script>
<style scoped>
    .menu-item{
        display: inline-block;
        position: relative;
        cursor: pointer;
        padding: 0 10px;
        font-size: 14px;
        user-select: none;
    }
    .menu-item:hover{
        background-color: #ddd;
    }
    .menu-item.active{
        background-color: #ddd;
    }
    .menu-item > i{
        margin: 0;
    }
    .menu-item-dropdown{
        position: absolute;
        min-width: 200px;
        min-height: 20px;
        background-color: #fcfcfc;
        border: 1px solid #eee;
        box-shadow: 0 0 2px 0 #bbb;
        left: 1px;
        display: none;
        z-index: 2;
        font-size: 13px;
        color: #555;
        padding: 3px 0;
        margin-top: -1px;
    }
    .menu-item.active .menu-item-dropdown{
        display: block;
    }
    .menu-item.active .menu-item-dropdown{
        display: block;
    }
    .menu-item.active .menu-icon:before{
        transform: rotate(180deg);
    }
    .menu-dd-item{
        position: relative;
        white-space: nowrap;
        padding: 0 24px;
        cursor: pointer;
    }
    .menu-split{
        border-bottom: 1px solid #e2e2e2;
        width: 94%;
        margin: 5px auto;
    }
    .menu-dd-item:hover{
        background-color:#dcdcdc;
    }
    .menu-dd-item.active{
        background-color: #ddd;
    }
    .ddi-icon{
        position: absolute;
        top: 9px;
        left: 5px;
    }
    .ddi-key{
        float: right;
    }
    .ddi-link{
        position: absolute;
        right: 5px;
        top: 8px;
    }
</style>