const gulp = require('gulp');
const rename = require('gulp-rename');

function copyLatest () {
    gulp.src(`npm/index.js`)
        .pipe(rename(function (path) {
            path.basename = `jsbox.min`;
            return path;
        }))
        .pipe(gulp.dest('npm'));
}

copyLatest();