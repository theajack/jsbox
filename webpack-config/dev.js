const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: path.resolve('./', 'src/index.js'),
    output: {
        path: path.resolve('./', 'public'),
        filename: 'bundle.js'
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.resolve('./', 'public'),
        historyApiFallback: true,
        inline: true,
        hot: false,
        // inline: false,
        host: 'localhost',
        disableHostCheck: true,
        proxy: {
        },
    },
    module: {
        rules: [{
            test: /(.js)$/,
            use: [{
                loader: 'babel-loader',
            }]
        }, {
            test: /(.js)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            exclude: /node_modules/,
            options: {
                configFile: './.eslintrc.js'
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', 'less-loader'],
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
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        // new MonacoWebpackPlugin({
        //     languages: ['javascript', 'typescript', 'html', 'json']
        // })
    ]
};