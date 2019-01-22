'use strict'
// Template version: 1.2.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

const buildDir = 'klk'; //文件名klk，或者all所有的 h5端

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //匹配代理的url
      '/api': {
        // 目标服务器地址
        // target: 'http://klk2018.com/',
        // target:'http://tg.7900005.com/', 
        target:buildDir == 'hqyl'?'http://9997876.com/':
              buildDir == 'klk'?'http://klk2018.com/':
              buildDir == 'hsyl'?'http://acw3311.com':
              buildDir == '500'?'http://h500.7873000.com':
              'http://tg.7900005.com/', 
        //路径重写
        // pathRewrite: { '^/api': '/api' },
        changeOrigin: true
    }
    },

    // Various Dev Server settings
    host: '0.0.0.0',  
    // can be overwritten by process.env.HOST
    // host: 'localhost', // can be overwritten by process.env.HOST
    port: 888, // can be overwritten by process.env.HOST, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },
  
  build: {
        // Template for index.html
        // index: path.resolve(__dirname, '../dist/index.html'),
        index: path.resolve(__dirname, '../web/dist/m/index.html'),
        
        // Paths
        // assetsRoot: path.resolve(__dirname, '../dist'),
        assetsRoot: path.resolve(__dirname, '../web/dist/m'),
    // // Template for index.html
    // index: path.resolve(__dirname, '../dist/index.html'),

    // // Paths
    // assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/m/',
    buildDir:buildDir,//文件名klk，或者all所有的
    //assetsPublicPath: '../',//每个页面都要相对位置


    /**
     * Source Maps
     */

    // productionSourceMap: true,
    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',
    
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
