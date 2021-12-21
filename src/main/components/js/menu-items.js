import {MENU_TYPE, EVENT} from '../../js/constant';
import event from '../../js/event';
import {code, language, theme} from '../../js/status';
import {copyText} from '../../log/util';
import {LANG, THEME} from './editor';
import {exeHTML, exeJs} from './execute';
import {toast, openFullscreen, closeFullscreen, isFullScreen, getUrlParam} from '../../js/util';
import {download, openFile} from './file';
import {isCustomConfig} from './config';
import {Libs} from './lib';
import {compressUrl} from '../../js/compress';
import {getGithubInfo} from '../../../import';

export let menus = [
    {
        title: '编辑',
        active: false,
        items: [{
            icon: 'file-o',
            title: '打开文件',
            key: ['ctrl', 'o'],
            onclick () {
                setTimeout(openFile);
            },
            mounted () {
                event.regist(EVENT.OPEN_FILE, this.onclick);
            },
            type: MENU_TYPE.OPEN,
        }, {
            icon: 'save',
            title: '暂存',
            key: ['ctrl', 's'], // 默认null
            onclick () {
                event.emit(EVENT.USE_CODE, (value) => {
                    code.set(value, true, false);
                    toast('暂存代码成功');
                });
            },
            mounted () {
                event.regist(EVENT.SAVE_CODE, this.onclick);
            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'download-alt',
            title: '保存到本地',
            onclick () {
                setTimeout(() => {
                    download();
                });
            },
            type: MENU_TYPE.FUNC,
        }, {
            type: MENU_TYPE.SPLIT
        }, {
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
                        event.emit(EVENT.SET_CODE, '');
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
                        event.emit(EVENT.SET_CODE, code.get());
                    }
                });
            },
            mounted () {
                event.regist(EVENT.RESET_CODE, this.onclick);
            },
            type: MENU_TYPE.FUNC,
        }, {
            type: MENU_TYPE.SPLIT
        },  {
            icon: 'random',
            title: '与暂存版本对比',
            onclick () {
                event.emit(EVENT.OPEN_DIFF);
            },
            type: MENU_TYPE.OPEN,
        }]
    }, {
        title: '外观',
        active: false,
        items: [{
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
        }, {
            type: MENU_TYPE.SPLIT
        }, {
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
                    this.onclick();
                });
            }
        }, {
            title: '全屏',
            icon: 'expand-full',
            key: ['f11'],
            methods: {
                fullScreenChange () {
                    let isfull = !isFullScreen();
                    this.icon = isfull ? 'expand-full' : 'collapse-full';
                    this.title = isfull ? '全屏' : '退出全屏';
                    return isfull;
                }
            },
            onclick () {
                let isFullScreen = this.methods.fullScreenChange.call(this);
                if (isFullScreen) {
                    openFullscreen();
                } else {
                    closeFullscreen();
                }
            },
            mounted () {
                document.onfullscreenchange = () => {
                    this.methods.fullScreenChange.call(this);
                };
                event.regist(EVENT.TOGGLE_FULLSCREEN, () => {
                    this.onclick();
                });
            }
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
            type: MENU_TYPE.SPLIT,
        }, {
            title: '选择开发语言',
            icon: 'terminal',
            key: ['ctrl', 'g'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_LANG_CHOOSE);
            },
            type: MENU_TYPE.OPEN,
        }, {
            type: MENU_TYPE.SPLIT,
            visible: isCustomConfig,
        }, {
            title: '选择自定义代码',
            icon: 'paper-clip',
            visible: isCustomConfig,
            // key: ['ctrl', 'g'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_CONFIG_CHOOSE);
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
                    const host = `${location.protocol}//${location.host}/`;
                    let url = `${host}jsbox?theme=${theme.get()}&lang=${language.get()}&lib=${Libs.join(',')}`;
                    ['mes', 'remind', 'run'].forEach((item) => {
                        let value = getUrlParam(item);
                        if (value) {
                            url += `&${item}=${value}`;
                        }
                    });
                    url += `&code=${compressUrl(code)}`;
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
            type: MENU_TYPE.SPLIT
        }, {
            title: 'Github主页',
            icon: 'github',
            onclick () {
                window.open('https://www.github.com/theajack/jsbox');
            },
            type: MENU_TYPE.LINK,
        }, {
            title: '--/--',
            visible: false,
            icon: 'github',
            onclick () {
                window.open(`https://www.github.com/${this.title}`);
            },
            mounted () {
                const info = getGithubInfo();
                if (info) {
                    this.title = `${info.user}/${info.rep}`;
                    this.visible = true;
                }
            },
            type: MENU_TYPE.LINK,
        }, {
            type: MENU_TYPE.SPLIT
        }, {
            title: '使用说明',
            icon: 'info',
            onclick () {
                const host = `${location.protocol}//${location.host}/`;
                window.open(`${host}jsbox#hello`);
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
        onclick (c) {
            let lang = language.get();
            if (lang === LANG.JAVASCRIPT || lang === LANG.HTML) {
                if (typeof c === 'string') {
                    if (c.trim() === '') {
                        toast('请输入一些代码');
                        return;
                    }
                    exeJs(c);
                } else {
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
                }
            } else {
                toast('只支持运行js和html代码');
            }
        },
        mounted () {
            event.regist(EVENT.RUN_CODE, (code) => {
                this.onclick(code);
            });
        }
    }
];