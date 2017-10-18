<style>
</style>
<template>
    <div class=cart>
        <h2>Your Cart</h2>
        <p v-if="!products.length">Your cart is empty.</p>
        <div v-else>
            <ul>
                <li v-for="p in products">
                    Name:{{p.title}}, Price:{{p.price}}, Quantity:{{p.quantity}}
                </li>
            </ul>
            <p>Total:$ {{total}}</p>
            <p>
                <button :disabled="!products.length" @click="checkout(products)">
                    Checkout
                </button>
            </p>
        </div>
        <p v-show="checkoutStatus">Checkout {{checkoutStatus}}.</p>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default{
        computed:{
            ...mapGetters({
                products:'cartProducts',
                checkoutStatus:'checkoutStatus'
            }),
            total(){
                return this.products.reduce(
                    (total,p) => total + p.price * p.quantity,
                    0
                ).toFixed(2);
            }
        },
        methods:{
            checkout(products){
                this.$store.dispatch('checkout',products);
            }
        }
    };
</script>