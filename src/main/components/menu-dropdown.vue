<template>
    <div v-if='menus.length>0' class='menu-item-dropdown' @click.stop :style='menuStyle'>
        <div v-for='(item,index) in menus'
             class='menu-dd-item'
             :class='{"menu-split":item.type === MENU_TYPE.SPLIT}'
             :key='index'
             @click.stop='menuItemClick(item)'
             v-show='item.visible!==false'>
            <span v-if='item.type!==MENU_TYPE.SPLIT'>
                <i v-if='item.icon' :class='"ei-"+item.icon+" ddi-icon"'></i>
                <span class='dd-link ddi-name'>{{item.title}}{{item.type===MENU_TYPE.OPEN?'…':''}}</span>
                <span v-if='item.key' class='dd-link ddi-key'>{{item.key.join('+')}}</span>
                <i v-if='item.type===MENU_TYPE.LINK' class='ei-angle-right ddi-link'></i>
            </span>
        </div>
    </div>
</template>
<script>
    import {MENU_TYPE} from '../js/constant';
    export default {
        props: {
            menus: {
                type: Array,
                default () {
                    return [];
                }
            },
            top: {
                type: Number,
                default: -1,
            },
            left: {
                type: Number,
                default: 1,
            },
            position: {
                type: String,
                default: 'absolute',
            },
            visible: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            menuStyle () {
                let style = {
                    position: this.position,
                    left: this.left + 'px',
                };
                if (this.top !== -1) {
                    style.top = this.top + 'px';
                }
                if (this.visible) {
                    style.display = 'block';
                }
                return style;
            }
        },
        data () {
            return {
                MENU_TYPE,
            };
        },
        mounted () {
            this.menus.forEach((item) => {
                if (item.mounted) {
                    item.mounted();
                }
            });
        },
        methods: {
            menuItemClick (item) {
                if (item.onclick() !== false) {
                    this.$emit('menuClick');
                }
            }
        }
    };
</script>
<style scoped>
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
        display: block!important;
    }
    .menu-item.active .menu-icon:before{
        transform: rotate(180deg);
    }
    .menu-dd-item{
        position: relative;
        white-space: nowrap;
        padding: 0 24px;
        cursor: pointer;
        line-height: 30px;
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