import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
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
    PRODUCT_UPDATE_ADMIN_REQUEST, 
    PRODUCT_UPDATE_ADMIN_SUCCESS, 
    PRODUCT_UPDATE_ADMIN_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL
} from '../constants/productsConstants'
import axios from 'axios'

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        
        dispatch({type: PRODUCT_LIST_REQUEST});

        const {data} = await axios.get(`/api/products?keyword=${keyword}`);

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        });
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST});

        const {data} = await axios.get(`/api/products/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        });
    }
}

export const listProductsAdmin = () => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_LIST_ADMIN_REQUEST});

        const {userLogin: {userInfo}} = getState();

        axios.defaults.headers.common['Content-Type']  = 'application/json';
        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

        const {data} = await axios.get('/api/products/admin');

        dispatch({
            type: PRODUCT_LIST_ADMIN_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const createProductsAdmin = () => async (dispatch, getState) => {
    try {
       
        dispatch({type: PRODUCT_CREATE_ADMIN_REQUEST})

        const {userLogin: {userInfo}} = getState();

        axios.defaults.headers.common['Content-Type']  = 'application/json';
        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

        const {data} = await axios.post('/api/products/admin');
     
        dispatch({
            type: PRODUCT_CREATE_ADMIN_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}


export const updateProductAdmin = (product) => async (dispatch, getState) => {
    try {
       
        dispatch({type: PRODUCT_UPDATE_ADMIN_REQUEST})

        const {userLogin: {userInfo}} = getState();

        axios.defaults.headers.common['Content-Type']  = 'application/json';
        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

        const {data} = await axios.put(`/api/products/admin/${product._id}`, {data:product} );
       
        dispatch({
            type: PRODUCT_UPDATE_ADMIN_SUCCESS,
            payload: data.updatedProduct,
            message: data.message
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const createProductReview = (productId, review) => async (dispatch, getState) => {
    try {
       
        dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})

        const {userLogin: {userInfo}} = getState();

        axios.defaults.headers.common['Content-Type']  = 'application/json';
        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

        const {data} = await axios.post(`/api/products/${productId}/reviews`, {data:review});
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}

export const deleteProductAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_ADMIN_REQUEST})

        const {userLogin: {userInfo}} = getState();

        axios.defaults.headers.common['Content-Type']  = 'application/json';
        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

        const {data} = await axios.delete(`/api/products/admin/${id}`);

        dispatch({
            type: PRODUCT_DELETE_ADMIN_SUCCESS,
            payload: data.message
        });

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_ADMIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        });
    }
}