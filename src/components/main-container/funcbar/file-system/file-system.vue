<!--
 * @Author: chenzhongsheng
 * @Date: 2023-06-23 10:40:00
 * @Description: Coding something
-->
<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import FileTools from './file-tools.vue';
import FileBlock from './file-block.vue';
import { useFileStore } from '../../../../store/file';

useFileStore();
</script>

<template>
  <div class="file-system">
    <div />
    <div>
      <FileTools />
      <FileBlock :list="[]" />
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
