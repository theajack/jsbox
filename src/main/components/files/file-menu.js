import {MENU_TYPE} from '../../js/constant';

export default [
    {
        icon: 'file-o',
        title: '打开文件',
        key: ['ctrl', 'o'],
        onclick () {
        },
        mounted () {
        },
        type: MENU_TYPE.OPEN,
    }, {
        icon: 'save',
        title: '全部保存',
        key: ['ctrl', 's'], // 默认null
        onclick () {
        },
        // mounted () {
        //     event.regist(EVENT.SAVE_CODE, this.onclick);
        // },
        type: MENU_TYPE.FUNC,
    }, {
        icon: 'save',
        title: '保存当前文件',
        key: ['alt', 's'], // 默认null
        onclick () {
        // event.emit(EVENT.USE_CODE, (value) => {
        //     code.set(value, true, false);
        //     toast('保存代码成功');
        // });
        },
        // mounted () {
        //     event.regist(EVENT.SAVE_CODE, this.onclick);
        // },
        type: MENU_TYPE.FUNC,
    }, {
        icon: 'download-alt',
        title: '保存当前文件到本地',
        onclick () {
            setTimeout(() => {
            });
        },
        type: MENU_TYPE.FUNC,
    }, {
        icon: 'download-alt',
        title: '保存当前项目到本地',
        onclick () {
        // setTimeout(() => {
        //     download();
        // });
        },
        type: MENU_TYPE.FUNC,
    }, {
        type: MENU_TYPE.SPLIT
    }, {
        icon: 'copy',
        title: '复制',
        key: ['ctrl', 'p'],
        onclick () {
        },
        mounted () {
        },
        type: MENU_TYPE.FUNC,
    }, {
        icon: 'trash',
        title: '清空',
        key: ['ctrl', 'd'],
        onclick () {
        },
        mounted () {
        },
        type: MENU_TYPE.FUNC,
    }, {
        icon: 'history',
        title: '重置',
        key: ['ctrl', 'q'],
        onclick () {
        },
        mounted () {
        },
        type: MENU_TYPE.FUNC,
    }, {
        type: MENU_TYPE.SPLIT
    },  {
        icon: 'random',
        title: '与暂存版本对比',
        onclick () {
        },
        type: MENU_TYPE.OPEN,
    }
];