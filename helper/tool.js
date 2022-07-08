/*
 * @Author: tackchen
 * @Date: 2022-07-08 08:42:36
 * @Description: Coding something
 */
const childProcess = require('child_process');

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


module.exports = {
    exec,
};