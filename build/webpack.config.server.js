const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin = reqire('vue-server-renderer/server-plugin') // 有了这个插件，打包之后生成的不是JavaScript，而是JSON文件

let config
// 开发环境
config = merge(baseConfig,{
  target: 'node',
  entry: path.join(__dirname,'../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    fileName: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
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
  plugins:[
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})
module.exports=config
