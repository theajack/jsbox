

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