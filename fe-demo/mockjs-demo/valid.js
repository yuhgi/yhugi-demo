const Mock = require('mockjs');

var template = {
    name:'@string'
};

var data = {
    name:'Mary'
};

console.log(Mock.valid(template,data));