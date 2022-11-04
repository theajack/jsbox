/*
 * @Author: tackchen
 * @Date: 2022-07-23 09:18:54
 * @Description: Coding something
 */
const gulp = require('gulp');
const babel = require('gulp-babel');

function transEs6ByBabel () {
    gulp.src([
        'public/lib/env.js',
        'public/lib/lib.js',
        'public/lib/config.js'
    ])
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('docs/envs'));
}

module.exports = {transEs6ByBabel};