const request = require('request');
const packages = require('./package');
const path = 'https://cdn.jsdelivr.net/npm/';
const httpBase = 'https://data.jsdelivr.com/v1/package/npm/';

let urls = [];

function main () {
    packages.forEach((pkg) => {
        let pkgPath = null;
        if (pkg.indexOf(':') !== -1) {
            pkgPath = pkg.substr(pkg.indexOf(':') + 1);
            pkg = pkg.substr(0, pkg.indexOf(':'));
        }
        request(`${httpBase}${pkg}`, {json: true}, (err, res) => {
            if (err) { return console.log(err); }
            let latest = res.body.tags.latest;
            request(`${httpBase}${pkg}@${latest}`, {json: true}, (err, res) => {
                if (err) { return console.log(err); }
                console.log(pkg, res.body.default);
                let def = res.body.default;
                if (def === null || def.substr(def.lastIndexOf('.')) !== '.js') {
                    if (pkgPath) {
                        def = pkgPath;
                    } else {
                        def = findDefJs(res.body.files, pkg, '/');
                    }
                }
                if (!def) {
                    checkFinish(`${pkg}@${latest}`);
                } else {
                    checkFinish(`${path}${pkg}@${latest}${def}`);
                }
            });
        });
    });
}

function extractPkgInfo () {

}

function checkFinish (url) {
    urls.push(url);
    let num = urls.length;
    console.log(`${num} / ${packages.length}`);
    if (num >= packages.length) {
        console.log(urls);
    }
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