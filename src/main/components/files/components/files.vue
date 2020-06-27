<template>
    <div class='files-w' :style='{width: filePercent+"%"}'>
        <file-tool></file-tool>
        <file-block :list='files'></file-block>
    </div>
</template>
<script>
    import {fileDragPercent} from '../../../js/status';
    import {EVENT} from '../../../js/constant';
    import event from '../../../js/event';
    import FileBlock from './file-block.vue';
    import FileTool from './file-tool.vue';
    import {initFileSystem} from '../file-system';
    export default {
        name: 'files',
        components: {FileBlock, FileTool},
        data () {
            return {
                files: initFileSystem(),
                filePercent: fileDragPercent.get()
            };
        },
        mounted () {
            event.regist({
                [EVENT.FILE_DRAG_PERCENT]: (filePercent) => {
                    this.filePercent = filePercent;
                }
            });
        }
    };
</script>
<style lang="less" scoped>
    .files-w{
        background-color: #f3f3f3;
    }
    body.dark{
        .files-w{
            background-color: #252525;
        }
    }
</style>