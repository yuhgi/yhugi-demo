const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const baseWebpackConfig = require('./webpack.base');
const definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
});
const uglifyJSPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});
const cleanPlugin = new CleanWebpackPlugin(['dist/production'],{
    root:path.join(__dirname,'../'),
    verbose:true
});
const config = require('../config/config');

const menus = require('../config/menus');

// generate entris according to menus
const generateEntry = function (menus) {
    if (!Array.isArray(menus)) {
        throw new Error(`${menus} is not Array.`);
    }
    const entry = {};
    for (let menu of menus) {
        if (!menu.bundle) { continue; }

        const subMenus = menu.subMenus;
        if (subMenus && Array.isArray(subMenus)) {
            for (let subMenu of subMenus) {
                if (!subMenu.bundle) { continue; }
                let key = subMenu.name;
                let value = [path.join(__dirname, `../src/app/${menu.name}/${subMenu.name}/index.js`)];
                entry[key] = value;
            }
        }
    }
    return entry;
};

const entry = generateEntry(menus);

module.exports = merge(baseWebpackConfig, {
    devtool: 'source-map',
    entry:entry,
    output: {
        path: path.join(__dirname, '../dist/production'),
        filename: '[name]/bundle.js'
    },
    plugins: [
        cleanPlugin,
        definePlugin
    ]
});