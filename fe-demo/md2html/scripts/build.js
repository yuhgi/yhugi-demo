var ora = require('ora');
var chalk = require('chalk');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');


var spinner = ora({
    text:'building docs...',
    color:'green'
});
spinner.start();
webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) { 
        spinner.fail(err.toString());
        return;
    }
    
    var info = stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n';
    console.log(info);
    if(stats.hasErrors()){
        spinner.fail(chalk.white.bgGreen.bold('  Build Error.\n'));
        return;
    }
    spinner.succeed(chalk.white.bgGreen.bold('  Build complete.\n'));
});