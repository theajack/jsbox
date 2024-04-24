<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import { useMenuStore } from '../../store/menu';
import FileSystem from './funcbar/file-system/file-system.vue';
import SearchContainer from './funcbar/search/search-container.vue';
const menu = useMenuStore();
</script>

<template>
  <div class="main-funcbar">
    <FileSystem v-if="menu.activeSidebarIndex === 0" />
    <SearchContainer v-else-if="menu.activeSidebarIndex === 1" />
  </div>
</template>

<style scoped>
</style>
