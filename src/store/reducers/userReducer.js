/*
 * IMPORT
 */
import { GET_USERS, USER_ERROR, DELETE_USER, UPDATE_USER, CREATE_USER } from '../actions/types';

/*
 * CONST ASSIGNMENT
 */
const initialState = {
    users: [],
    loading: true,
    error: null,
    totalPages: 0,
    currentPage: 1,
};

/*
 * EXPORT
 */
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_USERS:
            return {
                ...state,
                users: payload.users,
                totalPages: payload.totalPages,
                currentPage: payload.currentPage,
                loading: false,
                error: null,
            };
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, payload],
                loading: false,
                error: null,
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user._id === payload._id ? payload : user),
                loading: false,
                error: null,
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== payload),
                loading: false,
                error: null,
            };
        case USER_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        default:
            return state;
    }
}
