import {MENU_TYPE, EVENT} from '../../js/constant';
import event from '../../js/event';
import {code, language, theme} from '../../js/status';
import {copyText} from '../../log/util';
import {LANG, THEME} from './editor';
import {exeHTML, exeJs} from './execute';
import {toast} from '../../js/util';

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
            mounted () {
                event.regist(EVENT.COPY_CODE, this.onclick);
            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'trash',
            title: '清空',
            key: ['ctrl', 'd'],
            onclick () {
                event.emit(EVENT.OPEN_CONFIRM, {
                    text: '是否确认清空代码?',
                    confirm () {
                        event.emit(EVENT.CODE_CHANGE, '');
                    }
                });
            },
            mounted () {
                event.regist(EVENT.CLEAR_CODE, this.onclick);
            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'history',
            title: '重置',
            key: ['ctrl', 'q'],
            onclick () {
                event.emit(EVENT.OPEN_CONFIRM, {
                    text: '是否确认重置为暂存代码?',
                    confirm () {
                        event.emit(EVENT.CODE_CHANGE, code.get());
                    }
                });
            },
            mounted () {
                event.regist(EVENT.RESET_CODE, this.onclick);
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
            mounted () {
                event.regist(EVENT.SAVE_CODE, this.onclick);
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
        items: [{
            title: '切换深色主题',
            icon: 'moon',
            key: ['ctrl', 'p'],
            methods: {
                setInfo (item) {
                    let isDark = theme.get() === THEME.DARK;
                    item.title = `切换${isDark ? '浅色' : '深色'}主题`;
                    item.icon = isDark ? 'sun' : 'moon';
                },
            },
            onclick () {
                theme.set(theme.get() === THEME.DARK ? THEME.LIGHT : THEME.DARK);
                this.methods.setInfo(this);
                return false;
            },
            mounted () {
                this.methods.setInfo(this);
                event.regist(EVENT.THEME_TOGGLE, () => {
                    this.onclick(this);
                });
            }
        },
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
            key: ['ctrl', 'l'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_LIB_CHOOSE);
            },
            type: MENU_TYPE.OPEN,
        }, {
            title: '运行环境',
            icon: 'cube-alt',
            key: ['ctrl', 'i'], // 默认null
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
            onclick () {
                event.emit(EVENT.USE_CODE, (code) => {
                    const host = 'https://theajack.gitee.io/';
                    let url = `${host}jsbox?theme=${theme.get()}`;
                    url += `&code=${encodeURIComponent(code)}`;
                    console.log(url);
                    copyText(url, false);
                    toast('代码链接已复制到剪切板');
                });
            },
            mounted () {
                event.regist(EVENT.GENE_LINK, this.onclick);
            },
            type: MENU_TYPE.FUNC,
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
        text: '运行',
        title: '运行(ctrl+y)',
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
        },
        mounted () {
            event.regist(EVENT.RUN_CODE, this.onclick);
        }
    }
];