<!--
 * @Author: chenzhongsheng
 * @Date: 2023-06-23 00:22:01
 * @Description: Coding something
-->
<script setup lang="ts">
import { EMenuType } from '../../scripts/constant/enum';
import { ISubMenuList, ISubMenu } from '../../store/menu';

defineProps<{
    list: ISubMenuList,
}>();

function menuItemClick (item: ISubMenu) {
    console.log(item);
}
</script>
<template>
  <div v-if="list.length>0" ref="menuEl" class="menu-item-dropdown" @click.stop>
    <div
      v-for="(item,index) in list"
      v-show="item.visible!==false"
      :key="index"
      class="menu-dd-item"
      :class="{'menu-split':item.type === EMenuType.Split}"
      @click.stop="menuItemClick(item)"
    >
      <span v-if="item.type!==EMenuType.Split">
        <i v-if="item.icon" :class="'ei-'+item.icon+' ddi-icon'" />
        <span class="dd-link ddi-name">{{ item.title }}{{ item.type===EMenuType.Open?'…':'' }}</span>
        <span v-if="item.key" class="dd-link ddi-key">{{ item.key.join('+') }}</span>
        <i v-if="item.type===EMenuType.Link" class="ei-angle-right ddi-link" />
      </span>
    </div>
  </div>
</template>
<style scoped lang="less">

    .menu-item-dropdown{
        position: absolute;
        left: 0px;
        top: 100%;
        min-width: 200px;
        min-height: 20px;
        background-color: var(--bg-2);
        border: var(--border);
        // box-shadow: 0 0 2px 0 #bbb;
        box-shadow: none;
        display: none;
        z-index: 2;
        font-size: 13px;
        color: var(--text-color);
        padding: 3px 0;
    }
    .menu-dd-item{
        position: relative;
        white-space: nowrap;
        padding: 0 24px;
        cursor: pointer;
        line-height: var(--bar-height);
        &:hover{
            background-color:var(--light-bg)
        }
    }
    .menu-split{
        border-bottom: var(--border);
        width: 94%;
        margin: 5px auto;
    }
    // .menu-dd-item.active{
    //     background-color: #ddd;
    // }
    .ddi-icon{
        position: absolute;
        top: 6px;
        left: 5px;
        &:hover{
            transform: scale(1.2);
            color: var(--text-hl-color);
        }
    }
    .ddi-key{
        float: right;
    }
    .ddi-link{
        position: absolute;
        right: 5px;
        top: 8px;
    }
</style>