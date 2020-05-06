<template>
    <div class='files-w'>
        <div class='list-item' v-for='(item, index) in list' :key='index'>
            <div class='item-name'>
                <span>{{item.name}}</span>
            </div>
            <div v-if='item.children' class='children-item'>
                <files :list='item.children'></files>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'files',
        props: {
            list: {
                required: true,
                type: Array
            }
        }
    };
</script>