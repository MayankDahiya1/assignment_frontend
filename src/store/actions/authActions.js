/*
 * IMPORT
 */
import api from '../../utils/api';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

// Register user
export const register = ({ firstName, lastName, email, password, role }) => async dispatch => {
    try {
        const res = await api.post('/auth/register', { firstName, lastName, email, password, role });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg,
        });
    }
};

// Login user
export const login = (email, password) => async dispatch => {
    try {
        const res = await api.post('/auth/login', { email, password });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg,
        });
    }
};

// Logout user
export const logout = () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
};
