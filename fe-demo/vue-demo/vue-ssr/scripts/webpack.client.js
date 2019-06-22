const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const baseConfig = require('./webpack.base');
const config = require('../config');

module.exports = merge(baseConfig,{
    entry:path.join(__dirname,'../src/entry-client.js'),
    plugins:[
        new Webpack.optimize.CommonsChunkPlugin({
            name:'manifest',
            minChunks:Infinity
        }),
        new VueSSRClientPlugin()
    ]
});
