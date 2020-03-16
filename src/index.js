import 'easy-icon';
import $ from 'easy-dom-util';
import {toast, confirm} from 'tacl-ui';
import TCEditor from 'tc-editor';
import Log from './log';
import {TOOL_HEIGHT, initResize, initKeyEvent} from './event';
import {getUrlParam, DEFAULT_CODE, initWindowFunc} from './util';
import {copyText} from './log/util';

$.reportStyle({
    func: initStyle
});

['fontSizeUp', 'fontSizeDown', 'fullScreen', 'changeTheme', 'submit'];
function main () {
    let editor = null;
    $.query('body').append(
        $.create('div#container').render({
            html: /* html*/`
            <div class='tool-w'>
                <i class="ei-github" title='github' @event='goGithub'></i>
                <i class="ei-zoom-in" title='放大字体(ctrl + +)' @event='fontUp'></i>
                <i class="ei-zoom-out" title='缩小字体(ctrl + -)' @event='fontDown'></i>
                <i class="ei-sun" title='切换主题(ctrl + t)' @event='theme'></i>
                <i class="ei-trash" title='清空代码(ctrl + d)' @event='clear'></i>
                <i class="ei-save" title='暂存代码(ctrl + s)' @event='save'></i>
                <i class="ei-history" title="重置代码(ctrl + e)" @event="reset"></i>
                <i class="ei-copy" title='复制代码(ctrl + q)' @event='copy'></i>
                <i class="ei-cog" title='设置(ctrl + i)' @event='config'></i>
                <i class="ei-link" title='生成链接(ctrl + l)' @event='link'></i>
                <i class="ei-play" title='运行代码(ctrl + enter)' @event='run'></i>
            </div>
            <div class='jsbox-main-panel' @el='panel'>
                <div class='code-panel'>
                    <div @el='code' class='code-panel'></div>
                </div>
                <div @el='log' class='log-panel'></div>
            </div>`,
            result (el) {
                initResize(el);
                initLog(el.log);
                editor = initCode(el.code);
                initKeyEvent(editor, this.method);
                initWindowFunc();
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
                    (new Function(code))();
                },
                config () {
                    toast('暂无此功能');
                },
                theme () {
                    if (!editor) {return;}
                    editor.changeTheme();
                    toggleCls(this.self, 'ei-sun', 'ei-moon');
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
                    let url = `https://theajack.gitee.io/jsbox?theme=${editor.config.theme}&code=${encodeURIComponent(editor.code())}`;
                    console.log(url);
                    copyText(url, false);
                    toast('代码链接已复制到剪切板');
                },
                save () {
                    toast('暂存代码成功');
                    if (!editor) {return;}
                    let code = editor.code();
                    editor.config.code = code;
                    localStorage.setItem('__jsbox_code__', code);
                    location.hash = 'saved';
                }
            }
        })
    );
}

function toggleCls (el, a, b) {
    el.cls(el.cls() === a ? b : a);
}

function initCode (codeDiv) {
    let theme = getUrlParam('theme');
    let code = '';
    if (location.hash === '#saved') {
        code = localStorage.getItem('__jsbox_code__');
    } else if (location.hash === '#hello') {
        code = DEFAULT_CODE;
    }
    if (!code) {
        code = getUrlParam('code');
        if (code) {code = decodeURIComponent(code);}
    }
    return new TCEditor({
        el: codeDiv.el,
        code: code ? code : '',
        theme: theme === 'dark' ? 'dark' : 'normal',
        width: '100%',
        height: '100%',
        tab: '  ',
        toast,
        buttons: false,
        onsubmit (a, v) {
            console.log(a, v);
        },
    });
}

function initLog (logDiv) {
    let log = new Log();
    log.page = logDiv.el;
    log.index = 0;
    log.mounted();
}

function initStyle () {
    let size = $.windowSize();
    
    return /* css*/`
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
        }
        .log-panel {
            border-left: 1px solid #ddd;
            background-color: #f6f6f6;
            position: relative;
        }
        .j-code,.code_set_w{
            border-radius: 0;
        }
        .j-code,.code_editor,.code_editor_view{
            min-width: auto!important;
            left: 0px!important;
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

        @media (min-width: 500px){
            .tool-w i:hover{
                color: #000;
                transform: scale(1.3);
            }
        }
        @media (max-width: 500px){
            .log-panel, .code-panel{
                height: 50%;
                width: 100%;
                float: none;
            }
            .tc-log-funcs {
                top: auto!important;
                bottom: 6px!important;
            }
        }
        .tool-w i:active{
            color: #6b1616;
            transform: scale(1.1);
        }
    `;
}

main();