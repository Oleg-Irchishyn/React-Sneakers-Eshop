import { sneakersAPI } from "../../api/api";

const ADD_SNEAKERS_TO_CART = 'sneakers/cart/ADD_SNEAKERS_TO_CART';
const CLEAR_CART = 'sneakers/cart/CLEAR_CART';
const REMOVE_CART_ITEM = 'sneakers/cart/REMOVE_CART_ITEM';
const PLUS_CART_ITEM = 'sneakers/cart/PLUS_CART_ITEM';
const MINUS_CART_ITEM = 'sneakers/cart/MINUS_CART_ITEM';


let initialState = {
    items: JSON.parse(localStorage.getItem('sneakersCartItems')) || {},
    totalPrice: JSON.parse(localStorage.getItem('sneakersCartItemsTotalPrice')) || 0,
    totalCount: JSON.parse(localStorage.getItem('sneakersCartItemsTotalCount')) || 0
}

const getTotalPrice = arr => {
    return arr.reduce((totalSum, obj) => obj.price + totalSum, 0)
}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_SNEAKERS_TO_CART: {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems)
                }
            };
            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0);

            return {
                ...state,
                items: newItems,
                totalCount: totalCount,
                totalPrice: totalPrice
            };
        }
        case CLEAR_CART:
            return {
                items: {},
                totalPrice: 0,
                totalCount: 0
            }
        case REMOVE_CART_ITEM: {
            const newCartItems = {
                ...state.items
            }
            const currentTotalPrice = newCartItems[action.payload].totalPrice;
            const currentTotalCount = newCartItems[action.payload].items.length;
            delete newCartItems[action.payload]
            return {
                ...state,
                items: newCartItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount
            }
        }
        case PLUS_CART_ITEM: {
            const newPlusCartItems = [
                ...state.items[action.payload].items,
                state.items[action.payload].items[0]
            ]

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newPlusCartItems,
                    totalPrice: getTotalPrice(newPlusCartItems)
                }
            };

            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0);
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload]: {
                        items: newPlusCartItems,
                        totalPrice: getTotalPrice(newPlusCartItems)
                    }
                },
                totalCount,
                totalPrice
            }
        }
        case MINUS_CART_ITEM: {
            const oldMinusItems = state.items[action.payload].items;
            const newMinusCartItems = oldMinusItems.length > 1 ? state.items[action.payload].items.slice(1) : oldMinusItems;

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newMinusCartItems,
                    totalPrice: getTotalPrice(newMinusCartItems)
                }
            };

            const totalCount = Object.keys(newItems).reduce((sum, key) => newItems[key].items.length + sum, 0);
            const totalPrice = Object.keys(newItems).reduce((sum, key) => newItems[key].totalPrice + sum, 0);

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice
            }
        }
        default:
            return state;
    }
}

export const actions = {
    addSneakersToCart: (object) => ({
        type: ADD_SNEAKERS_TO_CART,
        payload: object
    }),
    clearCart: () => ({
        type: CLEAR_CART
    }),

    removeCartItem: (id) => ({
        type: REMOVE_CART_ITEM,
        payload: id
    }),

    plusCartItem: (id) => ({
        type: PLUS_CART_ITEM,
        payload: id
    }),

    minusCartItem: (id) => ({
        type: MINUS_CART_ITEM,
        payload: id
    })

}

export const setOrderSuccess = (items, totalPrice, totalCount) => async () => {
    await sneakersAPI.setOrderItems((items
    ));
    await sneakersAPI.setOrderTotalPrice((totalPrice
    ));
    await sneakersAPI.setOrderTotalCount((totalCount
    ));
};

export default cartReducer;
