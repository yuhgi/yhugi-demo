import shop from 'api/shop';
import * as types from '../mutation-types';

const state = {
    added:[], // 购物车中的商品
    checkoutStatus:null // 结账状态
};

const getters = {
    checkoutStatus:(state) => state.checkoutStatus
};

const actions = {
    checkout({commit,state}, products){
        const savedCartItems = [...state.added];
        commit(types.CHECKOUT_REQUEST);
        shop.buyProducts(products)
            .then(() => {
                commit(types.CHECKOUT_SUCCESS);
            })
            .catch(() => {
                commit(types.CHECKOUT_FAILURE, { savedCartItems });
            });
    }
};

const mutations = {
    [types.ADD_TO_CART](state,{id}){
        const record = state.added.find(p => {
            return p.id === id;
        });
        if(record){
            record.quantity++;
        }else{
            state.added.push({
                id,
                quantity:1
            });
        }
        state.checkoutStatus = null;
    },
    [types.CHECKOUT_REQUEST](state){
        state.added = [];
        state.checkoutStatus = null;
    },
    [types.CHECKOUT_SUCCESS](state){
        state.checkoutStatus = 'success';
    },
    [types.CHECKOUT_FAILURE](state,{savedCartItems}){
        state.added = savedCartItems;
        state.checkoutStatus = 'falied';
    }
};

export default{
    state,
    getters,
    actions,
    mutations
};