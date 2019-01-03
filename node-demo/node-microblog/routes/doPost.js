const Post = require('../models/post');
module.exports = function(req,res){
    var currentUser = req.session.user;
    var post = new Post(currentUser.name,req.body.post);
    post.save()
        .then((result) => {
            res.json({
                errCode:0
            });
        })
        .catch((err) => {
            res.json({
                errCode:'300001',
                errMsg:'提交评论失败'
            });
        });
};