<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import { useMenuStore } from '../../store/menu';

const menu = useMenuStore();
</script>

<template>
  <div class="main-sidebar">
    <div
      v-for="(item, index) in menu.sidebarList"
      :key="item.name" class="sidebar-item"
      :class="{active: menu.isSidebarActive(index)}"
      :title="item.name"
      @click="menu.sidebarClick(index)"
    >
      <i :class="item.icon" />
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../../styles/class.less';
.main-sidebar{
  .align-center;
  flex-direction: column;
  .sidebar-item{
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 23px;
    border-left: 3px solid transparent;
    transition: border-color .3s linear;
    &.active{
      border-left: 3px solid var(--theme-color);
    }
  }
}
</style>
