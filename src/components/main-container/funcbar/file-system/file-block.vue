<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import { IUIFile } from '../../../../store/file';

defineProps<{
    deep: number,
    list: IUIFile[]
}>();
</script>
<template>
  <div class="file-block" :style="{'margin-left': (5+deep*13 -3) +'px'}">
    <div class="file-line" />

    <div
      v-for="(item, index) in list"
      :key="index"
      class="file-list"
      :style="{
        'margin-left': -(5+deep*13 -3) +'px',
        'opacity': item.cuted ? 0.5 : 1,
      }"
    >
      <file-single
        :file="item"
        :content-id="globalFileAttr.contentId"
        :deep="deep"
      />
      <file-block v-if="item.children" v-show="item.opened" :list="item.children" type="child" :deep="deep+1" />
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
