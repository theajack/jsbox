const gulp = require('gulp');
const babel = require('gulp-babel');
let config = require('../ebuild.config');

let tranToEs5InNpm = config.tranToEs5InNpm;

function main () {
    copy();
}

function copy () {
    gulp.src('src/*')
        .pipe(gulp.dest('npm'))
        .on('end', () => {
            if (tranToEs5InNpm) {
                transEs6ByBabel();
            }
        });
}

function transEs6ByBabel () {
    gulp.src('src/*.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('npm'));
}


main();