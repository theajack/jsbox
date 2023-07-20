<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import TerminalBar from './terminal/terminal-bar.vue';
import Terminal from './terminal/terminal.vue';
</script>

<template>
  <div class="terminal-container">
    <TerminalBar />
    <div class="terminal-list">
      <Terminal />
    </div>
  </div>
</template>

<style scoped>
</style>
