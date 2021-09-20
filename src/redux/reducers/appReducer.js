import { sneakersAPI } from "../../api/api";

const INITIALIZED_SUCCESS = 'sneakers/app/INITIALIZED_SUCCESS';
const SET_SNEAKERS_LIST = 'sneakers/app/SET_SNEAKERS_LIST';
const SET_TOTAL_SNEAKERS_COUNT = 'sneakers/app/SET_TOTAL_SNEAKERS_COUNT';
const SET_IS_LOADED = 'sneakers/app/SET_IS_LOADED';
const SET_SEARCH_QUERY = 'sneakers/app/FILTER_SNEAKERS_LIST';

let initialState = {
  initialized: false,
  sneakers: JSON.parse(localStorage.getItem('sneakersListItems')) || [],
  totalSneakersCount: null,
  isLoading: false,
  searchQuery: '',
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    case SET_IS_LOADED: {
      return {
        ...state,
        isLoading: action.payload,
      };
    };
    case SET_SNEAKERS_LIST: {
      return {
        ...state,
        isLoading: true,
        sneakers: action.payload,
      };
    };
    case SET_TOTAL_SNEAKERS_COUNT: {
      return {
        ...state,
        isLoading: true,
        totalSneakersCount: action.payload,
      };
    };
    case SET_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: action.payload
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
  setIsLoaded: (isLoading) =>
    ({ type: SET_IS_LOADED, payload: isLoading }),
  setSearchQuery: (value) =>
    ({ type: SET_SEARCH_QUERY, payload: value }),
}

export const getSneakersList = (portionStart = 0, portionLimit = 4) => async (dispatch) => {
  let data = await sneakersAPI.getSneakers(portionStart, portionLimit);
  dispatch(actions.setSneakersList(data));
  dispatch(actions.setIsLoaded(false));
};

export const getTotalSneakersItemsCount = () => async (dispatch) => {
  let data = await sneakersAPI.getSneakersTotalCount();
  dispatch(actions.setTotalSneakersCount(data.count));
  dispatch(actions.setIsLoaded(false));
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