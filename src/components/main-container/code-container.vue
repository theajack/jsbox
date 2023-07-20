<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import EditorContainer from './code-container/editor-container.vue';
import TerminalContainer from './code-container/terminal-container.vue';
</script>

<template>
  <div class="code-container">
    <EditorContainer />
    <TerminalContainer />
  </div>
</template>

<style scoped>
</style>
