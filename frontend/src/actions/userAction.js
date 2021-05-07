import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS } from "../constants/userConstant"

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
                'Content-Type': 'aplication/json'
            }
        }
        //console.log(email)
        //console.log(password)
        const {data} = await axios.post(
            '/api/users/login', config);      
       
            dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? 
                     error.response.data.message : error.message
        })
    }
}