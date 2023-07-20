/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-22 23:47:41
 * @Description: Coding something
 */
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            activeIndex: -1,
            list: 111,
        };
    },
    actions: {
        isActive (index: number) {
            return index === this.activeIndex;
        }
    }
});