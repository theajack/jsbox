import {toast, loading} from 'tacl-ui';

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
    if (search[search.length - 1] === '/') {
        search = search.substr(0, search.length - 1);
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
ctrl m : 切换主题
ctrl d : 清空代码
ctrl s : 暂存代码：暂存之后代码会被保存起来，刷新页面或重置代码都会还原到保存的状态
ctrl e : 重置代码：回到初始态或暂存状态
ctrl q : 复制代码
ctrl i : 设置
ctrl l : 生成链接：该链接打开可以还原当前正在编辑的代码
ctrl e : 清空log
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

export function IsPC () {
    var userAgentInfo = navigator.userAgent;
    var Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
    }
    return flag;
}

export function toggleCls (el, a, b) {
    el.cls(el.cls() === a ? b : a);
}
let inExe = false;
export function exeJs (code) {
    if (inExe) {
        toast('正在执行中，请勿重复操作');
        return;
    }
    inExe = true;
    loading();
    let blob = new Blob([code], {type: 'application/text'});
    let objectURL = window.URL.createObjectURL(blob);
    let s = document.createElement('script');
    s.onload = () => {
        inExe = false;
        loading.close();
    };
    s.src = objectURL;
    document.body.appendChild(s);
}

export function importScript (src) {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
        script.src = src;
    });
}

export function isMac () {
    return /macintosh/i.test(navigator.userAgent);
}

export function isCtrlPressed (e) {
    return (isMac() && e.metaKey) || (!isMac() && e.ctrlKey);
}