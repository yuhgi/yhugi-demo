<style></style>
<template>
    <ul>
        <li v-for="p in products">
            <span>Name:{{p.title}}, Price:${{p.price}}, inventory:{{p.inventory}}</span>
            <button @click="addToCart(p)">addToCart</button>
        </li>
    </ul>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    export default {
        computed:mapGetters({
            products:'allProducts'
        }),
        methods:mapActions([
            'addToCart'
        ]),
        created(){
            this.$store.dispatch('getAllProducts');
        }
    };
</script>