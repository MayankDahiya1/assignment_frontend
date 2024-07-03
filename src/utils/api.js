/*
 * IMPORT
 */
import axios from 'axios';


/*
 * CONST ASSIGNMENT
 */
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

/*
 * API
 */
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

/*
 * EXPORT
 */
export default api;
