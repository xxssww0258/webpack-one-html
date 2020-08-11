const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackChain = require('webpack-chain');
const webpackChain = new WebpackChain();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

webpackChain
    .entry('index')
        .add(path.resolve(__dirname,'src/main.js'))
    .end()
    .output
        .path(path.resolve(__dirname,'dist'))
        .publicPath('./')
        .end()

// 要拆开写的
webpackChain.module
    .rule('cssRule')
        .test(/\.s?css$/i)
            .include
                .add(path.resolve(__dirname,'src'))
                .end()
            .use('style-loader')
                .loader('style-loader')
                .end()
            .use('css-loader')
                .loader('css-loader')
                .end()
            .use('postcss-loader')
                .loader('postcss-loader')
                .end()
            .use('sass-loader')
                .loader('sass-loader')
                .end()

webpackChain.module
    .rule('jsRule')
        .test(/\.jsx?$/i)
            .include
                .add(path.resolve(__dirname,'src'))
                .end()
            .use('babel')
                .loader('babel-loader')
                .end()

webpackChain.module
    .rule('imgRule')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/i)
            .include
                .add(path.resolve(__dirname,'src'))
                .end()
            .use('img')
                .loader('url-loader')
                .end()

// 要拆开写的
webpackChain // 也可以创建一个具名的插件!
    .plugin('myConfig')
        // 先删除
        .use(new CleanWebpackPlugin())
        // 制造html
        .use(new HtmlWebpackPlugin({
            template:path.resolve(__dirname,'./public/index.html'),
            favicon:path.resolve(__dirname,'./public/favicon.ico'),
            // templateParameters:{},
            minify:{ 
                collapseWhitespace: true, // 压缩成一行
                removeComments: true,// 删除html注释
            }
        }))

        
webpackChain.mode('development')

console.log(JSON.stringify(webpackChain.toConfig(),null,'    '))
        
    
module.exports = webpackChain.toConfig();