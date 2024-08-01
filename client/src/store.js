import {createStore, combineReducers , applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
// import productReducer from './reducers/productReducer';
// import productDetailReducer from './reducers/productReducer';
import {productReducer, productDetailReducer} from './reducers/productReducer';
import { userReducer,profileReducer } from './reducers/userReducer';

const reducer = combineReducers({
    product:productReducer,
    productDetail:productDetailReducer,
    user:userReducer,
    profile:profileReducer

});
const initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store;