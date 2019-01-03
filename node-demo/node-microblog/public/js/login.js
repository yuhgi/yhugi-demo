$(document).ready(function(){
    var $form = $('.login-form');
    $form.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/login',
            data:$form.serialize(),
            success:function(result){
                if(result.errCode === 0){
                    window.localStorage.setItem('username',result.data.username);
                    window.location.href = "/";
                }else{
                    alert(result.errMsg);
                }
            },
            error:function(){
                alert('服务器发生错误');
            }
        });
    });
});