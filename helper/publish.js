const execSync = require('child_process').execSync;
const config = require('../ebuild.config');
// const packageJSON = require('../package.json');
// const path = require('path');
// const fs = require('fs-extra');

// const root = path.resolve(__dirname, '..');
// const distRoot = path.resolve(__dirname, '../dist');
// const npmOrganization = '@wenyanlang';

// const packages = ['cli', 'core', 'render'];

// const fileToCopy = [
//     'README.md',
//     'README.zh-Hans.md',
//     'README.zh-Hant.md',
//     'LICENSE'
// ];

// const fieldsInPackageJSONToRemove = [
//     'devDependencies',
//     'lint-staged',
//     'husky',
//     'scripts',
//     'private'
// ];

async function publish () {
    config.npmPaths.forEach((path) => {
        execSync(`npm publish ${path}`);
    });
}

// async function CopyFiles () {
//     for (const pkg of packages) {
//         console.log(`Copying files for ${pkg}...`);
//         for (const file of fileToCopy) {
//             await fs.copyFile(
//                 path.join(root, file),
//                 path.join(distRoot, pkg, file)
//             );
//         }
//     }
// }

// async function MakePackageJSON () {
//     for (const pkg of packages) {
//         console.log(`Generating package.json for ${pkg}...`);
//         const json = JSON.parse(JSON.stringify(packageJSON));
//         json.name = `${npmOrganization}/${pkg}`;
//         json.main = './index.min.js';

//         for (const field of fieldsInPackageJSONToRemove) delete json[field];

//         if (pkg === 'cli') {
//             json.bin = {
//                 wenyan: './index.min.js'
//             };
//         }

//         const jsonString = JSON.stringify(json, null, 2) + '\n';

//         await fs.writeFile(
//             path.join(distRoot, pkg, 'package.json'),
//             jsonString,
//             'utf-8'
//         );
//     }
// }

// async function Publish () {
//     for (const pkg of packages) {
//         console.log(`Publishing ${npmOrganization}/${pkg}...`);
//         execSync('npm publish --access public', {
//             cwd: path.join(distRoot, pkg)
//         });
//     }
// }

(async () => {
    await publish();
})();