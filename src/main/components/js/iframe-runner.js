export let GlobalInfo = {
    scripts: [],
    styles: [],
    html: '',
};

// <script src="https://cdn.jsdelivr.net/npm/alins-compiler-web"></script>
export function createIFrameSrc (js) {


    // ${GlobalInfo.scripts.map(src => src.replace('cdn.jsdelivr.net/npm', 'unpkg.com')).join('\n')}
    // ${GlobalInfo.styles.map(src => src.replace('cdn.jsdelivr.net/npm', 'unpkg.com')).join('\n')}

    // const alinsSrc = `${location.origin}${location.pathname}/alins.iife.min.js`;
    // debugger;
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>iframe runner</title>
    <style>
    body{color: transparent; color: #fff; margin: 0;}
    .jx-input, .jx-select, .jx-textarea, .jx-ui input, .jx-ui select, .jx-ui textarea {
        color: #222;
        width: 200px;
        height: 30px;
        border-radius: 2px;
        border: 1px solid #666;
        padding: 0 8px;
        outline: none;
        font-size: 14px;
    }
    .jx-textarea, .jx-ui textarea{
        min-height: 150px;
        padding: 8px;   
    }
    .jx-input.jx-full, .jx-textarea, .jx-ui input.jx-full, .jx-ui textarea {
        width: 100%;
    }
    .jx-block {
        margin: 10px 0;
    }

    .jx-button, .jx-ui button{
        border-radius: 2px;
        padding: 0 10px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        outline: none;
        border: 1px solid #666;
        cursor: pointer;
    }
    .jx-button:active, .jx-ui button:active{
        transform: scale(0.96);
    }

    ::-webkit-scrollbar {
        width:5px;
        cursor: pointer;
        height: 5px;
    }
    ::-webkit-scrollbar-button {
        display: none;
    }
    ::-webkit-scrollbar-track {
        display: none;
    }
    ::-webkit-scrollbar-track-piece {
        background-color:#88888811;
    }
    ::-webkit-scrollbar-thumb{
        background-color:#88888866;
        cursor: pointer;
    }
    ::-webkit-scrollbar-thumb:hover{
        background-color:#88888888;
        cursor: pointer;
    }
    </style>
   	<script src="https://cdn.jsdelivr.net/npm/link-dom"></script>
   	<script src="https://cdn.jsdelivr.net/npm/tacl-ui"></script>
    ${GlobalInfo.scripts.join('\n')}
    ${GlobalInfo.styles.join('\n')}
</head>
<body>
    <script>
        window.log = (...args)=>console.log(...args);
        window.copy = copyText;
        // 以上为兼容旧版本
        window.$log = (...args)=>console.log(...args);
        window.$copy = copyText;
        window.$run = () => postMsg('run_code');
        window.$dom = window.LinkDom.dom;
        window.$toast = window.TaclUI.toast;
        window.$app = document.getElementById('jx-app');
        if (!window.$) {
            window.$ = (v) => {
                return document.querySelector(v);
            };
        }
        function postMsg(type, data=[]) {
            try {
                window.parent.postMessage({type, data});
            } catch (error) {
                window.parent.postMessage({type, data: [JSON.stringify(data)]});
                console.warn('发送消息到父窗口失败，转为字符串发送', error.toString());
            }
        }
        console.log = (...args) => {
            postMsg('iframe_log', args);
        };
        console.clear = () => {
            postMsg('iframe_clear_log');
        };
        window.addEventListener('DOMContentLoaded', () => {
            postMsg('iframe_loaded');
        });
        var map = (window.jsboxConfig || window.jsboxCodeMap || {}).iifeMap || {};
        window.require = (name) => {
            let key = map[name];
            if (!key) throw new Error('请先定义 iifeMap');
            return window[key];
        };
        function copyText (str) {
            let input = document.getElementById('_copy_input_');
            if (!input) {
                input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.setAttribute(
                    'style',
                    'height:10px;position:fixed;top:-100px;opacity:0;'
                );
                input.setAttribute('id', '_copy_input_');
                document.body.appendChild(input);
            }
            input.value = str;
            input.select();

            try {
                if (document.execCommand('Copy')) {
                    console.log('复制内容成功');
                } else {
                    console.log('复制内容失败');
                }
            } catch (err) {
                console.error('浏览器不支持复制功能');
            }
        }
    </script>
    ${GlobalInfo.html}
    <div id='jx-app'></div>
    <div id='app'></div>
    <script>
        ${js}
    </script>
</body>
</html>`;

    // GlobalInfo.libs = [];
    const blob = new Blob([ html ], {type: 'text/html'});
    return URL.createObjectURL(blob) + '#/';
}