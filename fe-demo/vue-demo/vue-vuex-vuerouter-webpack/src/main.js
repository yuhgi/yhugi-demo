import Vue from 'vue';

// 浏览器es6环境
import 'babel-polyfill';

import router from 'route/router';
import store from 'store/store';

// 导入浏览器样式重置文件
import 'assets/reset.css';
import 'assets/common.css';
import 'assets/bootstrap/css/bootstrap.min.css';

import App from 'app/app.vue';

const app = new Vue({
    router,
    template:'\
        <app/>\
    ',
    store,
    components:{
        app:App
    }
});
app.$mount('#vue-app');
