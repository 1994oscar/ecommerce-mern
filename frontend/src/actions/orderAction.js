    import {
        ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
        ORDER_CREATE_FAIL,    ORDER_GET_REQUEST,
        ORDER_GET_SUCCESS,    ORDER_GET_FAIL,
        ORDER_PAY_REQUEST,    ORDER_PAY_SUCCESS,
        ORDER_PAY_FAIL,
        ORDER_LIST_MY_REQUEST,
        ORDER_LIST_MY_SUCCESS,
        ORDER_LIST_MY_FAIL,
        ORDER_GET_ADMIN_SUCCESS,
        ORDER_GET_ADMIN_REQUEST,
        ORDER_GET_ADMIN_FAIL,
        ORDER_SET_DELIVERED_ADMIN_REQUEST,
        ORDER_SET_DELIVERED_ADMIN_SUCCESS,
        ORDER_SET_DELIVERED_ADMIN_FAIL
    } from '../constants/orderConstant'
    import axios from 'axios'

    export const createOrder = (order) => async (dispatch, getState) => {

        try {

            dispatch({
                type: ORDER_CREATE_REQUEST
            });

            const {userLogin: {userInfo}} = getState(); 

            axios.defaults.headers.common['Content-Type']   = 'application/json';
            axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;
         
            const {data:newOrder} = await axios.post(`/api/orders`, order);
        
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: newOrder
            });

        } catch (error) {
        
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload: error.response && error.response.data.messages 
                ? error.response.data.message
                : error.message,
            });

        }
    }

    export const getOrderById = (id) => async (dispatch, getState) => {
        
        try {

            dispatch({
                type: ORDER_GET_REQUEST
            });
        
            const {userLogin: {userInfo}} = getState(); 
            axios.defaults.headers.common['Content-Type']   = 'application/json';
            axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;
            
          
            const {data:order} = await axios.get(`/api/orders/${id}`);

            dispatch({
                type: ORDER_GET_SUCCESS,
                payload: order 
            });


        } catch (error) {
            dispatch({
                type: ORDER_GET_FAIL,
                payload: error.response && error.response.data.messages 
                ? error.response.data.message
                : error.message,
            });
        }
    }

    export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
        
        try {

            dispatch({
                type: ORDER_PAY_REQUEST
            });
        
            const {userLogin: {userInfo}} = getState(); 
            axios.defaults.headers.common['Content-Type']   = 'application/json';
            axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;
            
            
            const {data:order} = await axios.put(`/api/orders/${orderId}/pay`, paymentResult);

            dispatch({
                type: ORDER_PAY_SUCCESS, 
                payload: order 
            });

        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload: error.response && error.response.data.messages 
                ? error.response.data.message
                : error.message,
            });
        }
    }

    export const getMyOrders = () => async (dispatch, getState) => {
        
        try {

            dispatch({
                type: ORDER_LIST_MY_REQUEST
            });
        
            const {userLogin: {userInfo}} = getState(); 
            axios.defaults.headers.common['Content-Type']   = 'application/json';
            axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;
                      
            const {data:orders} = await axios.get(`/api/orders/myorders`);

            dispatch({
                type: ORDER_LIST_MY_SUCCESS, 
                payload: orders
            });


        } catch (error) {
            dispatch({
                type: ORDER_LIST_MY_FAIL,
                payload: error.response && error.response.data.messages 
                ? error.response.data.message
                : error.message,
            });
        }
    }
    export const getOrdersAdmin = () => async (dispatch, getState) => {
        
        try {

            dispatch({
                type: ORDER_GET_ADMIN_REQUEST
            });
        
            const {userLogin: {userInfo}} = getState(); 
            axios.defaults.headers.common['Content-Type']   = 'application/json';
            axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;
                      
            const {data:orders} = await axios.get(`/api/orders/admin`);
            console.log(orders)
            dispatch({
                type: ORDER_GET_ADMIN_SUCCESS, 
                payload: orders
            });


        } catch (error) { 
            dispatch({
                type: ORDER_GET_ADMIN_FAIL,
                payload: error.response && error.response.data.messages 
                ? error.response.data.message
                : error.message,
            });
        }
    }

    export const setAsDeliveredAdmin = (id) => async (dispatch, getState) => {
        
        try {

            dispatch({
                type: ORDER_SET_DELIVERED_ADMIN_REQUEST
            });
        
            const {userLogin: {userInfo}} = getState(); 
            axios.defaults.headers.common['Content-Type']   = 'application/json';
            axios.defaults.headers.common['Authorization']  = `Bearer ${userInfo.token}`;
                    
            await axios.put(`/api/orders/admin/${id}/deliver`);
           
            dispatch({
                type: ORDER_SET_DELIVERED_ADMIN_SUCCESS,
            });


        } catch (error) { 
            dispatch({
                type: ORDER_SET_DELIVERED_ADMIN_FAIL,
                payload: error.response && error.response.data.messages 
                ? error.response.data.message
                : error.message,
            });
        }
    }