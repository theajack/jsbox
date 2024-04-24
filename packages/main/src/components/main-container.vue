<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import CodeContainer from './main-container/code-container.vue';
import Funcbar from './main-container/funcbar.vue';
import Sidebar from './main-container/sidebar.vue';
import LogBar from './main-container/log-bar.vue';
</script>

<template>
  <div id="main-container">
    <Sidebar />
    <Funcbar />
    <CodeContainer />
    <LogBar />
  </div>
</template>
<style scoped>
</style>