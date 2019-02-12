export default {
    namespaced : true,
    state:() => {
        return {message:'empty'};
    },
    actions:{
        changeMessage:({commit},message) => {
            return commit('inc',message);
        }
    },
    mutations:{
        changeMessage: (state,message) => {
            state.message = message;
        }
    }
};