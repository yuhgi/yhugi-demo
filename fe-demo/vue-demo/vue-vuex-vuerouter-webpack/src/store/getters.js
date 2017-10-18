export default {
    cartProducts:(state) => {
        var products = state.cart.added.map(({id,quantity}) => {
            const product = state.products.all.find((p) => {
                return p.id === id;
            });
            return {
                title:product.title,
                price:product.price,
                quantity
            };
        });
        return products;
    },
    cartProductsCount(state,{cartProducts}){
        return cartProducts.reduce((total,p) => total + p.quantity,0);
    }
};