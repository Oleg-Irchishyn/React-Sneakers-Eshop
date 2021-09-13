import { sneakersAPI } from "../../api/api";

const INITIALIZED_SUCCESS = 'sneakers/app/INITIALIZED_SUCCESS';
const SET_SNEAKERS_LIST = 'sneakers/app/SET_SNEAKERS_LIST';
const SET_TOTAL_SNEAKERS_COUNT = 'sneakers/app/SET_TOTAL_SNEAKERS_COUNT';

let initialState = {
  initialized: false,
  sneakers: JSON.parse(localStorage.getItem('sneakersListItems')) || [],
  totalSneakersCount: null,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    case SET_SNEAKERS_LIST: {
      return {
        ...state,
        sneakers: action.payload,
      };
    };
    case SET_TOTAL_SNEAKERS_COUNT: {
      return {
        ...state,
        totalSneakersCount: action.payload,
      };
    };
    default:
      return state;
  }
}

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS }),
  setSneakersList: (sneakers) =>
    ({ type: SET_SNEAKERS_LIST, payload: sneakers }),
  setTotalSneakersCount: (totalSneakersCount) =>
    ({ type: SET_TOTAL_SNEAKERS_COUNT, payload: totalSneakersCount }),
}

export const getTotalSneakersItemsCount = () => async (dispatch) => {
  let data = await sneakersAPI.getSneakersTotalCount();
  dispatch(actions.setTotalSneakersCount(data.count));
};

export const getSneakersList = () => async (dispatch) => {
  let data = await sneakersAPI.getSneakers();
  dispatch(actions.setSneakersList(data));
};

export const loadMoreSneakers = (startCount, endCount) => async (dispatch) => {
  let data = await sneakersAPI.getSneakers(startCount, endCount);
  dispatch(actions.setSneakersList(data));
};

export const initializeApp = () => (dispatch) => {
  let promises = [
    dispatch(getTotalSneakersItemsCount()),
    dispatch(getSneakersList()),
  ]
  Promise.all([promises]).then(() => {
    dispatch(actions.initializedSuccess());
  });
}

export default appReducer;