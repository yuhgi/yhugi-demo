import Vue from 'vue';
import {createApp} from './app';

const {app,router,store} = createApp();

if(window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
    router.beforeResolve((to,from,next) => {
        const matched = router.getMatchedComponents(to);
        const prevMatched = router.getMatchedComponents(from);

        let diffed = false;
        const actived = matched.filter((c,i) => {
            return diffed || (diffed = (prevMatched[i] !== c));
        });

        if(!actived.length){
            return next();
        }

        Promise.all(actived.map(c => {
            if(c.asyncData){
                return c.asyncData({
                    store,
                    route:to
                });
            }
        })).then(() => {
            // stop loading indicator
            next();
        }).catch(next);
    });

    app.$mount('#vue-app');
});

Vue.mixin({
    beforeRouteUpdate(to,from,next){
        const {asyncData} = this.$options;
        if(asyncData){
            asyncData({
                store:this.$store,
                route:to
            }).then(next).catch(next);
        }else{
            next();
        }
    }
});