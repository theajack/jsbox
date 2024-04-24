<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Log } from 'jx-console-panel';

const log = ref();

onMounted(() => {

    const logIns = new Log();
    logIns.page = log.value;
    logIns.index = 0;
    logIns.mounted();
    document.body.classList.add('dark');
});


</script>

<template>
  <div class="log-box">
    log-box
    <div ref="log" />
  </div>
</template>

<style lang="less">
</style>
