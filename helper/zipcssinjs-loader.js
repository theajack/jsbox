module.exports = function loader (source) {
    let reg = new RegExp('\\/\\*[ \\*]*css[ \\*]*\\*\\/`(.|\\r\\n)*?`', 'g');
    let array = source.match(reg);
    if (array !== null) {
        array.forEach(css => {
            source = source.replace(
                css,
                css.replace(new RegExp('\\r\\n *', 'g'), '')
                    .replace(new RegExp('\\/\\*(.|\\r\\n)*?\\*\\/', 'g'), '')
                    .replace(new RegExp(' *\\{', 'g'), '{'));
        });
    }

    // 压缩字符串内的html
    // 为了引号嵌套 请在最后一个配对引号 紧贴着最后一个 > 中间嵌套的 >与` 之前请留出一个空格
    reg = new RegExp('\\/\\*[ \\*]*html[ \\*]*\\*\\/`(.|\\r\\n)*?>`', 'g');
    array = source.match(reg);
    if (array !== null) {
        array.forEach(html => {
            source = source.replace(
                html,
                html.replace(new RegExp('\\r\\n *', 'g'), '')
                    .replace(new RegExp('<!--(.|\\r\\n)*?-->', 'g'), ''));
        });
    }
    return source;
};