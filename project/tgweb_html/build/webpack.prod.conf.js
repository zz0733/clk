'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = require('../config/prod.env')


// const fs = require('fs');
// let files = fs.readdirSync('./src/pages/');
// console.log(files.includes('hsyl'))


const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // set the following option to `true` if you want to extract CSS from
      // codesplit chunks into this main css file as well.
      // This will result in *all* of your app's CSS being loaded upfront.
      allChunks: false,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // 打包环境
    new HtmlWebpackPlugin(
      config.build.buildDir == 'klk' || config.build.buildDir == 'all' ? {
        filename: './klk/index.html',
        template: './src/pages/klk/index.html',
        inject: true,
        chunks: ['pages/klk/index', 'vendor', 'manifest']
      } : {}
    ),
    //打包环境
    new HtmlWebpackPlugin(
      config.build.buildDir == 'hsyl' || config.build.buildDir == 'all' ? {
        filename: './hsyl/index.html',
        template: './src/pages/hsyl/index.html',
        inject: true,
        chunks: ['pages/hsyl/index', 'vendor', 'manifest']
      } : {}
    ),
    //打包环境
    new HtmlWebpackPlugin(
      config.build.buildDir == 'hqyl' || config.build.buildDir == 'all' ? {
        filename: './hqyl/index.html',
        template: './src/pages/hqyl/index.html',
        inject: true,
        chunks: ['pages/hqyl/index', 'vendor', 'manifest']
      } : {}
    ),
    new HtmlWebpackPlugin(
      config.build.buildDir == '500w' || config.build.buildDir == 'all' ? {
        filename: './500w/index.html',
        template: './src/pages/500w/index.html',
        inject: true,
        chunks: ['pages/500w/index', 'vendor', 'manifest']
      } : {}
    ),
    new HtmlWebpackPlugin(
      config.build.buildDir == 'dalao' || config.build.buildDir == 'all' ? {
        filename: './dalao/index.html',
        template: './src/pages/dalao/index.html',
        inject: true,
        chunks: ['pages/dalao/index', 'vendor', 'manifest']
      } : {}
    ),
    new HtmlWebpackPlugin(
      config.build.buildDir == 'dqr' || config.build.buildDir == 'all' ? {
        filename: './dqr/index.html',
        template: './src/pages/dqr/index.html',
        inject: true,
        chunks: ['pages/dqr/index', 'vendor', 'manifest']
      } : {}
    ),
    //测试站 地球人
    new HtmlWebpackPlugin(
      config.build.buildDir == 'test' || config.build.buildDir == 'all' ? {
        filename: './test/index.html',
        template: './src/pages/test/index.html',
        inject: true,
        chunks: ['pages/test/index', 'vendor', 'manifest']
      } : {}
    ),
    new HtmlWebpackPlugin(
      config.build.buildDir == 'qmcp' || config.build.buildDir == 'all' ? {
        filename: './qmcp/index.html',
        template: './src/pages/qmcp/index.html',
        inject: true,
        chunks: ['pages/qmcp/index', 'vendor', 'manifest']
      } : {}
    ),
    new HtmlWebpackPlugin(
      config.build.buildDir == 'ddcp' || config.build.buildDir == 'all' ? {
        filename: './ddcp/index.html',
        template: './src/pages/ddcp/index.html',
        inject: true,
        chunks: ['pages/ddcp/index', 'vendor', 'manifest']
      } : {},

    ),
    new HtmlWebpackPlugin(
      config.build.buildDir == '500wcp' || config.build.buildDir == 'all' ? {
        filename: './500wcp/index.html',
        template: './src/pages/500wcp/index.html',
        inject: true,
        chunks: ['pages/500wcp/index', 'vendor', 'manifest']
      } : {}
    ),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
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

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
