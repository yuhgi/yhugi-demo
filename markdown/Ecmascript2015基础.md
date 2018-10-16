# Ecmascript2015基础

- [Ecmascript2015基础](#ecmascript2015%E5%9F%BA%E7%A1%80)

    - [0.Ecmascript简介](#0ecmascript%E7%AE%80%E4%BB%8B)
    - [1.作用域](#1%E4%BD%9C%E7%94%A8%E5%9F%9F)
        - [全局作用域](#%E5%85%A8%E5%B1%80%E4%BD%9C%E7%94%A8%E5%9F%9F)
        - [函数作用域](#%E5%87%BD%E6%95%B0%E4%BD%9C%E7%94%A8%E5%9F%9F)
        - [块级作用域](#%E5%9D%97%E7%BA%A7%E4%BD%9C%E7%94%A8%E5%9F%9F)
        - [let和const](#let%E5%92%8Cconst)
    - [2.解构赋值](#2%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
    - [3.字符串扩展](#3%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%89%A9%E5%B1%95)
    - [4.数值扩展](#4%E6%95%B0%E5%80%BC%E6%89%A9%E5%B1%95)
    - [5.函数的扩展](#5%E5%87%BD%E6%95%B0%E7%9A%84%E6%89%A9%E5%B1%95)
    - [6.数组的扩展](#6%E6%95%B0%E7%BB%84%E7%9A%84%E6%89%A9%E5%B1%95)
    - [7.对象的扩展](#7%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%89%A9%E5%B1%95)
    - [8.Symbol](#8symbol)
    - [9.Set和Map数据结构](#9set%E5%92%8Cmap%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
    - [10.Promise](#10promise)
    - [11.generator函数](#11generator%E5%87%BD%E6%95%B0)
    - [12.async和await](#12async%E5%92%8Cawait)
    - [13.Class](#13class)
    - [14.模块](#14%E6%A8%A1%E5%9D%97)

## 0.Ecmascript简介

Javascript是Ecmascript的一种实现。

历史：

- Ecmascript 1.0 - 1997年
- Ecmascript 2.0 - 1998年
- Ecmascript 3.0 - 1999年
- Ecmascript 5.0 - 2009年
- Ecmascript 5.1 - 2011年
- Ecmascript 6 - 2015年
- Ecmascript 7 - 2016年
- Ecmascript 8 - 2017年

## 1.作用域

### 全局作用域

```javascript
var  a = 1;
window.b = 2;
```

### 函数作用域

```javascript
function fun(){
    var a =1;
}
```

### 块级作用域

```javascript
for(let i=0;i<10;i++){
    console.log(i);
}
```

### let和const

```javascript
let a = 1;
const TYPE = 'normal';
```

## 2.解构赋值

- 数组

```javascript
let [a,b,c] = [1,2,3];
```

- 对象

```javascript
let {a,b,c} = {a:1,b:2,c:3,d:4};
let {type,disabled} = this.$props;
let {page1:{interface1 as queryList}} = api; // 变量重命名
// api = {
//    page1:{
//        interface1(){}
//    }
//}
```

- 字符串

```javascript
let [a,b,c] = 'hello';
```

## 3.字符串扩展

- includes()

```javascript
let s = 'hello world'
s.includes('hello'); // true
```

- startsWith(),endsWith()

```javascript
let s = 'hello world'
s.startsWith('hello'); // true
s.endsWith('hello'); // false
```

- repeat()

```javascript
's'.repeat(5); // 'sssss'
'hello'.repeat(2); // 'hellohello'
```

- padStart(),padEnd()

```javascript
'1'.padStart(5,'0'); // '00001'
'1'.padEnd(5,'0'); // '10000'
```

- 模板字符串

```javascript
const name = 'mary';
const greeting = `hello,${name}`; // 'hello,mary'
```

## 4.数值扩展

- Number.isNaN()

```javascript
Number.isNaN(NaN); // true
```

- Number.isFinite()

```javascript
Number.isFinite(15); // true
Number.isFinite(Infinity); // false
```

- Number.parseInt,Number.parseFloat()

```javascript
Number.parseInt('21.33'); // 21
Number.parseFloat('12.3'); // 12.3
```

- Number.isInteger() // 是否是整数

```javascript
Number.isInteger(15); // true
Number.isInteger(12.44); // false
```

- Math.trunc() // 去除小数部分

```javascript
Math.trunc(1.2); // 1
```

## 5.函数的扩展

- 函数参数默认值

```javascript
function fun(a=1,b=2){
}
```

- rest参数

```javascript
function add(...values){
} // 替代arguments
```

- 箭头函数

```javascript
let f = () => {};
```

## 6.数组的扩展

- 扩展运算符

```javascript
console.log(...[1,2,3]); // 1 2 3
let a = [1,2,3];
let b = [...a]; // 克隆数组
let [first,...rest] = a; // first=1 rest=[2,3]
```

- Array.from()

```javascript
Array.form(document.querySelectorAll('div')); // 将类数组（有length属性和数字key）转换为数组
const arr = [1,2,3,1];
Array.from(new Set(arr)); // 将可遍历对象转换为数组
```

- Array.of()

```javascript
Array.of(1,2,3); // [1,2,3]
```

- find()和findIndex()

```javascript
const arr=[12,34,43,2];

arr.find((value,index,arr) => { // 查找第一个返回true的成员
    return value > 12;
}); // 34
arr.findIndex((value,index,arr) => { // 查找第一个返回true的成员的index
    return value > 12;
}); // 1
```

- fill()

```javascript
new Array(3).fill(7); // [7,7,7]
```

- includes()

```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
```

- flat() // 拉平

```javascript
[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
```

## 7.对象的扩展

- 属性的简洁表示

```javascript
const a = 'hello';
const b = 'world';
const obj = {
    a,
    b,
    c:';'
};
const obj1 = {
    fun(){
        //
    },
    fun1:() => {
        //
    }
}
```

- 属性名表达书

```javascript
let a = 'type';
let obj={};
obj[a] = 'normal';

let obj1 = {
    [a]:'normal'
};
```

- Object.is()

```javascript
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

- Object.assign()

```javascript
const target = { a: 1, b: 1 };

const source1 = { b: 2, c: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

- Object.keys(),Object.values(),Object.entries()

```javascript
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj); // ["foo", "baz"]
Object.values(obj); // ["bar", 42]
Object.entries(obj); // [ ["foo", "bar"], ["baz", 42] ]
```

- 扩展运算符

```javascript
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }

let obj= {b:1,c:2};
let c = {...obj}; // 浅克隆一个对象
```

## 8.Symbol

- 第六种基本类型

```javascript
let s = Symbol();

typeof s
// "symbol"
```

- 作为私有属性名

```javascript
const fun = Symbol();
// for...in,for...of都无法遍历Symbol属性
const pubObj = {
    show(){
        //
    },
    _calc(){
        //
    },
    [fun](){
        //
    }
}
```

## 9.Set和Map数据结构

- Set

```javascript
// 例二
const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5
```

- Map

```javascript
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"
```

## 10.Promise

```javascript
const promise = new Promise(function(resolve, reject) {
    // pending
    settimeout(() => {
        if(Math.random() > 0.5){
            // fulfilled
            resolve({
                status:200
            });
        }else {
            // rejected
            reject({
                status:500,
                errorMsg:'server error'
            });
        }
    },1000)
});

promise.then(result => {
    // {status:200}
},error => {
    // {status:500,errorMsg:'server error'}
});

promise.then(result => {
    //
}).catch(error){
    //
}
```

## 11.generator函数

- 基本概念

```javascript
function* greeting(){
    yield 'hello';
    yield 'world';
    return '!';
}
let g = greeting();

g.next()
// { value: 'hello', done: false }

g.next()
// { value: 'world', done: false }

g.next()
// { value: '!', done: true }

g.next()
// { value: undefined, done: true }
```

- 异步函数

```javascript
function read(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('hello');
        },1000);
    });
}

function * ge(){
    const result = yield read();
}

const g = ge();
const p = g.next().value; // promise
p.then((result) => {
    g.next(result); // result: 'hello'
});
```

## 12.async和await

- 基本概念

```javascript
function read(){
    return Promise((resolve) => {
        setTimeout(() => {
            resolve('hello');
        },1000);
    })
}

async function a(){
    const prefix = await read(); // 'hello'
    const name = await 'world'; // 强制转化为promise
    return `${prefix} ${name}!`;
}

const p = a();
p.then((result) => {
    // hello world!
}).catch(error){
    //
}
```

- 错误处理

```javascript
function read(){
    return Promise((resolve) => {
        setTimeout(() => {
            reject({
                status:500,
                errorMsg:'server error'
            });
        },1000);
    })
}

async function a(){
    const prefix = await read(); // read()后停止执行
    const name = await 'world'; // 强制转化为promise
    return `${prefix} ${name}!`;
}

a().then(() => {

}).catch(error){
    //   {status:500,errorMsg:'server error'}
}
```

## 13.Class

- 基本用法

```javascript
class Person{
    constructor(name,age){ // 构造函数
        this.name = name;
        this.age = age;
    }
    static sayHello(){ // 静态方法
        console.log('hello world');
    }
    static info = 'hello world'; // 静态属性
    greeting(){ // 实例方法
        console.log(`${this.name}`);
    }
    sex = 'male';
    setSex = (sex) => {
        this.sex = sex;
    }
}

const p = new Person();
Person.sayHello();
Person.info;
p.greeting();
p.setSex('female');
```

- 继承

```javascript
class Male extends Person{
    constructor(name,age){
        super(name,age);
        this.sex='male';
    }
    shave(){
        // ......
    }
}
```

## 14.模块

Javascript模块化之路 - CMD,AMD,CommonJS和ES6 Module
CommonJS - NodeJS模块规范

- 模块导出

```javascript
// a.js
export const a = 1;
export function hello(){
    //
}
const b = 2, c = 3;
const d = function(){};
export { // 注意:这并不是对象
    b,
    c,
    d
}
```

- 模块导入

```javascript
import {a,b,c,d,hello} from './a';
import * as obj from './a.js';
```

- 默认导出

```javascript
// a.js
class Person{
    //
}
export default Person;

// b.js
import Person from './a';
import P from './a';
```

- 动态加载

```javascript
import ModuleA from './moduleA';
const ModuleA = import('./muduleA');// vue支持异步组件
```
