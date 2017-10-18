const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.join(__dirname, '../src/index.html'),
    inject: true
});
const extractCssPlugin = new ExtractTextPlugin('style.css');
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [path.join(__dirname, '../src/index.js')]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.json', '.css', '.less'],
        alias: {

        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: ['react-hot-loader','babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(css)$/,
                loader: extractCssPlugin.extract({
                    use: [
                        'css-loader?sourceMap'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(gif|jpg|png|woff|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        htmlPlugin,extractCssPlugin,hotModuleReplacementPlugin
    ]
};