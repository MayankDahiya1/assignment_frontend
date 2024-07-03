/*
 * IMPORT
 */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import UserList from './pages/UserList';
import ProtectedRoute from './components/ProtectedRoute';

/*
 * CONST ASSIGNMENT
 */
const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<UserList />} />
            </Route>
        </Routes>
    );
};

/*
 * EXPORT
 */
export default App;
