import {MENU_TYPE, EVENT} from '../../js/constant';
import event from '../../js/event';
export let menus = [
    {
        title: '编辑',
        active: false,
        items: [{
            icon: 'copy',
            title: '复制',
            key: ['ctrl', 'p'], // 默认null
            onclick () {

            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'trash',
            title: '清空',
            key: ['ctrl', 'd'], // 默认null
            onclick () {

            },
            type: MENU_TYPE.FUNC,
        }, { // <i class="ei-file-code"></i>
            icon: 'history',
            title: '重置',
            key: ['ctrl', 'e'], // 默认null
            onclick () {

            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'save',
            title: '暂存',
            key: ['ctrl', 's'], // 默认null
            onclick () {

            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'random',
            title: '与暂存版本对比',
            key: [], // 默认null
            onclick () {

            },
            type: MENU_TYPE.FUNC,
        }]
    }, {
        title: '外观',
        active: false,
        items: [{
            title: '切换主题',
            icon: 'sun',
            key: ['ctrl', 'p'], // 默认null
            onclick () {
                this.icon = 'moon';
                return false;
            },
            dot: false, // 默认false
        }, {
            title: '放大字体',
            icon: 'zoom-in',
            key: ['ctrl', '-'], // 默认null
            onclick () {
                return false;
            },
            dot: false, // 默认false
        }, {
            title: '缩小字体',
            icon: 'zoom-out',
            key: ['ctrl', '+'], // 默认null
            onclick () {
                return false;
            },
            dot: false, // 默认false
        }]
    }, {
        title: '环境',
        active: false,
        items: [{
            title: '加载第三方库',
            icon: 'book',
            key: ['ctrl', 'i'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_LIB_CHOOSE);
            },
            dot: true, // 默认false
        }, {
            title: '运行环境',
            icon: 'cube-alt',
            key: ['ctrl', 'n'], // 默认null
            onclick () {

            },
            dot: true, // 默认false
        }, {
            title: '开发语言',
            icon: 'terminal',
            key: ['ctrl', 'g'], // 默认null
            onclick () {

            },
            dot: true, // 默认false
        }]
    }, {
        title: '帮助',
        active: false,
        items: [{
            title: '复制',
            icon: 'copy',
            key: ['ctrl', 'p'], // 默认null
            onclick () {

            },
            dot: false, // 默认false
        }]
    }, {
        title: '运行',
        icon: 'play',
        active: false,
    }
];