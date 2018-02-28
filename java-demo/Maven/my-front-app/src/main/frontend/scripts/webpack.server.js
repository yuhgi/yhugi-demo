const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    filename:'index.html',
    template:path.join(__dirname,'../src/template/index.html'),
    inject:true
});

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
        'app':[path.join(__dirname,'../src/index.js')]
    },
    output: {
        path: path.join(__dirname, '../dist/development'),
        filename: '[name].js'
    },
    plugins: [
        definePlugin,
        hotModuleReplacementPlugin,
        htmlPlugin
    ]
});