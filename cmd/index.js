/*
 * @Author: chenzhongsheng
 * @Date: 2025-02-05 20:30:50
 * @Description: Coding something
 */

const fs = require('fs');
const path = require('path');

function generateCodeMap (base, input) {
    const list = fs.readdirSync(input);

    let codes = {};

    const htmlReg = /<!-- *@(needUI|hideLog|dep|desc|title) *=? *(.*?) *-->/g;
    const jsReg = /\/\/ *@(needUI|hideLog|dep|desc|title) *=? *(.*?)(\n|$)/g;

    list.forEach(v => {
        let lastIndex = v.lastIndexOf('.');

        let tail = v.substring(lastIndex + 1);
        if (tail !== 'js' && tail !== 'html') return;

        const filePath = path.resolve(input, v);
        let content = fs.readFileSync(filePath, 'utf-8');

        let data = {};

        const isHtml = tail === 'html';

        const reg = isHtml ? htmlReg : jsReg;

        content = content.replaceAll(reg, (_, key, value) => {
            if (key === 'needUI' || key === 'hideLog') {
                data[key] = (value === 'true' || value === '');
            } else if (key === 'dep') {
                data[key] = value.trim().split(',');
            } else {
                data[key] = value.trim();
            }
            return '';
        });
        data.code = content.trim();
        if (isHtml) { data.lang = 'html'; }

        const fileName = v.substring(0, lastIndex);
        const name = fileName.replace(/^[0-9]+-/, '');

        const mdFile = path.resolve(filePath, `../${fileName}.md`);
        if (fs.existsSync(mdFile)) {
            data.doc = fs.readFileSync(mdFile, 'utf-8');
        }
        codes[name] = data;
    });
    return {
        ...base,
        codes,
    };
}


function initCodeMap ({
    input,
    output = path.resolve(input, '../jsbox.config.js'),
    configFile = path.resolve(input, '../jsbox.base.js'),
    format = false,
    watch = false,
}) {
    let base = {};
    if (fs.existsSync(configFile)) {
        base = require(configFile);
    }

    initBase({base, input, output, format});

    if (watch) {
        fs.watch(input, () => {
            initBase({base, input, output, format});
        });
    }
};

function initBase ({
    base, input, output, format
}) {
    const data = generateCodeMap(base, input);
    fs.writeFileSync(output, `window.jsboxConfig = ${format ? JSON.stringify(data, null, 4) : JSON.stringify(data)}`, 'utf-8');
}


module.exports = {
    generateCodeMap,
    initCodeMap
};