import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import getters from './getters';
import * as mutations from './mutations';
import cart from './modules/cart';
import products from './modules/products';

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    mutations,
    actions,
    modules:{
        cart,
        products
    }
});