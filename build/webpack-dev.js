const path = require('path');

let config = require('./webpack-config');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
let findToFilePath = pathname => {
    return path.resolve(__dirname, pathname);
};

module.exports = merge(config, {
    mode: 'development',
    output: {
        path: findToFilePath('../dist'),
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].chunk.js',
        publicPath: '/'
    },
    devtool: '#cheap-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: [path.resolve(__dirname, '../src')], // 指定检查的目录
            }
        ]
    },
    devServer: {
        contentBase: '../dist',
        historyApiFallback: true,
        host: "0.0.0.0",
        overlay: true,
        open: true,
        port: 3002,
        quiet: false,
        hot: true,
        stats: 'errors-only'
    },
    plugins: [
        new FriendlyErrorsPlugin()
    ]
});
