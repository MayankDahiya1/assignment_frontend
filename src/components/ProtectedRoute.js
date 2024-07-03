/*
 * IMPORT
 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

/*
 * CONST ASSIGNMENT
 */
const ProtectedRoute = () => {
    const auth = useSelector(state => state.auth);

    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

/*
 * EXPORT
 */
export default ProtectedRoute;
