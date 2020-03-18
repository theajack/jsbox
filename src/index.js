import 'easy-icon';
import $ from 'easy-dom-util';
import {toast, confirm} from 'tacl-ui';
import TCEditor from 'tc-editor';
import Log from './log';
import {TOOL_HEIGHT, initResize, initKeyEvent} from './event';
import {getUrlParam, DEFAULT_CODE, initWindowFunc} from './util';
import {copyText} from './log/util';
import {read, write, TYPE} from './notebook';
import {open} from './import';
import {initConfig} from './config';

$.reportStyle({
    func: initStyle,
    usePool: true
});

$.initStylePool();

const host = 'https://theajack.gitee.io/';

function main () {
    let editor = null;
    $.query('body').append(
        $.create('div#container').render({
            html: /* html*/`
            <div class='tool-w'>
                <i class="ei-github" title='github' @event='goGithub'></i>
                <i class="ei-play" title='运行代码(ctrl + enter)' @event='run'></i>
                <i class="ei-zoom-in" title='放大字体(ctrl + +)' @event='fontUp'></i>
                <i class="ei-zoom-out" title='缩小字体(ctrl + -)' @event='fontDown'></i>
                <i class="ei-sun" title='切换主题(ctrl + m)' id='themeIcon' @el='theme' @event='theme'></i>
                <i class="ei-trash" title='清空代码(ctrl + d)' @event='clear'></i>
                <i class="ei-save" title='暂存代码(ctrl + s)' @event='save'></i>
                <i class="ei-history" title="重置代码(ctrl + e)" @event="reset"></i>
                <i class="ei-copy" title='复制代码(ctrl + q)' @event='copy'></i>
                <i class="ei-cog" title='设置(ctrl + i)' @event='config'></i>
                <i class="ei-link" title='生成链接(ctrl + l)' @event='link'></i>
                <i class="ei-info" title='使用说明页' @event='hello'></i>
            </div>
            <div class='jsbox-main-panel' @el='panel'>
                <div class='code-panel' @el='codew'>
                    <div @el='code' class='code-panel'></div>
                </div>
                <div @el='log' class='log-panel'>
                    <div @el='drag' class='drag-bar'></div>
                </div>
            </div>`,
            result (el) {
                initResize(el);
                initLog(el.log);
                editor = initCode(el);
                initKeyEvent(this.method);
                initWindowFunc();
                initDrag(el);
                editor.els.codearea.attr('placeholder', 'Type some code...');
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
                    if (code.indexOf('\n') === -1) {
                        code = `log(${code})`;
                    }
                    (new Function(code))();
                },
                config () {
                    open();
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
                    let url = `${host}jsbox?theme=${editor.config.theme}&code=${encodeURIComponent(editor.code())}`;
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

function toggleCls (el, a, b) {
    el.cls(el.cls() === a ? b : a);
}

function initCode (els) {
    let theme = getUrlParam('theme');
    if (!theme) {
        theme = read(TYPE.THEME);
    }
    if (theme === 'dark') {
        els.theme.cls('ei-moon');
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
    initConfig(code, editor);
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
        el.log.style('width', `${100 - percent}%`);
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
    let barWidth = 4;
    
    return /* css */`
        body,html{
            margin: 0;
            width: 100%;
        }
        html *{
            box-sizing: border-box;
        }
        .jsbox-main-panel{
            height: ${size.height - TOOL_HEIGHT}px;
        }
        .jsbox-main-panel.no-select{
            user-select: none;
            cursor: ew-resize;
        }
        .tool-w {
            height: ${TOOL_HEIGHT}px;
            line-height: ${TOOL_HEIGHT}px;
        }
        .tool-w i{
            font-size: 20px;
            color: #444;
            margin: 0 8px;
            cursor: pointer;
            display: inline-block;
            transition: all .1s linear;
        }
        .log-panel, .code-panel{
            height: 100%;
            width:50%;
            float: left;
            overflow: hidden;
            border-top: 1px solid #ddd;
        }
        .log-panel {
            border-left: 1px solid #ddd;
            background-color: #f6f6f6;
            position: relative;
            padding-left:${barWidth}px;
        }
        .drag-bar{
            position: absolute;
            left: 0;
            height: 100%;
            width: ${barWidth}px;
            background-color: #ddd; /* 浏览器不支持时显示 */
            background-image: linear-gradient(#ddd, #8f95d7, #ddd);
            cursor: ew-resize;
            box-shadow: 0 0 5px 0 #444;
        }
        .j-code{
            border: none!important;
        }
        .j-code,.code_set_w{
            border-radius: 0;
        }
        .j-code,.code_editor,.code_editor_view{
            min-width: auto!important;
            left: 0px!important;
        }
        .tc-log-block{
            word-break: break-all;
        }
        .tc-log-block-hide span{
            left: -1.4px!important;
            font-size: 14px!important;
        }
        .tc-log-funcs {
            position: fixed!important;
            top: 6px;
            right: 0;
            bottom: auto!important;
            left: auto!important;
        }
        .tc-log-func{
            line-height: 17px!important;
        }
        .tc-log-func.tc-log-clear {
            line-height: 14px!important;
        }

        @media (min-width: 600px){
            .tool-w i:hover{
                color: #000;
                transform: scale(1.3);
            }
        }
        @media (max-width: 600px){
            .tool-w{
                overflow-x: scroll;
                white-space: nowrap;
            }
            .log-panel, .code-panel{
                height: 50%;
                width: 100%!important;
                float: none;
            }
            .tc-log-funcs {
                top: auto!important;
                bottom: 6px!important;
            }
            .log-panel{
                padding-left:0;
            }
            .drag-bar{
                display:none;
            }
        }
        .tool-w i:active{
            color: #6b1616;
            transform: scale(1.1);
        }
    `;
}

main();