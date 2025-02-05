#!/usr/bin/env node

const openDefaultBrowser = function (url) {
    var exec = require('child_process').exec;
    switch (process.platform) {
        case 'darwin':
            exec('open ' + url);
            break;
        case 'win32':
            exec('start ' + url);
            break;
        default:
            exec('xdg-open', [url]);
    }
};

// codeSrc,github,config,githubConfig
openDefaultBrowser(`https://shiyix.cn/jsbox?${process.argv[2]}`);