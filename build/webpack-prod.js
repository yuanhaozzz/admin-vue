const path = require('path');

let config = require('./webpack-config');
const merge = require('webpack-merge');
let findToFilePath = pathname => {
    return path.resolve(__dirname, pathname);
};

module.exports = merge(config, {
    mode: 'production',
    devtool: false,
    output: {
        path: findToFilePath('../dist/backstage'),
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[contenthash:8].chunk.js',
        publicPath: '/backstage/'
    },
    stats: {
        assets: true,
        builtAt: false,
        modules: false,
        entrypoints: false
    }
});
