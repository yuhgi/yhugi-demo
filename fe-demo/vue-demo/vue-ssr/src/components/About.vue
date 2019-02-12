<template>
    <div>{{message}}</div>
</template>

<script>
import aboutStoreModule from '../store/modules/about';
export default {
    asyncData({store,route}){
        store.registerModule('about',aboutStoreModule);
        return store.dispatch('about/changeMessage');
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
