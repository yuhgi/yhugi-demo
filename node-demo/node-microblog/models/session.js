const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const settings = require('../settings');

module.exports =  new session({
    secret:settings.cookieSecret,
    resave: false, // 当有请求时自动刷新session
    saveUninitialized: false,// 自动将新创建的session存入store
    store:new MongoStore({
        url:settings.url
    }),
    cookie:{
        path:'/',
        httpOnly:true,
        secure:false,
        maxAge: 2 * 60 * 60 * 1000
    }
});