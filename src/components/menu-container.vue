<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import { useMenuStore } from '../store/menu';
import MenuItem from './menu/menu-item.vue';

function goToGithub () {

}
</script>

<template>
  <div id="menu-container">
    <i class="ei-code" style="margin-right: 5px;" @click="goToGithub" />
    <MenuItem
      v-for="(item, index) in useMenuStore().list"
      :key="index"
      :item="item"
      :index="index"
    />
  </div>
</template>

<style scoped>
</style>


