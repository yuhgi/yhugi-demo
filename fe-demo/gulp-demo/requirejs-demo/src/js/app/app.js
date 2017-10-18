define(["vue","vue-router","js/utils/navigator.js",
    "js/app/schedule/schedule.js","js/app/login/login.js"],
    function(Vue,VueRouter,navigator,Schedule,Login){
    Vue.use(VueRouter);

    // 定义路由
    var routes = [{
        path:"/",
        component:Login
    }, {
        path:"/schedule",
        component:Schedule
    }];

    var router = new VueRouter({
        routes:routes
    });

    router.beforeEach(function(to, from, next){
        next();
    });

    // 监听页面跳转事件

    navigator.on("navigate", function(path){
        router.push({
            path:path
        });
    });

    var app = new Vue({
        router:router
    });
    app.$mount("#vue-app");
});