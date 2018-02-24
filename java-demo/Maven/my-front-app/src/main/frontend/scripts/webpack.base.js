/**
 * webpack config file
 */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extraceCssPlugin = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = {
    externals: {},
    resolve: {
        extensions: ['.js', '.json', '.less', '.css'],
        alias: {
            '@': path.join(__dirname, '../')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|less)$/,
                use: extraceCssPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader?sourceMap',
                        'postcss-loader?sourceMap',
                        'less-loader?sourceMap'
                    ]
                })
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [
        extraceCssPlugin
    ]
};