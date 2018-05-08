const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')

const isDev = process.env.NODE_ENV==='development'

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env':{
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin({
      template: path.join(__dirname,'./template.html')
    })
]

const devServer ={
    port:'8888',
    host:'0.0.0.0',      // 方便用localhost来访问 推荐全写零
    overlay:{
        errors:true
    },
    historyApiFallback: {
      index: '/index.html'
    },
    hot:true    // 即组件更改只需重新渲染组件对应部分，不会整个页面刷新
}
let config
if(isDev){
    // 开发环境
    config = merge(baseConfig,{
        devtool: '#cheap-module-eval-source-map',
        module:{
            rules:[
                {
                    test:/\.styl$/,
                    use:[
                        'vue-style-loader',
                        'css-loader',
                        {
                            loader:'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        'stylus-loader'
                    ]
                }
            ]
        },
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    })
}else{
    // 正式环境
    config=merge(baseConfig,{
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ["vue"]
        },
        output:{
            filename:'[name].[chunkhash:8].js'
        },
        module:{
            rules:[
                {
                    test:/\.styl$/,
                    use:ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use:[
                            'css-loader',
                            {
                                loader:'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}
module.exports=config
