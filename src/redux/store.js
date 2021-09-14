import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import appReducer from "./reducers/appReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import cartReducer from "./reducers/cartReducer";


let rootReducer = combineReducers({
  app: appReducer,
  cart: cartReducer,
  form: formReducer
});

const middlewares = [thunkMiddleware]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

window.__store__ = store;
export default store;