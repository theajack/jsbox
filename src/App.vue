<!--
 * @Author: theajack
 * @Date: 2023-04-04 23:20:27
 * @Description: Coding something
-->
<script setup lang="ts">
import { onMounted } from 'vue';
// import { initMonaco } from './scripts/manaco/manaco';
import MenuContainer from './components/menu-container.vue';
import MainContainer from './components/main-container.vue';
import StatusContainer from './components/status-container.vue';

onMounted(() => {
    // console.log(initMonaco());
});
</script>

<template>
  <div id="container">
    <MenuContainer />
    <MainContainer />
    <StatusContainer />
  </div>
</template>
<style lang="less">
#container {
  width: 100%;
  height: 300px;
}
</style>