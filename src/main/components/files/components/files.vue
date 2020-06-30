<template>
    <div class='files-w' :style='{width: filePercent+"%"}' @contextmenu='onMenu'>
        <file-tool></file-tool>
        <file-block :list='files'></file-block>
        <menu-dropdown
            :menus='menus'
            @menuClick='menuClick'
            position='fixed'
            :left='left'
            :top='top'
            :visible='menuVisible'
            @click='clickFileMenu'
        ></menu-dropdown>
    </div>
</template>
<script>
    import {fileDragPercent} from '../../../js/status';
    import {EVENT} from '../../../js/constant';
    import event from '../../../js/event';
    import FileBlock from './file-block.vue';
    import FileTool from './file-tool.vue';
    import {initFileSystem} from '../file-system';
    import MenuDropdown from '../../menu-dropdown.vue';
    import fileMenus from '../file-menu';
    export default {
        name: 'files',
        components: {FileBlock, FileTool, MenuDropdown},
        data () {
            return {
                files: initFileSystem(),
                filePercent: fileDragPercent.get(),
                menus: fileMenus,
                left: 0,
                top: 0,
                menuVisible: false
            };
        },
        mounted () {
            event.regist({
                [EVENT.FILE_DRAG_PERCENT]: (filePercent) => {
                    this.filePercent = filePercent;
                }
            });
            
            document.addEventListener('click', () => {
                console.log('document click');
                if (!this.ignoreClick) {
                    this.menuVisible = false;
                } else {
                    this.ignoreClick = false;
                }
            });
        },
        methods: {
            onMenu (e) {
                e.preventDefault();
                console.log(e.clientX, e.clientY);
                this.left = e.clientX;
                this.top = e.clientY;
                this.menuVisible = true;
            },
            menuClick () {
                console.log('file-menu-click');
            },
            clickFileMenu (e) {
                console.log('clickFileMenu');
                this.ignoreClick = true;
                e.stopPropagation();
            }
            
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