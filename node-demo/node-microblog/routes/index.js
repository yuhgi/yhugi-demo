const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended:false});
const router = express.Router();

const doReg = require('./doReg');
const doLogin = require('./doLogin');
const doLogout = require('./doLogout');
const doPost = require('./doPost');
const Post = require('../models/post');
const User = require('../models/user');


// 首页
router.get('/', (req,res) => {
    Post.get(null)
        .then((posts) => {
            res.render('index',{
                title:'首页',
                req:req,
                nav:'index',
                posts:posts
            });
        })
        .catch(() => {
            res.render('index',{
                title:'首页',
                req:req,
                nav:'index',
                posts:[]
            });
        });
    
});

// 用户主页
router.get('/u/:user',checkLogin, (req,res) => {
    User.get(req.params.user)
        .then((user) => {
            if(!user){
                return res.redirect('/');
            }
            Post.get(user.name)
                .then((posts) => {
                    res.render('user',{
                        title:req.params.user,
                        req:req,
                        nav:'user',
                        posts:posts
                    });
                })
                .catch(() => {
                    res.redirect('/');
                });
        })
        .catch(() => {
            res.redirect('/');
        });
});

// 提交评论
router.post('/post',checkLogin,urlencodedParser,doPost);

// 注册页面
router.get('/reg',(req,res) => {
    res.render('reg',{
        title:'注册',
        req:req,
        nav:'reg'
    });
});

// 提交注册
router.post('/reg',urlencodedParser,doReg);

// 登录页面
router.get('/login',checkNotLogin,(req,res) => {
    res.render('login',{
        title:'登录',
        req:req,
        nav:'login'
    });
});

// 登录请求
router.post('/login',checkNotLogin,urlencodedParser,doLogin);

// 注销页面
router.get('/logout',checkLogin,(req,res) => {
    res.render('logout',{
        title:'登出',
        req:req,
        nav:'logout'
    });
});

// 注销请求
router.post('/logout',checkLogin,urlencodedParser,doLogout);

// 404页面
router.get('*', (req,res) => {
    res.status(404).render('404',{
        title:'404',
        req:req,
        layout:false
    });
});

function isXHR(req){
    var xhr = false;
    // 必须前端在发送ajax时，指定'X-Requested-With'头
    // 使用Accept头或者Content-Type头都不是很完善，按照前后端约定的方式来处理
    if(req.headers['X-Requested-With'] === 'XMLHttpRequest'){
        xhr = true;
    }
    return xhr;
}

// 路由中间件
function checkLogin(req,res,next){
    var xhr = isXHR(req);
    if(!req.session.user){
        if(xhr){
            return res.json({
                errCode:'200001',
                errMsg:'用户未登录'     
            });
        }
        return res.redirect('/login');
    }
    next();
}

function checkNotLogin(req,res,next){
    var xhr = isXHR(req);
    if(req.session.user){
        if(xhr){
            return res.json({
                errCode:'200003',
                errMsg:'用户已经登录'     
            });
        }
        return res.redirect('/');
    }
    next();
}

module.exports = router;