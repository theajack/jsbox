import $ from 'easy-dom-util';
import TCEditor from 'tc-editor';

import Log from './log';

$.reportStyle({
    func: initStyle
});

let main = () => {
    initCode();
    initLog();
};

function initCode () {
    let codeDiv = $.create('div.code-panel').append($.create('div#editor'));
    $.query('body').append(codeDiv);
    window.a = new TCEditor({
        el: '#editor',
        width: '100%',
        height: '100%',
        tab: '  ',
        theme: 'dark',
        buttons: ['fontSizeUp', 'fontSizeDown', 'fullScreen', 'changeTheme', 'submit'],
        onsubmit (a, v) {
            console.log(a, v);
        },
    });
    return codeDiv;
}

function initLog () {
    let logDiv = $.create('div.log-panel');
    $.query('body').append(logDiv);
    let log = new Log();
    log.page = logDiv.el;
    log.index = 0;
    log.mounted();
    return logDiv;
}

function initStyle () {
    let size = $.windowSize();
    return /* css*/`
        body,html{
            margin: 0;
            width: 100%;
            height: ${size.height}px;
        }
        html *{
            box-sizing: border-box;
        }
        .log-panel, .code-panel{
            height: 100%;
            width:50%;
            float: left;
            overflow: hidden;
        }
        .log-panel {
            border-left: 1px solid #ddd;
            background-color: #fafafa;
            position: relative;
        }
        .tc-log-funcs {
            position: absolute!important;
        }
        .j-code,.code_set_w{
            border-radius: 0;
        }
        .j-code,.code_editor,.code_editor_view{
            min-width: auto!important;
            left: 0px!important;
        }
    `;
}

main();