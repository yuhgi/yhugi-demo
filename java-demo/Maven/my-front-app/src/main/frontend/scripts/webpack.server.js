const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base');
const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development')
    }
});

const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    entry:{
        'app':path.join(__dirname,'../src/index.js')
    },
    output: {
        path: path.join(__dirname, '../dist/production'),
        filename: '[name]/bundle.js'
    },
    plugins: [
        definePlugin,
        hotModuleReplacementPlugin
    ]
});