import Vue from 'vue';
import VueRouter from 'vue-router';
const Home = () => import('./components/Home.vue');
const About = () => import('./components/About.vue');
const Profile = () => import('./components/Profile.vue');
const Item = () => import('./components/Item.vue');

Vue.use(VueRouter);

export function createRouter(){
    return new VueRouter({
        mode:'history',
        routes:[{
            path:'/',
            component:Home
        },{
            path:'/home',
            component:Home
        },{
            path:'/about',
            component:About
        },{
            path:'/profile',
            component:Profile
        },{
            path:'/item/:id',
            component:Item
        }]
    });
}