import {MENU_TYPE, FILE_TYPE} from '../../js/constant';

let _v = null;

export function setFileMenuVue (v) {
    _v = v;
    console.log(_v);
}

export let fileItems = [
    {
        belongs: [FILE_TYPE.FILE],
        icon: 'file-o',
        title: '打开',
        // key: ['ctrl', 'o'],
        onclick () {
        },
        mounted () {
        },
        type: MENU_TYPE.FUNC,
    }, {
        belongs: [FILE_TYPE.FILE, FILE_TYPE.DIR],
        icon: 'copy',
        title: '复制',
        // key: ['ctrl', 's'], // 默认null
        onclick () {
            console.log(this);
        },
        // mounted () {
        //     event.regist(EVENT.SAVE_CODE, this.onclick);
        // },
        type: MENU_TYPE.FUNC,
    }, {
        belongs: [FILE_TYPE.FILE, FILE_TYPE.DIR],
        icon: 'cut',
        title: '剪切',
        // key: ['alt', 's'], // 默认null
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
        belongs: [FILE_TYPE.FILE, FILE_TYPE.DIR],
        type: MENU_TYPE.SPLIT
    }, {
        belongs: [FILE_TYPE.FILE, FILE_TYPE.DIR],
        icon: 'pencil',
        title: '重命名',
        // key: ['alt', 's'], // 默认null
        onclick () {

        },
        // mounted () {
        //     event.regist(EVENT.SAVE_CODE, this.onclick);
        // },
        type: MENU_TYPE.FUNC,
    }, {
        icon: 'trash',
        title: '删除',
        // key: ['alt', 's'], // 默认null
        onclick () {
            
            _v.menuFileId;
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
        type: MENU_TYPE.SPLIT
    }, {
        belongs: [FILE_TYPE.FILE, FILE_TYPE.DIR],
        icon: 'download-alt',
        title: '保存当前文件到本地',
        onclick () {
            setTimeout(() => {
            });
        },
        type: MENU_TYPE.FUNC,
    }, {
        belongs: [FILE_TYPE.PROJECT],
        icon: 'download-alt',
        title: '保存当前项目到本地',
        onclick () {
        // setTimeout(() => {
        //     download();
        // });
        },
        type: MENU_TYPE.FUNC,
    }, {
        belongs: [FILE_TYPE.FILE],
        type: MENU_TYPE.SPLIT
    },  {
        belongs: [FILE_TYPE.FILE],
        icon: 'random',
        title: '选择以进行比较',
        onclick () {
        },
        type: MENU_TYPE.OPEN,
    },  {
        belongs: [FILE_TYPE.FILE],
        icon: 'random',
        title: '与选择文件进行比较',
        onclick () {
        },
        type: MENU_TYPE.OPEN,
    }
];