const Mock = require('mockjs');
const util = require('util');
const data = Mock.mock({
    'list|1-10':[{
        'id|+1':1
    }]
});
console.log(util.inspect(data));