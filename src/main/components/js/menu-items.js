import {MENU_TYPE, EVENT} from '../../js/constant';
import event from '../../js/event';
import {chinese, code, language, theme, wordWrap} from '../../js/status';
import {copyText} from '../../log/util';
import {LANG, THEME} from './editor';
import {exeHTML, exeJs} from './execute';
import {toast, openFullscreen, closeFullscreen, isFullScreen, getUrlParam} from '../../js/util';
import {download, openFile} from './file';
import {isCustomConfig} from './config';
import {Libs} from './lib';
import {compressUrl} from '../../js/compress';
import {getGithubInfo} from '../../../import';
import {isMac} from '../../../util';

const ctrlKey = isMac() ? '⌘' : 'ctrl';

export let menus = [
    {
        text: '',
        chinese: '编辑',
        english: 'Edit',
        active: false,
        items: [{
            icon: 'file-o',
            text: '',
            chinese: '打开文件',
            english: 'Open File',
            key: [ctrlKey, 'o'],
            onclick () {
                setTimeout(openFile);
            },
            mounted () {
                event.regist(EVENT.OPEN_FILE, this.onclick);
            },
            type: MENU_TYPE.OPEN,
        }, {
            icon: 'save',
            text: '',
            chinese: '暂存',
            english: 'Save',
            key: [ctrlKey, 's'], // 默认null
            onclick () {
                event.emit(EVENT.USE_CODE, (value) => {
                    code.set(value, true, false);
                    toast(chinese.get() ? '暂存代码成功' : 'Code saved');
                });
            },
            mounted () {
                event.regist(EVENT.SAVE_CODE, this.onclick);
            },
            type: MENU_TYPE.FUNC,
        }, {
            icon: 'download-alt',
            text: '',
            chinese: '保存到本地',
            english: 'Save to Local',
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
            text: '',
            chinese: '复制',
            english: 'Copy',
            key: [ctrlKey, 'p'],
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
            text: '',
            chinese: '清空',
            english: 'Clear',
            key: [ctrlKey, 'd'],
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
            text: '',
            chinese: '重置',
            english: 'Reset',
            key: [ctrlKey, 'q'],
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
            text: '',
            chinese: '与暂存版本对比',
            english: 'Diff',
            onclick () {
                event.emit(EVENT.OPEN_DIFF);
            },
            type: MENU_TYPE.OPEN,
        }]
    }, {
        text: '',
        chinese: '外观',
        english: 'Appearance',
        active: false,
        items: [{
            text: '',
            icon: 'zoom-in',
            chinese: '放大字体',
            english: 'Zoom In',
            key: [ctrlKey, '-'], // 默认null
            onclick () {
                event.emit(EVENT.FONT_SIZE_CHANGE, 'up');
                return false;
            },
        }, {
            text: '',
            icon: 'zoom-out',
            chinese: '缩小字体',
            english: 'Zoom Out',
            key: [ctrlKey, '+'], // 默认null
            onclick () {
                event.emit(EVENT.FONT_SIZE_CHANGE, 'down');
                return false;
            },
        }, {
            type: MENU_TYPE.SPLIT
        }, {
            text: '',
            chinese: 'Use English',
            english: '使用中文',
            icon: 'heart-empty',
            methods: {
                setInfo (item) {
                    item.icon = chinese.get() ? 'font' : 'heart-empty';
                },
            },
            onclick () {
                chinese.set(!chinese.get());
                this.methods.setInfo(this);
                return false;
            },
            mounted () {
                this.methods.setInfo(this);
                event.regist(EVENT.THEME_TOGGLE, () => {
                    this.onclick(false);
                });
            }
        }, {
            type: MENU_TYPE.SPLIT
        }, {
            text: '',
            chinese: '切换主题',
            english: 'Toggle Theme',
            icon: 'moon',
            key: [ctrlKey, 'p'],
            methods: {
                setInfo (item) {
                    let isDark = theme.get() === THEME.DARK;
                    item.title = chinese.get() ? `切换${isDark ? '浅色' : '深色'}主题` : `Toggle ${isDark ? 'Light' : 'Dark'} Theme`;
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
                    this.onclick(false);
                });
            }
        }, {
            text: '',
            icon: 'level-down',
            chinese: '切换代码换行',
            english: 'Toggle Word Wrap',
            key: [ctrlKey, 'h'],
            methods: {
                setInfo (item) {
                    let bool = wordWrap.get();
                    item.title = chinese.get() ? `${bool ? '关闭' : '开启'}代码换行` : `${bool ? 'Close' : 'Open'} Word Wrap`;

                },
            },
            onclick () {
                wordWrap.set(!wordWrap.get());
                this.methods.setInfo(this);
                return false;
            },
            mounted () {
                this.methods.setInfo(this);
                event.regist(EVENT.WORD_WRAP_TOGGLE, () => {
                    this.onclick();
                });
            }
        }, {
            text: '',
            icon: 'expand-full',
            chinese: '切换全屏',
            english: 'Toggle Fullscreen',
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
        text: '',
        chinese: '环境',
        english: 'Environment',
        active: false,
        items: [{
            text: '',
            icon: 'book',
            chinese: '加载第三方库',
            english: 'Load Library',
            key: [ctrlKey, 'l'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_LIB_CHOOSE);
            },
            type: MENU_TYPE.OPEN,
        }, {
            text: '',
            icon: 'cube-alt',
            chinese: '运行环境',
            english: 'Run Environment',
            key: [ctrlKey, 'i'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_ENV_CHOOSE);
            },
            type: MENU_TYPE.OPEN,
        }, {
            type: MENU_TYPE.SPLIT,
        }, {
            text: '',
            icon: 'terminal',
            chinese: '选择开发语言',
            english: 'Select Dev Language',
            key: [ctrlKey, 'g'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_LANG_CHOOSE);
            },
            type: MENU_TYPE.OPEN,
        }, {
            type: MENU_TYPE.SPLIT,
            visible: isCustomConfig,
        }, {
            text: '',
            chinese: '选择自定义代码',
            english: 'Select Custom Code',
            icon: 'paper-clip',
            visible: isCustomConfig,
            // key: [ctrlKey, 'g'], // 默认null
            onclick () {
                event.emit(EVENT.OPEN_CONFIG_CHOOSE);
            },
            type: MENU_TYPE.OPEN,
        }]
    }, {
        text: '',
        chinese: '帮助',
        english: 'Help',
        active: false,
        items: [{
            text: '',
            chinese: '生成链接',
            english: 'Generate Link',
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
                    toast(chinese.get() ? '代码链接已复制到剪切板' : 'Code link has been copied to clipboard');
                });
            },
            mounted () {
                event.regist(EVENT.GENE_LINK, this.onclick);
            },
            type: MENU_TYPE.FUNC,
        }, {
            type: MENU_TYPE.SPLIT
        }, {
            text: '',
            chinese: 'Github主页',
            english: 'Github Homepage',
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
            text: '',
            chinese: '使用说明',
            english: 'Usage Instructions',
            icon: 'info',
            onclick () {
                const host = `${location.protocol}//${location.host}/`;
                window.open(`${host}jsbox#hello`);
            },
            type: MENU_TYPE.LINK,
        }, {
            text: '',
            chinese: '反馈意见',
            english: 'Feedback',
            icon: 'edit',
            onclick () {
                window.open('https://www.github.com/theajack/jsbox/issues/new');
            },
            type: MENU_TYPE.LINK,
        }]
    }, {
        text: '',
        chinese: '运行',
        english: 'Run',
        title: 'Run(Ctrl+Y)',
        icon: 'play',
        active: false,
        onclick (c) {
            let lang = language.get();
            if (lang === LANG.JAVASCRIPT || lang === LANG.HTML) {
                if (typeof c === 'string') {
                    if (c.trim() === '') {
                        toast(chinese.get() ? '请输入一些代码' : 'Please enter some code');
                        return;
                    }
                    exeJs(c);
                } else {
                    event.emit(EVENT.USE_CODE, (code) => {
                        if (code.trim() === '') {
                            toast(chinese.get() ? '请输入一些代码' : 'Please enter some code');
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
                toast(chinese.get() ? '只支持运行js和html代码' : 'Only support running js and html code');
            }
        },
        mounted () {
            event.regist(EVENT.RUN_CODE, (code) => {
                this.onclick(code);
            });
        }
    }
];

event.regist(EVENT.UI_LANG_CHANGE, updateLanguage);

function updateLanguage () {
    const bool = chinese.get();

    const modItem = item => {
        item.text = item[bool ? 'chinese' : 'english'] || item.text;
        if (item.title) {
            item.title = item[bool ? 'chinese' : 'english'];
            if (item.icon === 'play') {
                item.title += isMac() ? '(⌘+Y)' : '(Ctrl+Y)';
            }
        }
    };

    menus.forEach(data => {
        modItem(data);
        if (data.items) {
            data.items.forEach(item => {
                modItem(item);
            });
        }
    });
}

updateLanguage();