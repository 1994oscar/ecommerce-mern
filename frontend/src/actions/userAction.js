import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS, USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "../constants/userConstant"
import {ORDER_LIST_MY_RESET} from '../constants/orderConstant'

export const login = (email, password) => async (dispatch) => {
    try {

        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const config = {
            data: {
                email, password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        const {data} = await axios.post(
            '/api/users/login', config);      
       
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        });
    }
}


export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGIN_LOGOUT});
    dispatch({type: USER_DETAILS_RESET});
    dispatch({type: ORDER_LIST_MY_RESET});
}

export const register = (name, email, password) => async (dispatch) => {
    try {

        dispatch({
            type: USER_REGISTER_REQUEST
        });

        const config = {
            data: {
                name, email, password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
     
        const {data} = await axios.post('/api/users', config);      
       
            dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        });

        const {userLogin: {userInfo}} = getState()
        const config = {         
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
       
        const {data} = await axios.get(
            `/api/users/${id}`, config);      
       
            dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const update = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        });

        const {userLogin: {userInfo}} = getState()

        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;
        
        const result = await axios.put('/api/users/profile', {data:user});      
              
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: result.data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}

export const getUserList = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        });

        const {userLogin: {userInfo}} = getState();

        axios.defaults.headers.common['Authorization'] = `Bearer ${userInfo.token}`;

        const {data:userList} = await axios.get('/api/users');

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: userList
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}