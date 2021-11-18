import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_LIST_ADMIN_REQUEST, PRODUCT_LIST_ADMIN_SUCCESS, PRODUCT_LIST_ADMIN_FAIL, PRODUCT_DELETE_ADMIN_REQUEST, PRODUCT_DELETE_ADMIN_SUCCESS, PRODUCT_DELETE_ADMIN_FAIL, PRODUCT_CREATE_ADMIN_REQUEST, PRODUCT_CREATE_ADMIN_SUCCESS, PRODUCT_CREATE_ADMIN_FAIL
} from '../constants/productsConstants'


export const productListReducer = (state = {products: []}, action) => {
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productDetailReducer = (state = {product: {reviews: []}}, action) => {
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productListAdminReducer = (state = {products: []}, action) => {
    switch (action.type){
        case PRODUCT_LIST_ADMIN_REQUEST:
            return {loading: true, success:false, products: []}
        case PRODUCT_LIST_ADMIN_SUCCESS:
            return {loading: false, success:true, products: action.payload}
        case PRODUCT_LIST_ADMIN_FAIL:
            return {loading: false,success:false, error: action.payload}
        default:
            return state
    }
}

export const productCreateAdminReducer = (state = {products:[]}, action) => {
    switch (action.type){
        case PRODUCT_CREATE_ADMIN_REQUEST:
            return {loading: true, success:false, products: []}
        case PRODUCT_CREATE_ADMIN_SUCCESS:
            return {loading: false, success:true, products: action.payload}
        case PRODUCT_CREATE_ADMIN_FAIL:
            return {loading: false, success:false, error: action.payload}
        default:
            return state
    }
}


export const productDeleteAdminReducer = (state = {}, action) => {
    switch (action.type){
        case PRODUCT_DELETE_ADMIN_REQUEST:
            return {loading: true, success:false}
        case PRODUCT_DELETE_ADMIN_SUCCESS:
            return {loading: false, success:true, message: action.payload}
        case PRODUCT_DELETE_ADMIN_FAIL:
            return {loading: false,success:false, error: action.payload}
        default:
            return state
    }
}