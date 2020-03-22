const gulp = require('gulp');
const rename = require('gulp-rename');
let version = require('../package.json').version;

function copyLatest () {
    gulp.src(`npm/index.js`)
        .pipe(rename(function (path) {
            console.log(path.basename);
            path.basename = `jsbox.${version}.min.js`;
            return path;
        }))
        .pipe(gulp.dest('cdn'))
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(version, 'latest');
            return path;
        }))
        .pipe(gulp.dest('cdn'));
}

copyLatest();