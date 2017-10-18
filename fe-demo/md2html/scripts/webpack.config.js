
var path = require('path');
var hljs = require('highlight.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractLESSPlugin = new ExtractTextPlugin('/docs.css');
var htmlPlugin = new HtmlWebpackPlugin({
    filename:'index.html',
    template:path.join(__dirname,'../src/index.html'),
    inject:true
});

const md = require('markdown-it')({
    highlight:function(str,lang){
        debugger
        if(lang && hljs.getLanguage(lang)){
            let hlStr = '<pre class="hljs"><code>' +
                hljs.highlight(lang,str).value +
                '</code></pre>';
            return hlStr;
        }
        return '';
    }
});


module.exports = {
    entry: {
        app: path.join(__dirname, '../src/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': path.join(__dirname, '../src'),
            vue:'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.(less|css)$/,
                loader: extractLESSPlugin.extract({
                    use: ['css-loader', 'postcss-loader','less-loader'],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.md$/,
                loader: 'vue-markdown-loader',
                options: md
            }
        ]
    },
    plugins:[
        htmlPlugin,
        extractLESSPlugin
    ]
};