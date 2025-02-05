/*
 * @Author: chenzhongsheng
 * @Date: 2025-02-05 19:13:04
 * @Description: Coding something
 */
let requireEnabled = false;

export function enableRequire () {
    if (requireEnabled) return;

    let map = window.jsboxCode?.iifeMap || window.jsboxConfig?.iifeMap;

    if (!map) return;

    window.require = (name) => {
        let key = map[name];
        if (!key) throw new Error('请先定义 iifeMap');
        return window[key];
    };
}