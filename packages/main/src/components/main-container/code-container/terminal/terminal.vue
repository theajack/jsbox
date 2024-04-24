<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
import { onMounted, reactive, ref, shallowReactive } from 'vue';
import { createTerm } from 'webos-term';

const terminalBox = ref(null);

// const data = reactive({
//     a: 1,
//     d: shallowReactive({
//         c: { d: 1 }
//     })
// });

// window.data = data;

onMounted(async () => {
    const term = await createTerm({
        // @ts-ignore
        'container': terminalBox.value,
    });

    function ensureInputIsVisible (container: HTMLElement) {
        if (container.tagName === 'BODY') {
            document.documentElement.scrollTop = document.documentElement.offsetHeight;
        } else {
        // @ts-ignore
            container.scrollTop = container.firstElementChild?.offsetHeight;
        }
    }
    ensureInputIsVisible(term.container);
});
</script>

<template>
  <div ref="terminalBox" class="terminal-box">
    <!-- terminal-box
    <div>{{ data.a }}</div>
    <div>{{ data.d.c.d }}</div> -->
  </div>
</template>

<style scoped>
</style>
