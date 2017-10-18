<style></style>
<template>
    <div id="app">
        <custom-nav></custom-nav>
        <router-view></router-view>
    </div>
</template>
<script>
    import Nav from './components/nav';
    export default {
        components:{
            'custom-nav':Nav
        }
    };
</script>