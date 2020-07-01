import {copyText} from '../log/util';
import {loading} from 'tacl-ui';
import $ from 'easy-dom-util';
import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/message.css';

const TYPE = {
    SUCCESS: 'success',
    WARN: 'warning',
    INFO: 'info',
    ERROR: 'error'
};

export function toast (text, time = 1500, type = TYPE.INFO) {
    Message[type]({
        message: text,
        duration: time === false ? 0 : time,
        showClose: true,
        customClass: 'jx-message'
    });
}
toast.success = (text, time) => {toast(text, time, TYPE.SUCCESS);};
toast.warn = (text, time) => {toast(text, time, TYPE.WARN);};
toast.info = (text, time) => {toast(text, time, TYPE.INFO);};
toast.error = (text, time) => {toast(text, time, TYPE.ERROR);};

window.toast = toast;
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
    // if (search === true) {
    //     search = decodeURIComponent(window.location.search);
    // }
    if (search[search.length - 1] === '/') {
        search = search.substr(0, search.length - 1);
    }
    if (typeof name !== 'undefined') {
        if (search !== '') {
            let reg = new RegExp('(^|&)' + name + '=([^&]*?)(&|$)', 'i');
            let r = search.substr(1).match(reg);
            if (r != null) {
                // return unescape(r[2]); //unescape会将汉字乱码
                return r[2];
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
ctrl q : 重置代码：回到初始态或暂存状态
ctrl p : 复制代码
ctrl l : 加载第三方库
ctrl i : 加载运行环境
ctrl g : 选择编程语言
ctrl e : 清空log
ctrl y : 运行代码
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
    window.log = function (...args) {
        console.log(...args);
    };
    window.copy = copyText;
}


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
export function goGithub (url) {
    window.open(url || 'https://www.github.com/theajack/jsbox');
}

export function isUndf (v) {
    return typeof v === 'undefined';
}
export function isObject (v) {
    return typeof v === 'object';
}

export function checkElOverflow (el) {
    let width = $.windowSize().width;
    let rect = el.getBoundingClientRect();
    let left = width - rect.left - rect.width;
    if (left < 0) {
        el.style.left = left + 'px';
    }
}


export function openFullscreen () {
    let elem = document.documentElement;
    try {
        if (elem.requestFullscreen) {
            elem.requestFullscreen().catch(() => {});
        } else if (elem.mozRequestFullScreen) {
            /* Firefox */
            elem.mozRequestFullScreen().catch(() => {});
        } else if (elem.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            elem.webkitRequestFullscreen().catch(() => {});
        } else if (elem.msRequestFullscreen) {
            /* IE/Edge */
            elem.msRequestFullscreen().catch(() => {});
        }
    } catch (e) {}
}

export function closeFullscreen () {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.mozCancelFullScreen) {
        /* Firefox */
            document.mozCancelFullScreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
            document.webkitExitFullscreen().catch(() => {});
        } else if (document.msExitFullscreen) {
        /* IE/Edge */
            document.msExitFullscreen().catch(() => {});
        }
    } catch (e) {}
}
export function isFullScreen () {
    return (document.fullscreenElement ||
           document.msFullscreenElement  ||
           document.mozFullScreenElement ||
           document.webkitFullscreenElement || null) !== null;
}

export function debounce (fn, time) {
    var timeout = null;
    return function (...args) {
        var self = this;
        if (timeout !== null) { clearTimeout(timeout); }
        timeout = setTimeout(function () {
            fn.apply(self, args);
            timeout = null;
        }, time);
    };
};
window.$ = $;
export function hitEventParent (e, target, stop = null) {
    let el = $.query(e.target);
    if (stop && el.hasClass(stop)) {
        return null;
    }
    while (!el.hasClass(target)) {
        el = el.parent();
        if (el === null || (stop && el.hasClass(stop))) {
            return null;
        }
    }
    return el;
}