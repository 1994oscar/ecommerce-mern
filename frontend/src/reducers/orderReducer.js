import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS,
    ORDER_GET_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
    ORDER_GET_ADMIN_REQUEST,
    ORDER_GET_ADMIN_SUCCESS,
    ORDER_GET_ADMIN_FAIL,
    ORDER_SET_DELIVERED_ADMIN_REQUEST,
    ORDER_SET_DELIVERED_ADMIN_SUCCESS,
    ORDER_SET_DELIVERED_ADMIN_FAIL
} from '../constants/orderConstant'

const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
          
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload
            }

        case ORDER_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
           
    }
}

const orderGetReducer = (state = {loading: true, orderItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case ORDER_GET_REQUEST:
            return {
                ...state,
                loading: true
            }
          
        case ORDER_GET_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_GET_FAIL:
            return {
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
           
    }
}

const orderPayReducer = (state = {}, action) => {
    
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {             
                loading: true,
            }
          
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_PAY_RESET: 
            return {}

        default:
            return state;    
    }
}

const orderListMyReducer = (state = {orders: []}, action) => {
    
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {             
                loading: true,
                success: false,
            }
          
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                success: true,
                orders: action.payload
            }

        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case ORDER_LIST_MY_RESET:
            return { orders: []}

        default:
            return state;    
    }
}


const orderGetAdminReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_GET_ADMIN_REQUEST:
            return {
                loading: true,
                success: false,
            }
          
        case ORDER_GET_ADMIN_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                success: true,
            }

        case ORDER_GET_ADMIN_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: false,
            }
    
        default:
            return state;
           
    }
}


const orderSetDeliveredAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_SET_DELIVERED_ADMIN_REQUEST:
            return {
                loading: true,
            }
          
        case ORDER_SET_DELIVERED_ADMIN_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case ORDER_SET_DELIVERED_ADMIN_FAIL:
            return {
                loading: false,
                error: action.payload,
                success: false,
            }
    
        default:
            return state;
           
    }
}

export  {orderCreateReducer, orderGetReducer, 
            orderPayReducer, orderListMyReducer, 
            orderGetAdminReducer, orderSetDeliveredAdminReducer}