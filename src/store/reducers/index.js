/*
 * IMPORT
 */
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';

/*
 * EXPORT
 */
export default combineReducers({
    auth: authReducer,
    user: userReducer,
});
