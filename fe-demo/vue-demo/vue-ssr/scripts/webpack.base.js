const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const config = require('../config');

const vueLoaderPlugin = new VueLoaderPlugin();
const extractCssPlugin = new ExtractTextPlugin({
    filename:'common.[chunkhash].css'
});

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    devtool:isProd ? false:'source-map',
    output:{
        path:config.distPath,
        publicPath:'/dist',
        filename:'[name].[chunkhash].js'
    },
    resolve:{
        extensions: ['.js', '.vue', '.json', '.css', '.less'],
        alias:{
            'public':config.publicPath
        }
    },
    module:{
        rules:[
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(gif|jpg|png|woff|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    }
};
