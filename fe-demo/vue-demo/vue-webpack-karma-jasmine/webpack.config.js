const path = require('path');
module.exports = {
    devtool: 'inline-source-map',
    entry: {
        app: [__dirname + '/src/index.js']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: 'other.[id].min.js',
        publicPath: './'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            src: path.join(__dirname, 'src'),
            app: path.join(__dirname, 'src/app'),
            route: path.join(__dirname, 'src/route'),
            store: path.join(__dirname, 'src/store'),
            utils: path.join(__dirname, 'src/utils'),
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader'
            },
            exclude: /node_modules/
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use:['css-loader','less-loader'],
            exclude: /node_modules/
        }, {
            test: /\.(png|jpg|gif|woff|woff2|svg|eot|ttf)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    query: {
                        limit: 8192,
                        name: '[name].[hash:8].[ext]'
                    }
                }
            }],
            exclude: /node_modules/
        }]
    },
    plugins: [
    ]
};