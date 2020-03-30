const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 分离css
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function initRes () {
    gulp.src('public/env.js')
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(gulp.dest('cdn/assets/js'));

    gulp.src('public/lib.js')
        .pipe(gulp.dest('cdn/assets/js'));
}
initRes();

module.exports = () => {
    return {
        mode: 'production',
        entry: path.resolve('./', 'src'),
        output: {
            path: path.resolve('./', 'cdn'),
            filename: 'assets/js/index.min.js',
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
                filename: 'assets/css/[name].min.css',
            }),
            new HtmlWebpackPlugin({
                template: './src/index.tpl.html',
                filename: 'index.html',
            }),
            new OptimizeCssAssetsPlugin()
        ]
    };
};
