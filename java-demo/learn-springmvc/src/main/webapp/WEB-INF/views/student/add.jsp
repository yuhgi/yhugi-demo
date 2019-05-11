<%--
  Created by IntelliJ IDEA.
  User: ren
  Date: 2019/3/24
  Time: 11:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<form action="add" method="post" enctype="multipart/form-data">
    <p>姓名: <input type="text" name="name" /></p>
    <p>年龄: <input type="number" name="age" /></p>
    <p>专业: <input type="text" name="subject" /></p>
    <p>选择照片: <input type="file" name="image"></p>
    <input type="submit" value="Submit" />
</form>
</body>
</html>
