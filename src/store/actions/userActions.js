/*
 * IMPORT
 */
import api from '../../utils/api';
import { GET_USERS, USER_ERROR, DELETE_USER, UPDATE_USER, CREATE_USER } from './types';

// Get users with pagination
export const getUsers = (page = 1, limit = 10) => async dispatch => {
    try {
        const res = await api.get(`/users?page=${page}&limit=${limit}`);
        dispatch({
            type: GET_USERS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: err.response.data.msg,
        });
    }
};

// Create user with error handling
export const createUser = userData => async dispatch => {
    try {
        const res = await api.post('/users', userData);
        dispatch({
            type: CREATE_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: err.response.data.msg,
        });
    }
};

// Update user with error handling
export const updateUser = (id, userData) => async dispatch => {
    try {
        const res = await api.put(`/users/${id}`, userData);
        dispatch({
            type: UPDATE_USER,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: err.response.data.msg,
        });
    }
};

// Delete user
export const deleteUser = id => async dispatch => {
    try {
        await api.delete(`/users/${id}`);
        dispatch({
            type: DELETE_USER,
            payload: id,
        });
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: err.response.data.msg,
        });
    }
};
