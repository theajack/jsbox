<!--
 * @Author: theajack
 * @Date: 2023-04-04 23:20:27
 * @Description: Coding something
-->
<script setup lang="ts">
import { onMounted } from 'vue';
import { initMonaco } from './scripts/manaco/manaco';

onMounted(() => {
    console.log(initMonaco());
});
</script>

<template>
  <div>
    <router-link to="/">home</router-link>
    |
    <router-link to="/about">about</router-link>
  </div>
  <router-view />
  <div id="container" />
  <!-- <router-view v-slot="{ Component }">
      <component :is="Component" />
  </router-view> -->
</template>
<style lang="less">
#container {
  width: 100%;
  height: 300px;
}
</style>