const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = () => {
    return {
        mode: 'production',
        entry: path.resolve('./', 'src/npm/index.js'),
        output: {
            path: path.resolve('./', 'npm'),
            filename: 'index.js',
            library: 'JSBox',
            libraryTarget: 'umd',
            libraryExport: 'default',
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
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader',
                        },
                    },
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin([
                {from: 'src/npm/package.json'},
                {from: 'src/npm/index.d.ts'},
                {from: 'LICENSE'},
                {from: 'README.md'},
            ]),
            new VueLoaderPlugin()
        ]
    };
};
