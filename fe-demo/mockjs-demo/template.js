const Mock = require('mockjs');

// 字符串
console.log(Mock.mock({
    'greetings|1-5':'hello!'
}));

console.log(Mock.mock({
    'greetings|3':'hello!'
}));

// 数字
console.log(Mock.mock({
    'number1|+1':1,
    'number2|1-10':2
}));
console.log(Mock.mock({
    'number1|1-100.1-10':1,
    'number2|123.1-10':1,
    'number3|123.3':1,
    'number4|123.10':1.123
}));

// 布尔值
console.log(Mock.mock({
    'done|1':true,
    'undone|1-3':true
}));

// 对象
console.log(Mock.mock({
    'obj1|3':{
        prop1:'val1',
        prop2:'val2',
        prop3:'val3',
        prop4:'val4',
        prop5:'val5',
        prop6:'val6',
        prop7:'val7'
    },
    'obj2|1-5':{
        prop1:'val1',
        prop2:'val2',
        prop3:'val3',
        prop4:'val4',
        prop5:'val5',
        prop6:'val6',
        prop7:'val7'
    }
}));

// 数组
console.log(Mock.mock({
    'list1|1':[{
        'id|+1':1,
        'name':'@first'
    }],
    'list2|+1':[{
        'id|+1':1,
        'name':'@first'
    }],
    'list3|1-3':[{
        'id|+1':1,
        'name':'@first'
    }],
    'list4|5':[{
        'id|+1':1,
        'name':'@first'
    }]
}));

// 函数
console.log(Mock.mock({
    'func':() => 'funcName'
}));

// 正则表达式
console.log(Mock.mock({
    'regexp1':/[a-z]{3}[A-Z][0-9]/,
    'regexp2':/\w\W\s\S\d\D/,
    'regexp3':/\d{5,10}/
}));

// 占位符

console.log(Mock.mock({
    name:{
        first:'@first',
        middle:'@FIRST',
        last:'@last',
        name:'@first @middle @last'
    }
}))