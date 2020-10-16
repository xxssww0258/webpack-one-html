const config = require('./config.js')
let postcssConfig = {
    plugins: {
        autoprefixer: {},
    },
};
if(config.isRem2Px){
    postcssConfig.plugins['postcss-pxtorem'] =  { // https://github.com/cuth/postcss-pxtorem
        rootValue: config.htmlFontSize, // 还得自己改 html的font-size
        unitPrecision: 5,// 单位精度
        propList: ['*'], // 指定哪些属性不进行转换 默认为 ['font', 'font-size', 'line-height', 'letter-spacing'],
        selectorBlackList: [],// 忽略转换正则匹配项
        replace: true,
        mediaQuery: false,
        minPixelValue: 0,
        exclude: /node_modules/i // 可以用这个过滤掉
    }
}

module.exports = postcssConfig
