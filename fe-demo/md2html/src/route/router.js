import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Button from '@/docs/components/button.md';
import GetStarted from '@/docs/getstarted.md';
import Tutorial from '@/docs/tutorial.md';

let Components = {template:'<router-view></router-view>'};

const router = new VueRouter({
    routes:[{
        path:'/',
        component:GetStarted
    },{
        path:'/getstarted',
        component:GetStarted
    },{
        path:'/tutorial',
        component:Tutorial
    },{
        path:'/components',
        component:Components,
        children:[{
            path:'button',
            component:Button
        }]
    }]
});

export default router;