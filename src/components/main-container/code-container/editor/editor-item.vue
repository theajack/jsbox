<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import EditorDir from './editor-dir.vue';
import EditorTab from './editor-tabbar.vue';
import Editor from './editor.vue';
</script>

<template>
  <div class="editor-item">
    <EditorDir />
    <EditorTab />
    <Editor />
  </div>
</template>

<style scoped>
</style>
