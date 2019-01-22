'use strict'
require('./check-versions')()
// const config = require('../config')

process.env.NODE_ENV = 'production'

require('shelljs/global')
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const shell = require('shelljs');

const spinner = ora('building for production...')
spinner.start()

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)  //等于../dist/static
//移除
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err;
  webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err;
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    replacePath(path.join(assetsPath, '../')) //等于../dist/static/../  == /dist/
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})


const fs = require('fs');

// replacePath(path.join(assetsPath, '../'))

function replacePath(folder) {//folder == /dist/
  // console.log('888'+folder+'999')
  let files = fs.readdirSync(folder);//files== klk,static,style.css,style.css.map
  for (let f of files) {
    let p = path.join(folder, f);//p=  /dist/static  /dist/klk  /dist/style.css 
    let stat = fs.statSync(p);//返回文件方法返回一个stat数组对象，包含以下信息
    if ('static' !== f && stat.isDirectory()
      && (config.build.buildDir === 'all' || config.build.buildDir !== f)) {

      console.log(path.join(assetsPath, '../styleH5.css'), p)
      cp(path.join(assetsPath, '../styleH5.css'), p);
      cp('-Rf', path.join(assetsPath), p);//cp('-R','../dist/static/','/dist/klk')复制static文件到klk
    }
  }

  //继续处理文件到pc包中
  // ./hsyl_pc/dist/m/
  // console.log(555555)
  let files_two = fs.readdirSync(folder);
  for (let f_two of files_two) {
    if ('static' === f_two) {
      continue;
    }
    let p = path.join(folder, f_two);
    let stat = fs.statSync(p);
    if (stat.isDirectory()) {
      let files_three = fs.readdirSync('./web/dist/');
      for (let f_three of files_three) {
        if ('static' === f_three || 'm' === f_three || 'style.css' === f_three) {
          continue;
        }
        // console.log(files_three)
        let p_three = path.join(folder, f_three);
        shell.mkdir('-p', p_three);
        let stat_three = fs.statSync(p_three);
        if (stat_three.isDirectory()) {
          if (f_two === f_three) {
            if (!fs.readdirSync('./web/dist/' + f_three).includes('m')) {
              fs.mkdirSync('./web/dist/' + f_three + '/m');
            }
            let files_four = fs.readdirSync('./web/dist/m/' + f_three);
            for (let f_four of files_four) {
              cp('-Rf', path.join('./web/dist/m/' + f_three + '/' + f_four), './web/dist/' + f_three + '/m');
              // console.log(f_four)
            }
            // cp('-R',path.join('./web/dist/m/'+f_three),'./web/dist/'+f_three);
            // cp('-R',path.join(files_four),'./web/dist/'+f_three+'/m');
          }
        }
      }

      // cp(path.join(assetsPath,'../styleH5.css'),p);
      // cp('-R',path.join(assetsPath),p);
    }
  }
  shell.rm('-Rf', './web/dist/m')
}
