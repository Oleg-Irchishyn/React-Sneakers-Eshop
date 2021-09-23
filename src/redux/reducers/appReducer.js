import { sneakersAPI } from "../../api/api";

const INITIALIZED_SUCCESS = 'sneakers/app/INITIALIZED_SUCCESS';
const SET_SNEAKERS_LIST = 'sneakers/app/SET_SNEAKERS_LIST';
const SET_TOTAL_SNEAKERS_COUNT = 'sneakers/app/SET_TOTAL_SNEAKERS_COUNT';
const SET_IS_LOADED = 'sneakers/app/SET_IS_LOADED';
const SET_SEARCH_QUERY = 'sneakers/app/FILTER_SNEAKERS_LIST';
const SET_FAVOURITES_LIST = 'sneakers/app/SET_FAVOURITES_LIST';
const SET_SLIDERS = 'sneakers/app/SET_SLIDERS'
const ADD_ITEM_TO_FAVOURITES = 'sneakers/app/ADD_ITEM_TO_FAVOURITES';
const DELETE_FAVOURITE_ITEM = 'sneakers/app/DELETE_FAVOURITE_ITEM'

let initialState = {
  initialized: false,
  sneakers: JSON.parse(localStorage.getItem('sneakersListItems')) || [],
  totalSneakersCount: null,
  isLoading: false,
  searchQuery: '',
  favourites: [],
  sliders: []
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
    case SET_FAVOURITES_LIST: {
      return {
        ...state,
        isLoading: true,
        favourites: action.payload,
      };
    };
    case SET_SLIDERS: {
      return {
        ...state,
        isLoading: true,
        sliders: action.payload,
      };
    };
    case ADD_ITEM_TO_FAVOURITES: {
      const NewFavouritesList = [...state.favourites, action.payload];
      return {
        ...state,
        isLoading: true,
        favourites: NewFavouritesList,
      };
    };
    case DELETE_FAVOURITE_ITEM: {
      const NewFavouritesList = [...state.favourites].filter((item) => {
        return item.id !== action.id
      });
      return {
        ...state,
        isLoading: true,
        favourites: NewFavouritesList,
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
  setFavouritesItemsToList: (obj) =>
    ({ type: SET_FAVOURITES_LIST, payload: obj }),
  setSliders: (slidersData) =>
    ({ type: SET_SLIDERS, payload: slidersData }),
  addNewFavouriteItem: (obj) =>
    ({ type: ADD_ITEM_TO_FAVOURITES, payload: obj }),
  deleteFavouriteItem: (id) =>
    ({ type: DELETE_FAVOURITE_ITEM, id }),
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

export const getFavouritesList = () => async (dispatch) => {
  let data = await sneakersAPI.getFavouriteItems();
  dispatch(actions.setFavouritesItemsToList(data));
  dispatch(actions.setIsLoaded(false));
};

export const getSlidersData = () => async (dispatch) => {
  let data = await sneakersAPI.getSliders();
  dispatch(actions.setSliders(data.stanSmith));
  dispatch(actions.setIsLoaded(false));
};

export const setFavouritesList = (obj) => async (dispatch) => {
  let data = await sneakersAPI.setFavouriteItems(obj
  );
  dispatch(actions.addNewFavouriteItem(data));
  dispatch(actions.setIsLoaded(false));
};

export const removeFavouriteItemSuccess = (id) => async (dispatch) => {
  await sneakersAPI.removeFavouriteItem(id);
  dispatch(actions.deleteFavouriteItem(id));
  dispatch(actions.setIsLoaded(false));
};

export const initializeApp = () => (dispatch) => {
  let promises = [
    dispatch(getTotalSneakersItemsCount()),
    dispatch(getSneakersList()),
    dispatch(getFavouritesList()),
    dispatch(getSlidersData())
  ]
  Promise.all([promises]).then(() => {
    dispatch(actions.initializedSuccess());
  });
}

export default appReducer;