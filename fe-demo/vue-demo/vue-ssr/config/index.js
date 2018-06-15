const path = require('path');

module.exports = {
    devServerPort:3000,
    mockServerPort:3001,
    publicPath:path.join(__dirname,'../public'),
    distPath:path.join(__dirname,'../dist')
}