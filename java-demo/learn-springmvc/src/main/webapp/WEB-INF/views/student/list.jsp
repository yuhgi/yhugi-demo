<%--
  Created by IntelliJ IDEA.
  User: ren
  Date: 2019/3/22
  Time: 22:45
  To change this template use File | Settings | File Templates.
--%>
<%@ page isELIgnored="false" contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>student</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script src="../static/jquery.js"></script>
</head>
<body>
<div class="students">

</div>

<script>
    $(function(){
        $.ajax("../student/list",{
            type:'POST',
            dateType:'json',
            contentType:"application/json;charset=utf-8",
            data:JSON.stringify({
                pageSize:10,
                pageIndex:1
            }),
            success:function(res){
                res.forEach(function (item,index) {
                    var $html = $('<div>姓名:'+item.name+',专业:'+item.subject+',年龄:'+item.age+'</div>');
                    $('.students').append($html);
                })
            },
            error:function(res){
                console.log(res)
            }
        })
    });
</script>
</body>
</html>
