import {MENU_TYPE, FILE_TYPE, EVENT} from '../../js/constant';
import {globalFileAttr} from './file';
import {idFiles, copyFile, pasteFile, cutFile} from './file-system';
import event from '../../js/event';
import {setDiffCode, diffCode} from '../js/diff-code';

// // let _v = null;

// export function setFileMenuVue () {
//     // _v = v;
//     // console.log('setFileMenuVue', _v);
// }

export const fileMenus = [
    {
        belongs: [FILE_TYPE.FILE],
        icon: 'file-o',
        title: '打开',
        // key: ['ctrl', 'o'],
        onclick () {
            idFiles[globalFileAttr.menuFileId].click();
        },
        type: MENU_TYPE.FUNC,
    }, {
        belongs: [FILE_TYPE.FILE, FILE_TYPE.DIR],
        icon: 'copy',
        title: '复制',
        // key: ['ctrl', 's'], // 默认null
        onclick (id) {
            // console.log(this);
            copyFile(id);
        },
        mounted () {
            event.regist(EVENT.COPY, () => {
                this.onclick(globalFileAttr.contentId);
            });
        },
        type: MENU_TYPE.FUNC,
    }, {
        belongs: [FILE_TYPE.FILE, FILE_TYPE.DIR],
        icon: 'cut',
        title: '剪切',
        // key: ['alt', 's'], // 默认null
        onclick (id) {
            cutFile(id);
        // event.emit(EVENT.USE_CODE, (value) => {
        //     code.set(value, true, false);
        //     toast('保存代码成功');
        // });
        },
        mounted () {
            event.regist(EVENT.CUT, () => {
                this.onclick(globalFileAttr.contentId);
            });
        },
        type: MENU_TYPE.FUNC,
    }, {
        belongs: [FILE_TYPE.FILE, FILE_TYPE.DIR],
        icon: 'paste',
        title: '粘贴',
        visible: false,
        // key: ['alt', 's'], // 默认null
        onclick (id) {
            pasteFile(id);
        // event.emit(EVENT.USE_CODE, (value) => {
        //     code.set(value, true, false);
        //     toast('保存代码成功');
        // });
        },
        mounted () {
            event.regist(EVENT.PASTE_FILE_CHANGE, canPaste => {
                this.visible = canPaste;
            });
            event.regist(EVENT.PASTE, () => {
                this.onclick(globalFileAttr.contentId);
            });
        },
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
            idFiles[globalFileAttr.menuFileId].rename();
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
            const file = idFiles[globalFileAttr.menuFileId];
            const text = file.type === FILE_TYPE.DIR ?
                `是否确认删除“${file.name}”及其内容 (不可撤销)?` :
                `是否确认删除当前文件“${file.name}” (不可撤销)?`;
            event.emit(EVENT.OPEN_CONFIRM, {
                text,
                confirm () {
                    file.remove();
                }
            });
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
            setDiffCode();
        },
        type: MENU_TYPE.OPEN,
    },  {
        belongs: [FILE_TYPE.FILE],
        icon: 'random',
        title: '',
        visible: false,
        onclick () {
            diffCode();
        },
        mounted () {
            event.regist(EVENT.DIFF_CODE_CHOOSED, (name) => {
                this.title = `与选择文件 (${name}) 进行比较`;
                if (!this.visible) {
                    this.visible = true;
                }
            });
        },
        type: MENU_TYPE.OPEN,
    }
];