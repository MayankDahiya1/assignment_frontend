/*
 * IMPORT
 */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/actions/authActions';
import {Link, useNavigate} from 'react-router-dom';

/*
 * CONST ASSIGNMENT
 */
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user', // default role is user
    });

    const { firstName, lastName, email, password, role } = formData;

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onCheckboxChange = e => {
        setFormData({ ...formData, role: e.target.checked ? 'admin' : 'user' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register({ firstName, lastName, email, password, role }));
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
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name</label>
                        <input type="text" className="form-control" name="firstName" value={firstName} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={lastName} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" className="form-control" name="email" value={email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={onChange} />
                    </div>
                    <div className="form-group form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="role"
                            checked={role === 'admin'}
                            onChange={onCheckboxChange}
                        />
                        <label className="form-check-label">Register as Admin</label>
                        <p><Link to="/login">Back to login</Link></p>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                {auth.error && <p className="text-danger">{auth.error}</p>}
            </div>
        </div>
    );
};

/*
 * EXPORT
 */
export default Register;
