const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const config = require('../config');

const vueLoaderPlugin = new VueLoaderPlugin();
const friendlyErrorPlugin = new FriendlyErrorsPlugin();
const extractCssPlugin = new ExtractTextPlugin({
    filename:'common.[chunkhash].css'
});
const uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});
const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
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
            },
            {
                test: /\.css$/,
                use: isProd ? extractCssPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        {loader:'css-loader?sourceMap'},
                        {loader:'postcss-loader?sourceMap'}
                    ],
                    publicPath:''
                }):['vue-style-loader','css-loader','postcss-loader']
            },
            {
                test: /\.less$/,
                use: isProd ? extractCssPlugin.extract({
                    fallback: 'vue-style-loader',
                    use: [
                        {loader:'css-loader?sourceMap'},
                        {loader:'postcss-loader?sourceMap'},
                        {
                            loader:'less-loader?sourceMap',
                            options:{
                                javascriptEnabled: true
                            }
                        }
                    ],
                    publicPath:''
                }) : ['vue-style-loader','css-loader','postcss-loader','less-loader']
            }
        ]
    },
    plugins:isProd ? [
        vueLoaderPlugin,
        uglifyJSPlugin,
        extractCssPlugin
    ]:[
        vueLoaderPlugin,
        friendlyErrorPlugin
    ]
};
