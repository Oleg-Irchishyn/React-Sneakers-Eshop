import { sneakersAPI } from "../../api/api";

const INITIALIZED_SUCCESS = 'sneakers/app/INITIALIZED_SUCCESS';
const SET_SNEAKERS_LIST = 'sneakers/app/SET_SNEAKERS_LIST';
const SET_TOTAL_SNEAKERS_COUNT = 'sneakers/app/SET_TOTAL_SNEAKERS_COUNT';
const SET_IS_LOADED = 'sneakers/app/SET_IS_LOADED';
const CHANGE_SNEAKERS_SELECTED_STATUS = 'sneakers/app/CHANGE_SNEAKERS_SELECTED_STATUS';

let initialState = {
  initialized: false,
  sneakers: JSON.parse(localStorage.getItem('sneakersListItems')) || [],
  totalSneakersCount: null,
  isLoading: false,
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
    case CHANGE_SNEAKERS_SELECTED_STATUS: {
      const updatedSneakersItems = state.sneakers.map((item) => {
        if (item.id === action.id) {
          item.selected = action.selected;
        }
        return item;
      });
      return {
        ...state,
        isLoading: true,
        sneakers: updatedSneakersItems,
      };
    }
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
  changeSneakersItemSelectedStatus: (id, selected) =>
    ({ type: CHANGE_SNEAKERS_SELECTED_STATUS, id, selected }),
}

export const getTotalSneakersItemsCount = () => async (dispatch) => {
  let data = await sneakersAPI.getSneakersTotalCount();
  dispatch(actions.setTotalSneakersCount(data.count));
};

export const getSneakersList = () => async (dispatch) => {
  let data = await sneakersAPI.getSneakers();
  dispatch(actions.setSneakersList(data));
  dispatch(actions.setIsLoaded(false));
};

export const loadMoreSneakers = (startCount, endCount) => async (dispatch) => {
  let data = await sneakersAPI.getSneakers(startCount, endCount);
  dispatch(actions.setSneakersList(data));
  dispatch(actions.setIsLoaded(false));
};

export const setNewSneakersItemSelectedStatus =
  (id, newVal) =>
    async (dispatch) => {
      await sneakersAPI.changeSneakersSelectedStatus(id, newVal);
      dispatch(actions.changeSneakersItemSelectedStatus(id, newVal));
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