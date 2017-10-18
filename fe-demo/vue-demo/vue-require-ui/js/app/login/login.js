define(["vue","js/utils/navigator.js"],function(Vue,navigator){
    return {
        template:'\
          <div class="login">\
              <div class="login-header">iMCPTT调度系统</div>\
              <div class="login-body">\
                  <div class="login-box">\
                      <input type="text" placeholder="账号或手机号">\
                      <br/>\
                      <input type="password" placeholder="密码">\
                      <br/>\
                      <button @click="loginClickHandler">登录</button>\
                  </div>\
              </div>\
              <div class="login-footer">\
              深圳市国创通信技术有限公司保留所有权\
              </div>\
          </div>\
        ',
        data:function(){
          return {
            message:"hello world"
          };
        },
        methods:{
            loginClickHandler:function(){
                navigator.fire("navigate", "schedule");
            }
        }
    };
});