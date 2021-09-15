export const getCartItems = (state) => {
    return state.cart.items;
}
export const getCartItemsTotalPrice = (state) => {
    return state.cart.totalPrice;
}
export const getCartItemsTotalCount = (state) => {
    return state.cart.totalCount;
}