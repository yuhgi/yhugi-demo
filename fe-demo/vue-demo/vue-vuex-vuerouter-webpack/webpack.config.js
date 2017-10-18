const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var webpackConfig = null;

// entry

var entry = {
    bll:[__dirname + '/src/main.js'],
    vendor:['vue','vue-router','vuex']//第三方模块
};

// resolve

var resolve = {
    extensions:['.js','.vue'],
    alias: {
        src:path.join(__dirname, 'src'),
        api:path.join(__dirname, 'src/api'),
        app:path.join(__dirname, 'src/app'),
        assets:path.join(__dirname, 'src/assets'),
        route:path.join(__dirname, 'src/route'),
        store:path.join(__dirname, 'src/store'),
        utils:path.join(__dirname, 'src/utils'),
        vue:'vue/dist/vue.js'
    }
};

// output

var outputProd = {
    path:path.join(__dirname,'dist'),
    filename:'js/[name].[chunkhash:8].min.js',
    chunkFilename:'other.[id].min.js',
    publicPath:'./'
};
var outputDev = {
    path:path.join(__dirname,'build'),
    filename:'js/[name].[chunkhash:8].js',
    chunkFilename:'other.[id].js',
    publicPath:'./'
};
var outputServer = {
    path:path.join(__dirname, '__build__'),
    filename:'js/[name].[chunkhash:8].js',
    chunkFilename:'other.[id].js'
};

// plugins

//代码压缩与混淆
var ugligyJsPlugin = new UglifyJsPlugin({
    compress:{
        warnings:false
    }
});
//提取css文件
var extractCssPlugin = new ExtractTextPlugin('css/styles.[chunkhash:8].css');
var extractCssPluginProd = new ExtractTextPlugin('css/styles.[chunkhash:8].min.css');
//提取公用组件
var commonsChunkPlugin = new CommonsChunkPlugin({
    name:'vendor',
    filename:'js/libs.[hash:8].js',
    minChunks: Infinity
});
var commonsChunkPluginProd = new CommonsChunkPlugin({
    name:'vendor',
    filename:'js/libs.[hash:8].min.js',
    minChunks: Infinity
});
//拷贝ico文件
var transferIcoWebpackPlugin = new TransferWebpackPlugin([{
    from:'src/assets/images/ico',
    to:'images/ico'
}]);
//生成HTML文件
var htmlWebpackPlugin = new HtmlWebpackPlugin({
    title:'vue全家桶',
    template:'src/index.ejs',
    minify:false,
    chunksSortMode:function(a,b){
        var orderMap = {
            'vendor':1,
            'bll':2
        };
        var aName = a.names[0];
        var bName = b.names[0];
        return orderMap[aName]&&orderMap[bName]? orderMap[aName]-orderMap[bName] : -1;
    }
});
// 清除build目录
var cleanBuildPlugin = new CleanWebpackPlugin(['build'],{
    root:path.resolve(__dirname),
    verbose:true
});
// 清除dist目录
var cleanDistPlugin = new CleanWebpackPlugin(['dist'],{
    root:path.resolve(__dirname),
    verbose:true
});
// 
var definePlugin = new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }
});

var hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

// Rules

var eslintRule = {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
};

var babelRule = {
    test: /\.js$/,
    use:{
        loader:'babel-loader'
    },
    exclude: /node_modules/
};
var vueRule = {
    test:/\.vue$/,
    loader:'vue-loader',
    exclude: /node_modules/
};
var lessRule = {
    test:/\.less$/,
    loader: extractCssPlugin.extract({
        use:[
            'css-loader?sourceMap',
            'less-loader?sourceMap'
        ],
        fallback:'style-loader',
        publicPath:'../'
    }),
    exclude: /node_modules/
};
var lessRuleProd = {
    test:/\.less$/,
    loader: extractCssPluginProd.extract({
        use:[
            'css-loader?sourceMap',
            'less-loader?sourceMap'
        ],
        fallback:'style-loader',
        publicPath:'../'
    }),
    exclude: /node_modules/
};
var cssRule = {
    test: /\.css$/,
    loader: extractCssPlugin.extract({
        use:'css-loader?sourceMap',
        fallback:'style-loader',
        publicPath:'../'
    }),
    exclude: /node_modules/
};
var cssRuleProd = {
    test: /\.css$/,
    loader: extractCssPluginProd.extract({
        use:'css-loader?sourceMap',
        fallback:'style-loader',
        publicPath:'../'
    }),
    exclude: /node_modules/
};
var urlRule = {
    test: /\.(png|jpg|gif|woff|woff2|svg|eot|ttf)$/,
    use: [{
        loader:'url-loader',
        options:{
            query: {
                limit: 8192,
                name:'images/[name].[hash:8].[ext]'
            }
        }
    }],
    exclude: /node_modules/
};

if(process.env.NODE_ENV === 'production'){
    webpackConfig={
        entry:entry,
        output:outputProd,
        resolve:resolve,
        module: {
            rules:[eslintRule,babelRule,vueRule,cssRuleProd,lessRuleProd,urlRule]
        },
        plugins:[
            ugligyJsPlugin,extractCssPluginProd,commonsChunkPluginProd,
            transferIcoWebpackPlugin,htmlWebpackPlugin,
            cleanDistPlugin,definePlugin
        ]
    };
}else if(process.env.NODE_ENV === 'develop'){
    webpackConfig={
        devtool: 'source-map',
        entry:entry,
        output:outputDev,
        resolve:resolve,
        module: {
            rules:[eslintRule,babelRule,vueRule,cssRule,lessRule,urlRule]
        },
        plugins:[
            extractCssPlugin,commonsChunkPlugin,transferIcoWebpackPlugin,
            htmlWebpackPlugin,cleanBuildPlugin,definePlugin
        ]
    };
}else{
    webpackConfig={
        devtool: 'source-map',
        entry:entry,
        output:outputServer,
        resolve:resolve,
        module: {
            rules:[babelRule,vueRule,cssRule,lessRule,urlRule]
        },
        plugins:[
            extractCssPlugin,commonsChunkPlugin,transferIcoWebpackPlugin,
            htmlWebpackPlugin,hotModuleReplacementPlugin,
            definePlugin
        ],
        watch:true
    };
}


module.exports = webpackConfig;

