const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
function initRes () {
    gulp.src('public/env.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('cdn/v1'));

    gulp.src('public/lib.js')
        .pipe(gulp.dest('cdn/v1'));
}
initRes();

module.exports = () => {
    return {
        mode: 'production',
        entry: path.resolve('./', 'src/v1'),
        output: {
            path: path.resolve('./', 'cdn/v1'),
            filename: 'bundle.js',
        },
        module: {
            rules: [
                {
                    test: /(.js)$/,
                    use: [{
                        loader: 'babel-loader',
                    }]
                }, {
                    enforce: 'pre',
                    test: /\.vue$/,
                    loader: 'eslint-loader',
                    exclude: /node_modules/
                }, {
                    test: /(.js)$/,
                    use: [{
                        loader: path.resolve('./', 'helper/zipcssinjs-loader.js')
                    }],
                    exclude: /node_modules/,
                    include: /(tacl-ui)|(easy-dom)/
                }, {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                }, {
                    test: /\.(woff|ttf)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                    },
                },
            ]
        }
    };
};
