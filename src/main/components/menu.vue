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
        <env-select></env-select>
        <lang-select></lang-select>
    </div>
</template>
<script>
    import JsboxMenuItem from './menu-item.vue';
    import libSelect from './select/lib.vue';
    import envSelect from './select/env.vue';
    import langSelect from './select/language.vue';
    import {goGithub, checkElOverflow} from '../js/util';
    import {menus} from './js/menu-items';
    import $ from 'easy-dom-util';
    export default {
        components: {JsboxMenuItem, libSelect, envSelect, langSelect},
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