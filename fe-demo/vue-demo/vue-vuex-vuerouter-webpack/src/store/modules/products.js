import shop from 'api/shop';
import * as types from '../mutation-types';


const state = {
    all:[]
};

const getters = {
    allProducts:(state) => state.all
};

const actions = {
    getAllProducts({commit}){
        shop.getProducts()
            .then((products) => {
                commit(types.RECEIVE_PRODUCTS,{products});
            })
            .catch(() => {
                alert('fail to request products');
            });
    }
};

const mutations = {
    [types.RECEIVE_PRODUCTS](state,{products}){
        state.all = products;
    },
    [types.ADD_TO_CART](state,{id}){
        state.all.find((p) => p.id === id).inventory--;
    }
};


export default {
    state,
    actions,
    getters,
    mutations
};