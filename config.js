module.exports = {
    // mode:'production',
    // mode:'development',
    publicPath:'./',
    devtool:'source-map',// 注释掉 就是 (none)
    // devtool:'cheap-module-eval-source-map',

    isRem2Px:true,// 需要手动指定 html font-size
    server:{
        // host: "0.0.0.0",
        // contentBase:'.',
        open:false,
        port:7788,
        proxy:{
            // '/api':{ 
            //     target: 'http://www.example.org',
            //     changeOrigin: true,
            //     pathRewrite: {"^/api" : ""},//重定向--现在直接localhost:8080
            // }
        }
    }
}