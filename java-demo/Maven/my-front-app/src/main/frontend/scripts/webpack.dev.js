const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseWebpackConfig = require('./webpack.base');
const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('development')
    }
});
const cleanPlugin = new CleanWebpackPlugin(['dist/production'],{
    root:path.join(__dirname,'../'),
    verbose:true
});

const menus = require('../config/menus');

/**
 * Generate html plugins according to menus, then every menu have
 * its own static resources(js,css,etc.), which make the project to be a 
 * multiple page application(MPA).
 * @param {Array} menus 
 * @return {Array}
 */
const generateHtmlPlugins = function(menus){
    if (!Array.isArray(menus)) {
        throw new Error(`${menus} is not Array.`);
    }
    const plugins = [];
    for (let menu of menus) {
        if (!menu.bundle) { continue; }

        const subMenus = menu.subMenus;
        if (subMenus && Array.isArray(subMenus)) {
            for (let subMenu of subMenus) {
                let plugin = new HtmlWebpackPlugin({
                    
                });
            }
        }
    }
    return plugins;
};
const htmlPlugins = generateHtmlPlugins(menus);

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '../dist/develop'),
        filename: '[name].js'
    },
    plugins: [
        cleanPlugin,
        definePlugin,
        ...htmlPlugins
    ]
});