<template>
    <div class='menu-item' :class='{"active": active}' @click='menuClick' @mouseenter='menuMouseEnter'>
        <span>{{text || title}}</span>
        <i v-if='items.length>0' class='ei-angle-down'></i>
        <i v-else :class='"ei-"+icon' :title='title'></i>
        <div v-if='items.length>0' class='menu-item-dropdown'>
            <div class='menu-dd-item' v-for='(item,index) in items' :key='index' @click.stop='menuItemClick(item)'>
                <i v-if='item.icon' :class='"ei-"+item.icon+" ddi-icon"'></i>
                <span class='dd-link ddi-name'>{{item.title}}{{item.type===MENU_TYPE.OPEN?'…':''}}</span>
                <span v-if='item.key' class='dd-link ddi-key'>{{item.key.join('+')}}</span>
                <i v-if='item.type===MENU_TYPE.LINK' class='ei-angle-right ddi-link'></i>
            </div>
        </div>
    </div>
</template>
<script>
    import {MENU_TYPE} from '../js/constant';
    export default {
        props: {
            text: {type: String},
            title: {type: String},
            index: {type: Number},
            key: {type: String},
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
            items: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data () {
            return {
                MENU_TYPE,
            };
        },
        methods: {
            menuClick () {
                if (this.items.length > 0) {
                    this.$emit('active', this.index);
                }
            },
            menuMouseEnter () {
                if (this.hasActiveItem && !this.active) {
                    this.menuClick();
                }
            },
            menuItemClick (item) {
                if (item.onclick() !== false) {
                    this.menuClick();
                }
            }
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
    }
    .menu-item.active .menu-item-dropdown{
        display: block;
    }
    .menu-item.active .menu-item-dropdown{
        display: block;
    }
    .menu-item.active > .ei-angle-down:before{
        transform: rotate(180deg);
    }
    .menu-dd-item{
        position: relative;
        white-space: nowrap;
        padding: 0 24px;
        cursor: pointer;
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