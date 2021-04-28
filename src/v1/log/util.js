import tool from './tool';
// import TYPE from './type'
export function generateLogBlock (type) {
    const block = tool.create('div', 'log-block log-' + type);
    const hide = tool.create('div', 'log-block-hide', '', () => {
        block.parentNode.removeChild(block);
    });
    tool.append(hide, tool.create('span', '', '+'));
    tool.append(block, hide);
    return block;
}
export function copyText (str, log = true) {
    var input = document.getElementById('_copy_input_');
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
            if (log)
                console.tc('复制内容成功');
        } else {
            console.tc('复制内容失败');
        }
    } catch (err) {
        console.error('浏览器不支持复制功能');
    }

}