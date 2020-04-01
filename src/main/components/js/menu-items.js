import {MENU_TYPE, EVENT} from '../../js/constant';
import event from '../../js/event';
import {toast} from 'tacl-ui';
import {code, language, theme} from '../../js/status';
import {copyText} from '../../log/util';
import {LANG, THEME} from './editor';
import {exeHTML, exeJs} from './execute';

// let currentTheme = sun

let themeItem = {
    title: '切换主题',
    icon: theme.get() === THEME.LIGHT ? 'moon' : 'sun',
    key: ['ctrl', 'p'],
    onclick () {
        let isDark = theme.get() === THEME.DARK;
        this.icon = isDark ? 'sun' : 'moon';
        theme.set(isDark ? THEME.LIGHT : THEME.DARK);
        return false;
    }
};

event.regist(EVENT.THEME_TOGGLE, () => {
    themeItem.onclick();
});

export let menus = [
    {
        title: '编辑',
        active: false,
        items: [{
            icon: 'copy',
            title: '复制',
            key: ['ctrl', 'p'],
            onclick () {
                event.emit(EVENT.USE_CODE, (value) => {
                    copyText(value);
                    toast('已复制');
                });
            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'trash',
            title: '清空',
            key: ['ctrl', 'd'],
            onclick () {
                // event.emit()
            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'history',
            title: '重置',
            key: ['ctrl', 'e'],
            onclick () {

            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'save',
            title: '暂存',
            key: ['ctrl', 's'], // 默认null
            onclick () {
                event.emit(EVENT.USE_CODE, (value) => {
                    code.set(value);
                    toast('暂存代码成功');
                });
            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'random',
            title: '与暂存版本对比',
            onclick () {

            },
            type: MENU_TYPE.OPEN,
        }]
    }, {
        title: '外观',
        active: false,
        items: [
            themeItem,
            {
                title: '放大字体',
                icon: 'zoom-in',
                key: ['ctrl', '-'], // 默认null
                onclick () {
                    event.emit(EVENT.FONT_SIZE_CHANGE, 'up');
                    return false;
                },
            }, {
                title: '缩小字体',
                icon: 'zoom-out',
                key: ['ctrl', '+'], // 默认null
                onclick () {
                    event.emit(EVENT.FONT_SIZE_CHANGE, 'down');
                    return false;
                },
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
            type: MENU_TYPE.OPEN,
        }, {
            title: '运行环境',
            icon: 'cube-alt',
            key: ['ctrl', 'n'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_ENV_CHOOSE);
            },
            type: MENU_TYPE.OPEN,
        }, {
            title: '开发语言',
            icon: 'terminal',
            key: ['ctrl', 'g'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_LANG_CHOOSE);
            },
            type: MENU_TYPE.OPEN,
        }]
    }, {
        title: '帮助',
        active: false,
        items: [{
            title: '生成链接',
            icon: 'link',
            key: ['ctrl', 'l'],
            onclick () {

            },
            type: MENU_TYPE.LINK,
        }, {
            title: '使用说明',
            icon: 'info',
            onclick () {
                const host = 'https://theajack.gitee.io/';
                window.open(`${host}jsbox#hello`);
            },
            type: MENU_TYPE.LINK,
        }, {
            title: 'Github主页',
            icon: 'github',
            onclick () {
                window.open('https://www.github.com/theajack/jsbox');
            },
            type: MENU_TYPE.LINK,
        }, {
            title: '反馈意见',
            icon: 'edit',
            onclick () {
                window.open('https://www.github.com/theajack/jsbox/issues/new');
            },
            type: MENU_TYPE.LINK,
        }]
    }, {
        title: '运行',
        icon: 'play',
        active: false,
        onclick () {
            let lang = language.get();
            if (lang === LANG.JAVASCRIPT || lang === LANG.HTML) {
                event.emit(EVENT.USE_CODE, (code) => {
                    if (code.trim() === '') {
                        toast('请输入一些代码');
                        return;
                    }
                    if (lang === LANG.HTML) {
                        exeHTML(code);
                    } else {
                        exeJs(code);
                    }
                });
            } else {
                toast('只支持运行js和html代码');
            }
        }
    }
];