<template>
    <div class='file-path-w' ref='wrapper'>
        <span class='file-path-item' v-for='(item, index) in path' :key='index'>
            <i class='ei-angle-right file-path-icon' v-if='index > 0'></i>
            {{item}}
        </span>
    </div>
</template>
<script>
    import {FILE_NONE} from '../js/constant';
    import {globalFileAttr} from './files/file';
    import {idFiles} from './files/file-system';
    
    export default {
        data () {
            return {
                globalFileAttr
            };
        },
        computed: {
            path () {
                if (this.globalFileAttr.openedId === FILE_NONE) {
                    return [];
                }
                let path = idFiles[this.globalFileAttr.openedId].path;
                if (path[0] === '/') {path = path.substr(1);}
                return path.split('/');
            }
        },
        mounted () {
            this.$refs.wrapper.onwheel = function (event) {
                event.preventDefault();
                var step = 100;
                if (event.deltaY < 0) {
                    this.scrollLeft -= step;
                } else {
                    this.scrollLeft += step;
                }
            };
        },
        methods: {
        }
    };
</script>
<style lang="less">
    .file-path-w{
        border-bottom: 1px solid #eee;
        font-size: 14px;
        color: #888;
        padding: 3px;
        white-space: nowrap;
        overflow-x: auto;
        overflow-y: hidden;
        height: 28px;
        .file-path-item{
            &:first-child{
                margin-left: 5px;
            }
        }
        &::-webkit-scrollbar {
            width:2px;
            cursor: pointer;
            height: 2px;
            display: none;
            opacity: 0;
        }
        &:hover{
            &::-webkit-scrollbar {
                display: block;
                // opacity: 1;
            }
        }
    }
    body.dark{
        .file-path-w{
            border-color: #333;
        }
    }
</style>