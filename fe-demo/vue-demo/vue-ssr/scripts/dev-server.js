const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chokidar = require('chokidar');

const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');

const readFile = (fs,file) => {
    try{
        return fs.readFileSync(path.join(clientConfig.output.path,file),'utf-8');
    }catch(e){// }
};

module.exports = function setupDevServer(app,templatePath,cb){
    let bundle,template,clientManifest,ready;
    const readyPromise = new Promise((resolve,reject) => {
        
    })
}