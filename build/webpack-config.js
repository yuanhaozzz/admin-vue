const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 拷贝文件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// html模板 资源打包后自动注入
let HtmlWebpackPlugin = require('html-webpack-plugin');
// css 按需加载
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清除dist文件
let { CleanWebpackPlugin } = require('clean-webpack-plugin');

let findToFilePath = pathname => {
    return path.resolve(__dirname, pathname);
};

let isDev = process.env.NODE_ENV === 'development';

module.exports = {
    target: 'web',
    entry: {
        app: [findToFilePath('../src/entry-client.js')]
    },
    resolve: {
        alias: {
            '@': findToFilePath('../src')
        },
        extensions: ['.js', '.vue', '.less']
    },
    externals: {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'element-ui': 'ELEMENT',
        'axios': 'axios',
        'qs': 'qs'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minChunks: 2,
            minSize: 3000,
            name: true,
            cacheGroups: {
                vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
                },
                default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // hotReload: false // 关闭热重载
                }
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: [findToFilePath('../src')],
                use:['babel-loader?cacheDirectory=true'],

            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                            reloadAll: true
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: () => {
                                if (isDev) {
                                    return '[name].[ext]';
                                }
                                return '[name]_[hash:8].[ext]';
                            },
                            outputPath: 'images/',
                            limit: 10000
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        // 提供全局变量，这样不需要每次导入   import React from 'react'   等等！
        new webpack.ProvidePlugin({}),
        new HtmlWebpackPlugin({
            title: 'vue-ssr',
            template: findToFilePath('../public/template.html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
            chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[contenthash:8].css',
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, findToFilePath('../public')),
                to: findToFilePath('../dist/backstage/public'),
                ignore: ['.*']
            }
        ]),
    ]
};
