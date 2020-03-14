const fs = require('fs');
let config = require('../ebuild.config');
let version = config.version;

let es6 = config.versioJsEs6Module;

let packageFiles = config.packageFiles;

let versioJsFiles = config.versioJsFiles; ;

function modifyVersion () {
    packageFiles.forEach(file => {
        let pkg = require(file);
        pkg.version = version;
        fs.writeFile(file.substr(1), JSON.stringify(pkg, null, 4), 'utf8', (err) => {
            if (err) throw err;
        });
    });
    let head = es6 ? 'export default ' : 'module.exports = ';
    versioJsFiles.forEach(file => {
        fs.writeFile(file.substr(1), `${head}'${version}';`, 'utf8', (err) => {
            if (err) throw err;
        });
    });
}

modifyVersion();