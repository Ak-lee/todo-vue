const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config.js')

const isDev = process.env.NODE_ENV==='development'
const config= {
    target:"web",
    entry:path.join(__dirname,'../client/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'../dist')
    },
    module:{
        rules:[
            {
                test: /\.(js|jsx|vue)$/,
                loader: 'eslint-loader',
                exclude: "/node_modules/",
                enforce: "pre"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: createVueLoaderOptions(isDev)
            },
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude:/node-modules/
            },
            {
                test:/\.(gif|jpg|jpeg|png|svg)$/,
                use:[{
                    loader: "url-loader",
                    options:{
                        limit:1024,  // 可以直接把图片转换为base64插到js中。适用于几K左右的图片
                        name:'resources/[path][name]-[hash:8].[ext]'   // 使用原来本身的名字。ext 为文件后缀名
                    }
                }]
            },

        ]
    }
}

module.exports=config