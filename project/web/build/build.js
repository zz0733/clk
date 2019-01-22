'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

require('shelljs/global') 
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)  //等于../dist/static
//移除
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    replacePath(path.join(assetsPath,'../')) //等于../dist/static/../  == /dist/
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})


const fs = require('fs');
function replacePath(folder){//folder == /dist/
  let files = fs.readdirSync(folder);//files== klk,static,style.css,style.css.map
  for (let f of files) {
    if('static' == f){
      continue;//如果是static返回
    }
    let p = path.join(folder, f);//p=  /dist/static  /dist/klk  /dist/style.css 
    let stat = fs.statSync(p);//返回文件方法返回一个stat数组对象，包含以下信息
    if(stat.isDirectory()){//验证是否是文件夹（如果是klk）
      if(config.build.buildDir=="all"){
      }else if(config.build.buildDir!=f){
        continue;//如果是配置文件不是则不进行打包
      }       
      cp(path.join(assetsPath,'../style.css'),p);
      cp('-R',path.join(assetsPath),p);//cp('-R','../dist/static/','/dist/klk')复制static文件到klk
    }
  }
}
