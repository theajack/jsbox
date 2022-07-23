/*
 * @Author: tackchen
 * @Date: 2022-07-23 09:18:54
 * @Description: Coding something
 */
const gulp = require('gulp');
const babel = require('gulp-babel');

function transEs6ByBabel () {
    gulp.src(['public/lib/env.js', 'public/lib/lib.js'])
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('cdn/assets/js/lib'));
}

transEs6ByBabel();