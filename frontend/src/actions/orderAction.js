import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL
} from '../constants/orderConstant'
import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {

    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        console.log(order)
        const {userLogin: {userInfo}} = getState(); 
        console.log(userInfo)
        axios.defaults.headers.common['Content-Type']   = 'aplication/json';
        axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;

        const {data:newOrder} = await axios.post(`/api/orders`, order);
        console.log(newOrder)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: newOrder
        })

    } catch (error) {
        console.log(error)
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.messages 
            ? error.response.data.message
            : error.message,
        })

    }
}
