const gulp = require('gulp');
const rename = require('gulp-rename');
let version = require('../ebuild.config').version;

function copyLatest () {
    gulp.src(`cdn/*.${version}.min.js`)
        .pipe(rename(function (path) {
            path.basename = path.basename.replace(version, 'latest');
            return path;
        }))
        .pipe(gulp.dest('cdn'));
}

copyLatest();