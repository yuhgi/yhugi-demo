const crypto = require('crypto');
const User = require('../models/user');
module.exports = function(req,res){
    if(req.body['password-repeat'] !== req.body['password']){
        //return res.redirect('/reg');
        return res.json({
            errCode:100001,
            errMsg:'用户密码不一致'
        });
    }
    const md5 = crypto.createHash('md5');
    const password = md5.update(req.body.password).digest('base64');
    const newUser = new User(req.body.username,password);

    User.get(newUser.name)
        .then((user) => {
            if(user){
                res.json({
                    errCode:100001,
                    errMsg:`用户名${user.name}已存在`
                });
            }
            newUser.save()
                .then(() => {
                    res.json({
                        errCode:0
                    });
                })
                .catch((err) => {
                    res.json({
                        errCode:200001,
                        errMsg:err.toString()
                    });
                });
        })
        .catch((err) => {
            res.json({
                errCode:200001,
                errMsg:err.toString()
            });
        });
};