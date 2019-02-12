const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.server');
const ip = 'localhost';
const port = 88;

// 修改entry
WebpackConfig.entry.app.unshift('webpack-hot-middleware/client');

const app = express();
const compiler = webpack(WebpackConfig);

app.use(webpackDevMiddleware(compiler,{
    publicPath: '/',
    stats: { 
        colors: true,
        chunks:false
    }
}));
app.use(webpackHotMiddleware(compiler,{
    log:false
}));

app.listen(port, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`futuredomain dev-server is listening on http://${ip}:${port}, Ctrl+C to stop`);
});