const webpack = require('webpack');
const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');
const ip = 'localhost';
const port = process.env.port || 3001;

// 修改entry
WebpackConfig.entry.bll.unshift('webpack-hot-middleware/client');

const app = express();
const compression = require('compression');
const compiler = webpack(WebpackConfig);
const startMock = require('./mock/index');


app.use(webpackDevMiddleware(compiler,{
    publicPath: WebpackConfig.output.publicPath,
    stats: { 
        colors: true,
        chunks:false
    }
}));
app.use(webpackHotMiddleware(compiler,{
    log:false
}));

app.use(compression());

app.use(express.static(__dirname+'/__build__/',{
    etag:true,
    index:'index.html',
    lastModified:true,
    maxAge:2592000 * 1000 // 30, 86400秒 = 1天
}));


startMock(app);

app.listen(port, ip, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log(`Server is listening on http://${ip}:${port}, Ctrl+C to stop`);
});