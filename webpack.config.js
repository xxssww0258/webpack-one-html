const fs = require('fs')
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const WebpackChain = require('webpack-chain');
const webpackChain = new WebpackChain();
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {argv} = require('yargs') // 获取参数库
const config = require('./config'); // 配置文件

// 参数校验
const projectName = argv.project;
const mode = argv.mode;
// console.log("argv", argv)
const mainDir = path.resolve(__dirname,'./projects')
const hasProject = fs.readdirSync(mainDir).includes(projectName)
if(!hasProject && projectName !== 'all'){
    console.log('请输入项目名!\n')
    console.log('  E.g. \n')
    console.log('  yarn run build --project=[projectName] \n')
    process.exit(1)
}

webpackChain.mode( config.mode || mode )
if(config.devtool !== undefined){
    webpackChain.devtool(config.devtool);
}

// ---------------------------------------- common ----------------------------------------
webpackChain
    // .entry('index')
    //     .add(path.resolve(__dirname,'src/main.js'))
    // .end()
    .output
        // .path(path.resolve(__dirname,'dist'))
        .publicPath(config.publicPath)
        .filename('[name].[hash:6].js')
        .end()

// 要拆开写的
webpackChain.module
    .rule('vueRule')
        .test(/\.vue$/)
            // .include
            //     .add(path.resolve(__dirname,'projects'))
            //     .add(path.resolve(__dirname,'src'))
            //     .end()
            .use('vue-loader')
                .loader('vue-loader')
                .end()

webpackChain.module
    .rule('reactRule')
        .test(/\.jsx$/i)
            // .include
            //     .add(path.resolve(__dirname,'projects'))
            //     .add(path.resolve(__dirname,'src'))
            //     .end()
            .use('react-babel-loader')
                .loader('babel-loader')
                .end()
            

webpackChain.module
    .rule('cssRule')
        .test(/\.s?css$/i)
            // .include
            //     .add(path.resolve(__dirname,'projects'))
            //     .add(path.resolve(__dirname,'src'))
            //     .end()
            .use('vue-style-loader')
                .loader('vue-style-loader')
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
    .rule('lessRule')
        .test(/\.less$/i)
            // .include
            //     .add(path.resolve(__dirname,'projects'))
            //     .add(path.resolve(__dirname,'src'))
            //     .end()
            .use('vue-style-loader')
                .loader('vue-style-loader')
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
            .use('less-loader')
                .loader('less-loader')
                .end()

webpackChain.module
    .rule('jsRule')
        .test(/\.js$/i)
            // .include
            //     .add(path.resolve(__dirname,'projects'))
            //     .add(path.resolve(__dirname,'src'))
            //     .end()
            .use('babel')
                .loader('babel-loader')
                .end()

webpackChain.module
    .rule('imgRule')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/i)
            // .include
            //     .add(path.resolve(__dirname,'projects'))
            //     .add(path.resolve(__dirname,'src'))
            //     .end()
            .exclude
                .add(path.resolve(__dirname,'src/icons'))
                .end()
            .use('file')
                .loader('url-loader')
                .options({
                    esModule: false
                })
                .end()
                
webpackChain.module
    .rule('svgRule')
        .test(/\.svg$/)
            .include.add(path.resolve(__dirname,'src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId:'icon-[name]'
            })
            .end()


webpackChain // 也可以创建一个具名的插件!
    .plugin('CleanWebpackPlugin')
        .use(new CleanWebpackPlugin())
        .end()
    .plugin('VueLoaderPlugin')
        .use(new VueLoaderPlugin())
        .end()



webpackChain.resolve
    .extensions
        .add('.js')
        .add('.jsx')
        .add('.vue')
        .add('.less')
        .add('.scss')

// ---------------------------------------- webpack-dev-server ----------------------------------------
if(argv['$0'].includes('webpack-dev-server')){
    // 服务器
    webpackChain
        .devServer
            .port(config.server.port)
            .publicPath('/')
            .hot(true)
            .inline(true)
            .open(config.server.open)
            .proxy(config.server.proxy)
    // 移除不需要的插件
    webpackChain.plugins.delete('CleanWebpackPlugin')
    webpackChain.plugins.delete('ScriptExtHtmlWebpackPlugin')
    // 移除不需要的功能快速打包
    webpackChain.module
        .rule('imgRule')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/i)
                // .include
                //     .add(path.resolve(__dirname,'projects'))
                //     .end()
                .use('file')
                    .loader('file-loader') // 移除url-loader 避免打包base64

}
                

// 打包所有项目
if(projectName == 'all'){
    multipleMain()
}else{
    singleMain(projectName)
}

// console.log(JSON.stringify(webpackChain.toConfig(),null,'    '))
// console.log(JSON.stringify(webpackChain.module.toConfig()),null,'    ')

module.exports = webpackChain.toConfig();


// ---------------------------------------- function ----------------------------------------
function singleMain(projectName){
    let projectPath = path.join(mainDir,projectName)
    let main = path.join(mainDir,projectName,'main.js')
    if(!fs.existsSync(main)){
        throw Error('缺少入口文件')
    }
    
    webpackChain
        .entry(projectName)
        .add(main)
        
    webpackChain
        .output
        .path(path.resolve(__dirname,'dist',projectName))

    // icons独立化
    webpackChain.module
        .rule('svgRule')
            .include.add(path.join(projectPath,'icons'))
    webpackChain.module
        .rule('imgRule')
            .exclude.add(path.join(projectPath,'icons'))

    webpackChain.plugin('HtmlWebpackPlugin')
        // 制造html
        .use(new HtmlWebpackPlugin({
            template:path.join(projectPath,'index.html'),
            // filename:projectName+'.html',
            filename:'index.html',
            // favicon:path.join(projectPath,'favicon.ico'),
            // templateParameters:{},
            chunks:[projectName],
            minify:{ 
                collapseWhitespace: true, // 压缩成一行
                removeComments: true,// 删除html注释
            }
        }))

    webpackChain.plugin('ScriptExtHtmlWebpackPlugin')
        .use(new ScriptExtHtmlWebpackPlugin({
            inline:[projectName]
        }))
}

function multipleMain(){
    const projectArr = fs.readdirSync(mainDir)
    if(projectArr&&projectArr.length>0){
        projectArr.map(project=>{
            let projectPath = path.join(mainDir,project)
            let main = path.join(mainDir,project,'main.js')
            if(!fs.existsSync(main)){
                throw Error('缺少入口文件')
            }
            webpackChain.entry(project)
                .add(main)
                .end()
                .output
                    .path(path.resolve(__dirname,'dist','all'))

        // icons独立化
        webpackChain.module
            .rule('svgRule')
                .include.add(path.join(projectPath,'icons'))
        webpackChain.module
            .rule('imgRule')
                .exclude.add(path.join(projectPath,'icons'))
    
            webpackChain.plugin(project+'_HtmlWebpackPlugin')
                // 制造html
                .use(new HtmlWebpackPlugin({
                    template:path.join(projectPath,'index.html'),
                    filename:project+'.html',
                    // favicon:path.join(projectPath,'favicon.ico'),
                    // templateParameters:{},
                    chunks:[project],
                    minify:{ 
                        collapseWhitespace: true, // 压缩成一行
                        removeComments: true,// 删除html注释
                    }
                }))
            // 不支持多页面
            // webpackChain.plugin('_ScriptExtHtmlWebpackPlugin')
            //     .use(new ScriptExtHtmlWebpackPlugin({
            //         inline:['demo1','demo2']
            //     }))
            
        })
    }
}