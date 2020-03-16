import {copyText} from './log/util';


export function readCookie (name, cookie = document.cookie) {
    if (cookie.length > 0 && name) {
        let reg = new RegExp('(^|; ?)' + name + '=([^&]*?)(;|$)', 'i');
        let r = cookie.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return '';
    }
    return '';
};

export function getUrlParam (name, defVal) {
    return parseUrlParam(window.location.search, name, defVal);
}

export function parseUrlParam (search, name, defVal) {
    if (search === true) {
        search = decodeURIComponent(window.location.search);
    }
    if (typeof name !== 'undefined') {
        if (search !== '') {
            let reg = new RegExp('(^|&)' + name + '=([^&]*?)(&|$)', 'i');
            let r = search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
        }
        return (typeof defVal !== 'undefined') ? defVal : null;
    }
    if (search === '') { return {}; }
    let arr = search.substr(1).split('&');
    let param = {};
    arr.forEach(item => {
        let pArr = item.split('=');
        param[pArr[0]] = pArr[1];
    });
    return param;
}

export let DEFAULT_CODE = /* javascript */`
// JSBOX by theajack
// 这是一个在线运行调试js的项目, 使用 ctrl+enter 打印一个Hello world吧
log('Hello World!');
/*
快捷按键与按钮说明：
ctrl + : 放大字体
ctrl - : 缩小字体
ctrl t : 切换主题
ctrl d : 清空代码
ctrl s : 暂存代码：暂存之后代码会被保存起来，刷新页面或重置代码都会还原到保存的状态
ctrl e : 重置代码：回到初始态或暂存状态
ctrl q : 复制代码
ctrl i : 设置
ctrl l : 生成链接：该链接打开可以还原当前正在编辑的代码
ctrl enter : 运行代码
*/

/*
search参数：
theme=dark 开启dark代码编辑模式，默认为normal
code=xxx 设置编辑器代码，需要经过 decodeURIComponent

hash参数
#saved 使用暂存代码填充编辑器
#hello 进入欢迎页
*/

/*
在jsbox中，您可以使用以下方法
log(arg1,arg2,...); 打印内容
copy(string); 复制内容到剪切板
*/
`.trim();

export function initWindowFunc () {
    window.log = console.log;
    window.copy = copyText;
}