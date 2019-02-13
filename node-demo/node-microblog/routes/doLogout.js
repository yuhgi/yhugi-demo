module.exports = function(req,res){
    req.session.destroy((err) => {
        if(err){
            res.json({
                errCode:'200003',
                errMsg:'登出失败'
            });
        }
        res.json({
            errCode:0
        });
    });
};