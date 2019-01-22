'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const portfinder = require('portfinder')
var glob = require('glob')

var htmls = glob.sync('./src/pages/**/*.html').map(function (item) {
  // console.log(htmls)
  return new HtmlWebpackPlugin({
      filename: './' + item.slice(12),
      template: item,
      inject: true,
      // chunks:[item.slice(6, -5)],
      chunks: ['manifest', 'vendor', item.slice(6, -5)],
  });
});


// new HtmlWebpackPlugin({
//   title: value.title || '这里是标题',
//   filename: value.filename,
//   template: value.template,
//   inject: true,
//   hash: true,
//   chunks: ['manifest', 'vendor', 'app', value.page],
//   minify: false,
//   chunksSortMode: 'dependency'
// })
// console.log(htmls)
// return false

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,
  
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    host: process.env.HOST || config.dev.host,
    port: process.env.PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay ? {
      warnings: false,
      errors: true,
    } : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    // 开发环境(两个地方都配置)可去掉
    // new HtmlWebpackPlugin({
    //   filename:'./live.html',
    //   template:'./src/pages/live/index.html',
    //   inject: true,
    //   chunks:['pages/live/index','vendor','manifest']
    // }), 
    
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'index',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),    


    new OpenBrowserPlugin({
      // url: `http://localhost:${config.dev.port}/`,
      url:`http://localhost:${config.dev.port}/${config.build.buildDir}/`
    })    
  ].concat(htmls)
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${config.dev.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
