$(document).ready(function(){
    var $logoutBtn = $('.btn-logout');
    $logoutBtn.click(function(e){
        $.ajax({
            method:'post',
            url:'/logout',
            data:{
                username:window.localStorage.getItem('username')
            },
            success:function(result){
                if(result.errCode == 0){
                    window.localStorage.removeItem('username');
                    window.location.href = "/";
                }else{
                    alert(result.errMsg);
                }
            },
            error:function(result){
                alert('服务器发生错误');
            }
        });
    });
});