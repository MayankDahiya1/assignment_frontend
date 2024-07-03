/*
 * IMPORT
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

/*
 * CONST ASSIGNMENT
 */
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: 'LOGIN_SUCCESS', payload: { token } });
}

/*
 * DOM
 */
ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);
