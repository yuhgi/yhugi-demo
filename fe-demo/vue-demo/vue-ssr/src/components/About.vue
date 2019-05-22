<template>
    <div>
        <div>{{message}}</div>
        <about-detail></about-detail>
    </div>
</template>

<script>
import aboutStoreModule from '../store/modules/about';
import AboutDetail from './AboutDetail';
export default {
    asyncData({store,route}){
        console.log('about-prefetch')
        store.registerModule('about',aboutStoreModule);
        return store.dispatch('about/changeMessage','你好修改版');
    },
    components:{
        'about-detail':AboutDetail
    },
    destroyed(){
        this.$store.unregisterModule('about');
    },
    computed:{
        message(){
            return this.$store.state.about.message;
        }
    }
};
</script>
