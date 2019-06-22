export default {
    namespaced : true,
    state:() => {
        return {message:'你好'};
    },
    actions:{
        changeMessage:({commit},message) => {
            return commit('changeMessage',message);
        }
    },
    mutations:{
        changeMessage: (state,message) => {
            state.message = message;
        }
    }
};
