import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 导入组件
import Cart from 'app/cart/cart.vue';
import Products from 'app/products/products.vue';

import navigator from 'utils/navigator';

// 定义路由
const routes = [{
    path:'/',
    redirect:'/products'
}, {
    path:'/cart',
    component:Cart
},{
    path:'/products',
    component:Products
}];

const router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    next();
});

// 监听页面跳转事件
navigator.$on('navigate', (path) => {
    router.push({
        path:path
    });
});

export default router;