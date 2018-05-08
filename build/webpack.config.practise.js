const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')


const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env':{
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({    // 生成一个用于挂载vue实例的页面
    template: path.join(__dirname, './template.html')
  })
]

const devServer ={
  port:'8080',
  host:'0.0.0.0',      // 方便用localhost来访问 推荐全写零
  overlay:{
    errors:true
  },
  hot:true    // 即组件更改只需重新渲染组件对应部分，不会整个页面刷新
}
let config
// 开发环境
config = merge(baseConfig,{
  entry: path.join(__dirname,'../practise/index.js'),
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
  // resolve 中 alias 即：import Vue from 'vue' 只能这里小写的vue究竟是那个版本，有runtime和不带runtime的版本
  resolve:{
    alias:{
      'vue': path.join(__dirname,'../node_modules/vue/dist/vue.js')
      // 不写上面这一行，默认的那个版本的vue不支持<template>
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
})
module.exports=config
