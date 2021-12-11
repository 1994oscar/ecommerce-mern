import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_LIST_ADMIN_REQUEST, 
    PRODUCT_LIST_ADMIN_SUCCESS, 
    PRODUCT_LIST_ADMIN_FAIL, 
    PRODUCT_DELETE_ADMIN_REQUEST,
    PRODUCT_DELETE_ADMIN_SUCCESS, 
    PRODUCT_DELETE_ADMIN_FAIL, 
    PRODUCT_CREATE_ADMIN_REQUEST,
     PRODUCT_CREATE_ADMIN_SUCCESS, 
     PRODUCT_CREATE_ADMIN_FAIL, 
     PRODUCT_CREATE_ADMIN_RESET, 
     PRODUCT_UPDATE_ADMIN_REQUEST, 
     PRODUCT_UPDATE_ADMIN_FAIL,
      PRODUCT_UPDATE_ADMIN_SUCCESS, 
      PRODUCT_UPDATE_ADMIN_RESET,
      PRODUCT_CREATE_REVIEW_REQUEST,
      PRODUCT_CREATE_REVIEW_SUCCESS,
      PRODUCT_CREATE_REVIEW_FAIL,
      PRODUCT_CREATE_REVIEW_RESET
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
            return {loading: false, success:true, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productListAdminReducer = (state = {products: []}, action) => {
    switch (action.type){
        case PRODUCT_LIST_ADMIN_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_ADMIN_SUCCESS:
            return {loading: false, success:true, products: action.payload}
        case PRODUCT_LIST_ADMIN_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productCreateAdminReducer = (state = {product:[]}, action) => {
    switch (action.type){
        case PRODUCT_CREATE_ADMIN_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_ADMIN_SUCCESS:
            return {loading: false, success:true, product: action.payload}
        case PRODUCT_CREATE_ADMIN_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_ADMIN_RESET:
            return {}
        default:
            return state
    }
}


export const productUpdateAdminReducer = (state = {product:{}}, action) => {
    switch (action.type){
        case PRODUCT_UPDATE_ADMIN_REQUEST:
            return {loading: true}
        case PRODUCT_UPDATE_ADMIN_SUCCESS:
            return {loading: false, success:true, product: action.payload, message: action.message}
        case PRODUCT_UPDATE_ADMIN_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_UPDATE_ADMIN_RESET:
            return {}
        default:
        return state
    }
}

export const productDeleteAdminReducer = (state = {}, action) => {
    switch (action.type){
        case PRODUCT_DELETE_ADMIN_REQUEST:
            return {loading: true}
        case PRODUCT_DELETE_ADMIN_SUCCESS:
            return {loading: false, success:true, message: action.payload}
        case PRODUCT_DELETE_ADMIN_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success:true, message: action.payload}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
             return {}
        default:
            return state
    }
}