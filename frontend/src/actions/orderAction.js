import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_GET_REQUEST,
    ORDER_GET_SUCCESS,
    ORDER_GET_FAIL
} from '../constants/orderConstant'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {

    try {

        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {userLogin: {userInfo}} = getState(); 

        axios.defaults.headers.common['Content-Type']   = 'aplication/json';
        axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;

         /** Request */
        const {data:newOrder} = await axios.post(`/api/orders`, order);
       
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: newOrder
        })

    } catch (error) {
      
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.messages 
            ? error.response.data.message
            : error.message,
        })

    }
}

export const getOrderById = (id) => async (dispatch, getState) => {
    
    try {

        dispatch({
            type: ORDER_GET_REQUEST
        })
       
        const {userLogin: {userInfo}} = getState(); 
        axios.defaults.headers.common['Content-Type']   = 'aplication/json';
        axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;
        
        /** Request */
        const {data:order} = await axios.get(`/api/orders/${id}`);

        dispatch({
            type: ORDER_GET_SUCCESS,
            payload: order 
        })


    } catch (error) {
        dispatch({
            type: ORDER_GET_FAIL,
            payload: error.response && error.response.data.messages 
            ? error.response.data.message
            : error.message,
        })
    }
}

