/*
 * @Author: tackchen
 * @Date: 2022-05-18 11:41:30
 * @Description: Coding something
 */
const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

function initRes () {
    gulp.src('public/css/*.css')
        .pipe(gulp.dest('cdn/assets/css/editor'));
    gulp.src('public/js/*.js')
        .pipe(gulp.dest('cdn/assets/js/editor'));
    gulp.src('public/lib/*.js')
        .pipe(gulp.dest('cdn/assets/js/lib'));
    gulp.src('public/lib/env.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('cdn/assets/js/lib'));
    gulp.src('public/vs/**/*')
        .pipe(gulp.dest('cdn/assets/js/vs'));
    gulp.src('cdn/index.html')
        .pipe(gulp.dest('docs'));
}
initRes();

module.exports = () => {
    return {
        mode: 'production',
        entry: path.resolve('./', 'src'),
        output: {
            path: path.resolve('./', 'docs'),
            filename: 'main.min.js',
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
                    test: /\.css$/,
                    use: [ MiniCssExtractPlugin.loader, 'css-loader'],
                }, {
                    test: /\.less$/,
                    use: [ MiniCssExtractPlugin.loader, 'css-loader',  'less-loader'],
                }, {
                    test: /\.(woff|ttf)$/,
                    loader: 'url-loader',
                    options: {
                        limit: 50000,
                    },
                }, {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader',
                        },
                    },
                }, {
                    test: /\.html$/,
                    loader: 'html-loader',
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].min.css',
            }),
            new OptimizeCssAssetsPlugin()
        ]
    };
};
