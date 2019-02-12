const path = require('path');

module.exports = {
    devDistPath:path.join(__dirname,'../dist/development'),
    prodDistPath:path.join(__dirname,'../dist/production'),
    javaDistPath:path.join(__dirname,'../../webapp/static/app')
};