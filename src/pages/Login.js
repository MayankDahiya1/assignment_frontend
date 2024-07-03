/*
 * IMPORT
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/authActions';
import { Link, useNavigate } from 'react-router-dom';

/*
 * CONST ASSIGNMENT
 */
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate('/');
        }
    }, [auth.isAuthenticated, navigate]);

    // Return
    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                {auth.error && <p className="text-danger">{auth.error}</p>}
                <p className="mt-3">Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

/*
 * EXPORT
 */
export default Login;
