<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import { useMenuStore, IMenuItem } from '../../store/menu';
import MenuDropDown from './menu-dropdown.vue';

const menu = useMenuStore();
defineProps<{
    item: IMenuItem,
    index: number
}>();

</script>

<template>
  <div
    class="menu-item"
    :class="{active: menu.isActive(index)}"
    @click="menu.menuTitleClick(index)"
    @mouseenter="menu.menuMouseEnter(index)"
  >
    <div :title="item.title">
      <span>{{ item.title }}</span>
      <i v-if="item.children && item.children.length>0" class="ei-angle-down menu-icon" />
      <i v-else :class="item.icon || 'ei-angle-down'" class="menu-icon" />
    </div>
    <!-- v-show="menu.isActive(index)" -->
    <MenuDropDown v-if="item.children" :list="item.children" />
  </div>
</template>
<style scoped lang="less">
    @import 'src/styles/class.less';
    .menu-item{
        cursor: pointer;
        padding: 0 10px;
        font-size: 14px;
        user-select: none;
        height: 100%;
        position: relative;
        // display: flex;
        // align-items: center;
        .align-center;
        .menu-icon{
            margin-left: 3px;
        }
        &:hover{
            background-color: var(--light-bg)
        }
        & > i{
            margin: 0;
        }
        &.active {
            .menu-item-dropdown{
                display: block;
            }
            .menu-item-dropdown{
                display: block;
            }
            .menu-icon:before{
                transform: rotate(180deg);
            }
        }
    }
</style>