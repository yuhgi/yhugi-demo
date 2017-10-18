import Vue from 'vue';

import router from './route/router';
import 'highlight.js/styles/solarized-light.css';
import App from '@/app';

const app = new Vue({
    router,
    template:'\
        <app/>\
    ',
    components:{
        app:App
    }
});
app.$mount('#vue-app');