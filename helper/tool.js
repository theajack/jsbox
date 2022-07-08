/*
 * @Author: tackchen
 * @Date: 2022-07-08 08:42:36
 * @Description: Coding something
 */
const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

async function exec (cmd) {
    return new Promise(resolve => {
        childProcess.exec(cmd, function (error, stdout, stderr) {
            if (error) {
                resolve({success: false, stdout, stderr});
            } else {
                resolve({
                    success: true,
                    stdout,
                    stderr
                });
            }
        });
    });
}
function resolvePath (filePath) {
    if (filePath[0] === '@' || filePath[0] === '/') {
        filePath = '../' + filePath.substring(1);
    }
    return path.resolve(__dirname, filePath);
}
function writeJsonFile (filePath, json) {
    fs.writeFileSync(resolvePath(filePath), JSON.stringify(json, null, 4), {encoding: 'utf-8'});
}

module.exports = {
    exec,
    writeJsonFile,
    resolvePath,
};