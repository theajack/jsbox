<!--
* @Author: theajack
* @Date: 2023-04-04 23:20:27
* @Description: Coding something
-->
<script setup lang="ts">
function  createFile () {

}
function  createFolder () {

}
function  expandAll () {
    console.log('expandAll');
}
function  collapseAll () {

}
</script>
<template>
  <div class="file-tools">
    <i class="ei-file-o file-tool" title="新建文件" @click="createFile" />
    <i class="ei-folder-close-alt file-tool" title="新建文件夹" @click="createFolder" />
    <i class="ei-expand-alt file-tool" title="展开所有目录" @click="expandAll" />
    <i class="ei-collapse-alt file-tool" title="折叠所有目录" @click="collapseAll" />
  </div>
</template>

<style scoped lang="less">
.file-tools{
    padding-right: 8px;
    text-align: right;
    .file-tool{
        font-size: 13px;
        cursor: pointer;
        display: inline-block;
        margin: 2px;
        &:hover{
            transform: scale(1.2);
        }
    }
    .ei-expand-alt, .ei-collapse-alt{
        font-size: 16px;
    }
}
</style>
