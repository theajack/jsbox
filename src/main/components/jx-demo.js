/*
 * @Author: chenzhongsheng
 * @Date: 2022-11-01 08:57:21
 * @Description: debug jsbox codesrc
 */

// 调试使用
if (window.location.host.indexOf('localhost') === 0) {
    window.jsboxCode = {
        lib: 'https://cdn.jsdelivr.net/npm/alins',
        lang: 'js',
        wrapCode: true,
        needUI: true,
        hideLog: true,
        useDefaultUI: true,
        clearWhenReRun: true,
        code: /* javascript */`const { button, comp, click, $, mount } = Alins;
    
    function Count () {
        const count = $(0);
        return button(
            click(() => {count.value++;}),
            $\`Count is \${count}\`
        );
    }
    
    comp(Count).mount('#jx-app');`
    };
}
