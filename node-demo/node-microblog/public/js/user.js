$(document).ready(function(){
    var $form = $('.post-form');
    $form.submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/post',
            data:$form.serialize(),
            success:function(result){
                var username = null;
                if(result.errCode === 0){
                    username = window.localStorage.getItem('username');
                    window.location.href = "/u/"+username;
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