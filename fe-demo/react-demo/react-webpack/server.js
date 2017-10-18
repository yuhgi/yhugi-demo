var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var ip = "localhost";
var port = 3001;

// 将热替换js内联进去
config.entry.bll.unshift("webpack-dev-server/client?http://"+ip+":"+port);
config.entry.bll.unshift("webpack/hot/only-dev-server");

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: false,
  stats: { colors: true }
}).listen(port, ip, function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://'+ip+':' + port);
});