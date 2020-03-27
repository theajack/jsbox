<template>
    <div class='jsbox-tool-w'>
        <i class='ei-code' @click='goGithub'></i>
        <jsbox-menu-item
            v-for='(item, index) in menus'
            :key='index'
            :title='item.title'
            :icon='item.icon'
            :items='item.items'
            :index='index'
            :active='item.active'
            :onclick='item.onclick'
            :hasActiveItem='hasActiveItem'
            @active='active'
        ></jsbox-menu-item>
        <lib-select></lib-select>
        <!-- <i class='ei-github' title='github' @event='goGithub'></i>
        <i class='ei-play' title='运行代码(ctrl + enter)' @event='run'></i>
        <i class='ei-zoom-in' title='放大字体(ctrl + +)' @event='fontUp'></i>
        <i class='ei-zoom-out' title='缩小字体(ctrl + -)' @event='fontDown'></i>
        <i class='ei-moon' title='切换主题(ctrl + m)' id='themeIcon' @el='theme' @event='theme'></i>
        <i class='ei-trash' title='清空代码(ctrl + d)' @event='clear'></i>
        <i class='ei-save' title='暂存代码(ctrl + s)' @event='save'></i>
        <i class='ei-history' title='重置代码(ctrl + e)' @event='reset'></i>
        <i class='ei-copy' title='复制代码(ctrl + q)' @event='copy'></i>
        <i class='ei-book' title='三方库引入(ctrl + i)' @event='lib'></i>
        <i class='ei-cube-alt' title='运行环境(ctrl + n)' @event='env'></i>
        <i class='ei-link' title='生成链接(ctrl + l)' @event='link'></i>
        <i class='ei-info' title='使用说明页' @event='hello'></i>
        <i class='ei-code' title='使用html(ctrl + g)' id='changeMode' @el='codeMode' @event='changeMode'></i> -->
        <!--<i class="ei-cog" title='设置' @event='config'></i>-->
    </div>
</template>
<script>
    import JsboxMenuItem from './menu-item.vue';
    import libSelect from './select/lib.vue';
    import {goGithub, checkElOverflow} from '../js/util';
    import {menus} from './js/menu-items';
    import $ from 'easy-dom-util';
    export default {
        components: {JsboxMenuItem, libSelect},
        data () {
            return {
                hasActiveItem: false,
                ignoreClick: false,
                menus,
            };
        },
        mounted () {
            window._v = this;
            document.addEventListener('click', () => {
                if (!this.ignoreClick) {
                    this.active(-1);
                } else {
                    this.ignoreClick = false;
                }
            });
        },
        methods: {
            active (index) {
                this.ignoreClick = true;
                let item = this.menus.find((item) => {
                    return item.active === true;
                });
                if (item) {
                    item.active = false;
                }
                if (index >= 0 && item !== this.menus[index] && this.menus[index].items.length > 0) {
                    this.menus[index].active = true;
                    this.$nextTick(() => {
                        checkElOverflow($.query('.menu-item.active .menu-item-dropdown').el);
                    });
                    this.hasActiveItem = true;
                } else {
                    this.hasActiveItem = false;
                }
            },
            goGithub () {goGithub();}
        }
    };
</script>
<style scoped>
    .jsbox-tool-w{
        /* background-color: #e5e5e5; */
        color: #444;
        border-bottom: 1px solid #ddd;
        padding-left: 5px;
    }
</style>