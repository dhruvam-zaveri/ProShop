import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer } from "./reducers/productReducers.js";

const reducer = combineReducers({
  productList: productListReducer,
});

const initialState = {}; // the state that will be preloaded

const middleware = [thunk]; // list of middleware that we will be using

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
