/*
 * @Author: chenzhongsheng
 * @Date: 2023-06-22 23:47:41
 * @Description: Coding something
 */
import { defineStore } from 'pinia';
import { EMenuType } from '../scripts/constant/enum';

export interface ISubMenu {
    icon: string;
    title: string;
    key: string[];
    visible?: boolean;
    onclick(): void;
    type: EMenuType;
}

export type ISubMenuList = ISubMenu[];

export interface IMenuItem {
    title: string,
    icon?: string,
    children?: ISubMenuList
}

const list: IMenuItem[] = [ {
    title: '文件',
    // icon: '',
    children: [ {
        icon: 'file-o',
        title: '打开文件',
        key: [ 'ctrl', 'o' ],
        // visible: false,
        onclick () {
            // setTimeout(openFile);
            console.log('file-o');
        },
        type: EMenuType.Open,
    } ]
}, {
    title: '外观',
    // children: [ {
    //     icon: 'file-o',
    //     title: '打开文件',
    //     key: [ 'ctrl', 'o' ],
    //     onclick () {
    //         // setTimeout(openFile);
    //         console.log('file-o');
    //     },
    //     type: EMenuType.Open,
    // } ]
} ];

// function onclickSidebarBase

const sidebarList = [
    {
        icon: 'ei-file-text-o',
        name: '资源管理器',
        onclick () {console.log(this.icon);}
    },
    {
        icon: 'et-ic-search',
        name: '搜索',
        onclick () {console.log(this.icon);}
    },
];

export const useMenuStore = defineStore('menu', {
    state: () => {
        return {
            active: false,
            activeIndex: -1,
            list,
            sidebarList,
            activeSidebarIndex: 0,
        };
    },
    actions: {
        isActive (index: number) {
            return this.active && index === this.activeIndex;
        },
        menuMouseEnter (index: number) {
            if (this.active) {
                this.activeIndex = index;
            }
        },
        menuTitleClick (index: number) {
            this.active = !this.active;
            this.menuMouseEnter(index);
        },
        sidebarClick (index: number) {
            this.activeSidebarIndex = index;
            this.sidebarList[index].onclick();
        },
        isSidebarActive (index: number) {
            return index === this.activeSidebarIndex;
        },
    }
});