const crypto = require('crypto');
const User = require('../models/user');
module.exports = function(req,res){
    const md5 = crypto.createHash('md5');
    if(!req.body.username || !req.body.password){
        return res.json({
            errCode:'100002',
            errMsg:'请输入用户名和密码'
        });
    }
    const password = md5.update(req.body.password).digest('base64');
    User.get(req.body.username)
        .then((user) => {
            if(!user){
                return res.json({
                    errCode:'200001',
                    errMsg:`用户${req.body.username}不存在`
                });
            }
            if(user.password !== password){
                return res.json({
                    errCode:'200002',
                    errMsg:`密码错误`
                });
            }
            const loginUser = new User(req.body.username,password);
            req.session.regenerate((err) => {
                if(err){
                    return res.json({
                        errCode:'200005',
                        errMsg:`服务器错误`
                    });
                }
                req.session.user = loginUser;
                res.json({
                    errCode:0,
                    data:{
                        username:loginUser.name
                    }
                });
            });
        })
        .catch(() => {
            res.json({
                errCode:'200001',
                errMsg:`读取用户${req.body.username}信息失败`
            });
        });
};
