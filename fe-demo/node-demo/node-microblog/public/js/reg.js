$(document).ready(function(){
    var $form = $('.reg-form');
    $form.submit(function(e){
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/reg',
            data:$form.serialize(),
            success:function(result){
                if(result.errCode === 0){
                    window.location.href = "/login";
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