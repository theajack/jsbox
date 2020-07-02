<template>
    <div class='file-block' :style="{'margin-left': (5+deep*13 -3) +'px'}">
        <div class='file-line'></div>
        <div class='file-list' :style="{'margin-left': -(5+deep*13 -3) +'px'}" v-for='(item, index) in list' :key='index'>
            <file-single :file='item' :contentId='globalFileAttr.contentId' :deep='deep'></file-single>
            <file-block v-if='item.children' v-show='item.opened' :list='item.children' type='child' :deep='deep+1'></file-block>
        </div>
    </div>
</template>
<script>
    import {globalFileAttr} from '../file';
    import {ROOT} from '../../../js/constant';
    import FileSingle from './file-single.vue';
    
    export default {
        name: 'file-block',
        components: {FileSingle},
        data () {
            return {
                globalFileAttr
            };
        },
        props: {
            deep: {
                required: false,
                default: 0,
                type: Number
            },
            type: {
                required: false,
                default: ROOT,
                type: String
            },
            list: {
                required: true,
                type: Array
            },
        },
        methods: {
        }
    };
</script>