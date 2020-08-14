module.exports = {    
    // mode:'production',
    mode:'development',
    publicPath:'./',
    devtool:'source-map',
    // devtool:'cheap-module-eval-source-map',

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