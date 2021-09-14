import { sneakersAPI } from "../../api/api";


let initialState = {
    cartSneakersitems: []
}



const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case '':
            return {

            };
        default:
            return state;
    }
}

export const actions = {

}

export default cartReducer;
