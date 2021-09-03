import { sneakersAPI } from "../../api/api";

const INITIALIZED_SUCCESS = 'sneakers/app/INITIALIZED_SUCCESS';
const SET_SNEAKERS_LIST = 'sneakers/app/SET_SNEAKERS_LIST';

let initialState = {
  initialized: false,
  sneakers: [],
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNEAKERS_LIST: {
      return {
        ...state,
        sneakers: action.payload,
      };
    };
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }

    default:
      return state;
  }
}

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS }),
  setSneakersList: (sneakers) =>
    ({ type: SET_SNEAKERS_LIST, payload: sneakers }),
}



export const getSneakersList = () => async (dispatch) => {
  let data = await sneakersAPI.getSneakers();
  dispatch(actions.setSneakersList(data));
};

export const initializeApp = () => (dispatch) => {
  let SneakersListPromise = dispatch(getSneakersList());
  Promise.all([SneakersListPromise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
}

export default appReducer;