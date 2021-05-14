import {createStore, combineReducers, applyMiddleware} from 'redux' 
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailReducer}  from './reducers/productReducers'
import {cartReducer} from './reducers/cartReducers'
import {userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateReducer} from './reducers/userReducer'

//--- Redux Reducers ---
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateReducer,
})
//-----------------------

//--- Local Storage Data ---
const cartItemsFromStorage = localStorage.getItem('cartItems') ?
                             JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromStorage = localStorage.getItem('userInfo') ?
                             JSON.parse(localStorage.getItem('userInfo')) : null;
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
                             JSON.parse(localStorage.getItem('shippingAddress')) : {};
//--------------------------

//--- Redux Initial State ---
const initialState = {
    cart: {cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage},
    userLogin: {userInfo: userInfoFromStorage}
}
//---------------------------

const middleWare = [thunk]

//--- Redux Store ---
const store = createStore (
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleWare)))
//-------------------

export default store 