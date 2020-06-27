<template>
    <div class='file-tools'>
        <i class='ei-file-o file-tool' title='新建文件' @click='createFile'></i>
        <i class='ei-folder-close-alt file-tool' title='新建文件夹' @click='createFolder'></i>
        <i class='ei-expand-alt file-tool' title='展开所有目录' @click='expandAll'></i>
        <i class='ei-collapse-alt file-tool' title='折叠所有目录' @click='collapseAll'></i>
    </div>
</template>
<script>
    export default {
        name: 'file-tool',
        methods: {
            createFile () {

            },
            createFolder () {

            },
            expandAll () {

            },
            collapseAll () {

            },
        }
    };
</script>
<style lang="less" scoped>
.file-tools{
    padding-right: 8px;
    text-align: right;
    .file-tool{
        font-size: 13px;
        cursor: pointer;
        display: inline-block;
        &:hover{
            transform: scale(1.2);
        }
    }
    .ei-expand-alt, .ei-collapse-alt{
        font-size: 14px;
    }
}
</style>