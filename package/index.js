const request = require('request');
const fs = require('fs');
const packages = require('./package');
const path = 'https://fastly.jsdelivr.net/npm/';
const httpBase = 'https://data.jsdelivr.com/v1/package/npm/';

function main () {
    for (let k in packages) {
        loadSingle(k, packages[k]);
    }
}

function loadSingle (name, pkg) {
    let pkgPath = null;
    let url = '';
    let version = '';
    if (typeof pkg === 'string') {
        url = pkg;
    } else {
        if (pkg.url) {url = pkg.url;}
        if (pkg.def) {pkgPath = pkg.def;}
        delete pkg.def;
    }
    if (url !== '') {
        checkFinish();
        return;
    }
    request(`${httpBase}${name}`, {json: true}, (err, res) => {
        if (err) { return console.log(err); }
        version = res.body.tags.latest;
        request(`${httpBase}${name}@${version}`, {json: true}, (err, res) => {
            if (err) { return console.log(err); }
            let def = res.body.default;
            if (def === null || def.substr(def.lastIndexOf('.')) !== '.js') {
                if (pkgPath) {
                    def = pkgPath;
                } else {
                    def = findDefJs(res.body.files, name, '/');
                }
            }
            if (!def) {
                url = `https://unpkg.com/${name}`;
                checkFinish(name, version, url);
            } else {
                url = `${path}${name}@${version}${def}`;
                checkFinish(name, version, url);
            }
        });
    });
}

let num = 0;
let length = Object.keys(packages).length;
function checkFinish (name, version, url) {
    num ++;
    console.log(`${num} / ${length}`);
    if (name) {
        if (typeof packages[name] === 'object') {
            packages[name].version =  version;
            packages[name].url =  url;
        } else {
            packages[name] =  {
                version,
                url,
            };
        }
    }
    if (num >= length) {
        saveLibs(packages);
    }
}

function saveLibs (packages) {
    let content = `window.jsbox_libs = ${JSON.stringify(packages, null, 4)};`;
    fs.writeFileSync('public/resources.js', content, 'utf8' );
}

function findDefJs (files, pkg, name) {
    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (file.type === 'directory') {
            let res = findDefJs(file.files, pkg, `${name}${file.name}/`);
            if (res) {
                return res;
            }
        } else if (file.type === 'file') {
            let fileName = file.name.toLowerCase();
            if (fileName.indexOf(pkg.toLowerCase()) !== -1 && fileName.substr(fileName.lastIndexOf('.')) === '.js') {
                return name + file.name;
            }
        }
    }
}

main();