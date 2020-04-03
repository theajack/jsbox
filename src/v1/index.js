import 'easy-icon';
import $ from 'easy-dom-util';
import {toast, confirm} from 'tacl-ui';
import TCEditor from 'tc-editor';
import Log from './log';
import {TOOL_HEIGHT, initResize, initKeyEvent} from './event';
import {getUrlParam, DEFAULT_CODE, initWindowFunc, IsPC, toggleCls, exeJs} from './util';
import {copyText} from './log/util';
import {read, write, TYPE} from './notebook';
import {open, openEnv} from './import';
import {initConfig} from './config';
import './style/index.css';
import {initHtml, initMode, changeMode, isHtmlMode, toggleLog, exeHtml} from './html';
$.reportStyle({
    func: initStyle,
    usePool: true
});

$.initStylePool();

const host = 'https://theajack.gitee.io/';

function main () {
    let editor = null;
    $.query('body').append(
        $.create('div#jsbox-container').render({
            html: /* html*/`
            <div class='jsbox-tool-w'>
                <i class="ei-github" title='github' @event='goGithub'></i>
                <i class="ei-play" title='运行代码(ctrl + enter)' @event='run'></i>
                <i class="ei-zoom-in" title='放大字体(ctrl + +)' @event='fontUp'></i>
                <i class="ei-zoom-out" title='缩小字体(ctrl + -)' @event='fontDown'></i>
                <i class="ei-moon" title='切换主题(ctrl + m)' id='themeIcon' @el='theme' @event='theme'></i>
                <i class="ei-trash" title='清空代码(ctrl + d)' @event='clear'></i>
                <i class="ei-save" title='暂存代码(ctrl + s)' @event='save'></i>
                <i class="ei-history" title="重置代码(ctrl + t)" @event="reset"></i>
                <i class="ei-copy" title='复制代码(ctrl + q)' @event='copy'></i>
                <i class="ei-book" title='三方库引入(ctrl + i)' @event='lib'></i>
                <i class="ei-cube-alt" title='运行环境(ctrl + n)' @event='env'></i>
                <i class="ei-link" title='生成链接(ctrl + l)' @event='link'></i>
                <i class="ei-info" title='使用说明页' @event='hello'></i>
                <i class="ei-code" title='使用html(ctrl + g)' id='changeMode' @el='codeMode' @event='changeMode'></i>
                <!--<i class="ei-cog" title='设置' @event='config'></i>-->
            </div>
            <div class='jsbox-main-panel' @el='panel'>
                <div class='code-panel' @el='codew'>
                    <div @el='code' class='code-panel'></div>
                </div>
                <div @el='logPanel' class='log-panel'>
                    <div @el='drag' class='drag-bar'></div>
                    <div @el='html' class='log-html'>
                        <i @el='htmlBtn' class="ei-chevron-right" title='隐藏log(ctrl + k)' @event='toggleLog'></i>
                        <div @el='htmlContent' class='log-content'></div>
                    </div>
                    <div @el='log' class='log-log'></div>
                </div>
            </div>`,
            result (el) {
                initHtml(el);
                initResize(el);
                initLog(el.log);
                editor = initCode(el, () => {
                    this.method.run();
                });
                initKeyEvent(el, this.method);
                initWindowFunc();
                initDrag(el);
                editor.els.codearea.attr('placeholder', 'Type some code...');
                initMode(editor, el.codeMode);
            },
            method: {
                goGithub () {
                    window.open('https://www.github.com/theajack/jsbox');
                },
                run () {
                    if (!editor) {return;}
                    let code = editor.code();
                    if (code.trim() === '') {
                        toast('请输入一些代码');
                        return;
                    }
                    if (isHtmlMode()) {
                        exeHtml(code);
                    } else {
                        if (code.indexOf('\n') === -1) {
                            code = `log(${code})`;
                        }
                        exeJs(code);
                    }
                },
                toggleLog () {
                    toggleLog();
                },
                lib () {
                    open();
                },
                env () {
                    openEnv();
                },
                config () {
                    toast('暂无');
                },
                changeMode () {
                    if (!editor) {return;}
                    let language = editor.config.language;
                    let index = language.indexOf('html');
                    changeMode((index === -1) ? 'html' : 'js', editor, this.self);
                },
                theme () {
                    if (!editor) {return;}
                    editor.changeTheme();
                    toggleCls(this.self || $.query('#themeIcon'), 'ei-sun', 'ei-moon');
                    write(TYPE.THEME, editor.config.theme);
                },
                fontUp () {
                    if (!editor) {return;}
                    editor.fontSizeUp();
                },
                fontDown () {
                    if (!editor) {return;}
                    editor.fontSizeDown();
                },
                clear () {
                    if (!editor) {return;}
                    confirm({
                        text: '是否确认清空代码？',
                        theme: 'gamer',
                    }).then(bool => {
                        if (bool) {
                            editor.clearCode();
                        }
                    });
                },
                reset () {
                    if (!editor) {return;}
                    confirm({
                        text: '是否确认重置代码？',
                        theme: 'gamer',
                    }).then(bool => {
                        if (bool) {
                            editor.code(editor.config.code);
                        }
                    });
                },
                copy () {
                    if (!editor) {return;}
                    editor.copy();
                },
                link () {
                    if (!editor) {return;}
                    let url = `${host}jsbox?theme=${editor.config.theme}`;
                    let code = editor.code().trim();
                    if (code) {
                        url += `&code=${encodeURIComponent(editor.code())}`;
                    }
                    console.log(url);
                    copyText(url, false);
                    toast('代码链接已复制到剪切板');
                },
                save () {
                    toast('暂存代码成功');
                    if (!editor) {return;}
                    let code = editor.code();
                    editor.config.code = code;
                    write(TYPE.CODE, code);
                    location.hash = 'saved';
                },
                hello () {
                    window.open(`${host}jsbox#hello`);
                }
            }
        })
    );
}

function initCode (els, success) {
    let theme = getUrlParam('theme');
    if (!theme) {
        theme = read(TYPE.THEME);
    }
    if (theme === 'dark') {
        els.theme.cls('ei-sun');
    }
    // code 优先级 config&id>#saved|#hello>code
    let code = '';
    if (location.hash === '#saved') {
        code = read(TYPE.CODE);
    } else if (location.hash === '#hello') {
        code = DEFAULT_CODE;
    }
    if (!code) {
        code = getUrlParam('code');
        if (code) {code = decodeURIComponent(code);}
    }
    let editor = new TCEditor({
        el: els.code.el,
        code: code ? code : '',
        theme: theme === 'dark' ? 'dark' : 'normal',
        width: '100%',
        height: '100%',
        tab: '  ',
        toast,
        buttons: false,
    });
    initConfig(code, editor, success, els.codeMode);
    return editor;
}

function initLog (logDiv) {
    let log = new Log();
    log.page = logDiv.el;
    log.index = 0;
    log.mounted();
    log.page.querySelector('.tc-log-clear').title = '清空log(ctrl + e)';
}

function initDrag (el) {
    let isDrag = false;
    let width = 0;
    let minWidth = 200;
    let percent = 50;
    let setDrag = (bool) => {
        isDrag = bool;
        el.panel[bool ? 'addClass' : 'rmClass']('no-select');
        if (bool) {
            width = $.windowSize().width;
        } else {
            write(TYPE.PERCENT, percent);
        }
    };
    let setPercent = () => {
        el.codew.style('width', `${percent}%`);
        el.logPanel.style('width', `${100 - percent}%`);
    };
    let setSize = (x) => {
        if (x < minWidth || x > width - minWidth) {
            return;
        }
        percent = (x / width) * 100;
        setPercent();
    };
    if (read(TYPE.PERCENT)) {
        percent = read(TYPE.PERCENT);
        setPercent();
    }
    $.query('body').on({
        mousemove (e) {
            if (isDrag) {
                setSize(e.clientX);
            }
        },
        mouseup () {
            if (isDrag) {
                setDrag(false);
            }
        },
        mouseenter () {
            setDrag(false);
        }
    });
    el.drag.on({
        mousedown () {
            setDrag(true);
        }
    });
}

function initStyle () {
    let size = $.windowSize();
    // let barWidth = 4;
    
    return /* css */`
        .jsbox-main-panel{
            height: ${size.height - TOOL_HEIGHT}px;
        }
        .jsbox-tool-w {
            height: ${TOOL_HEIGHT}px;
            line-height: ${TOOL_HEIGHT}px;
            background-color: #f6f6f6;
        }
        ::-webkit-scrollbar {
            width:5px;
            cursor: pointer;
            height: 5px;
        }
        ${IsPC() ? `
        ::-webkit-scrollbar-button    {
            display: none;
        }
        ::-webkit-scrollbar-track     {
            display: none;
        }
        ::-webkit-scrollbar-track-piece {
            background-color:#ddd;
        }
        ::-webkit-scrollbar-thumb{
            background-color:#bbb;
            border-radius:5px;
            cursor: pointer;
        }
        ::-webkit-scrollbar-thumb:hover{
            background-color:#aaa;
            cursor: pointer;
        }` : ''}
    `;
}

main();