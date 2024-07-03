/*
 * IMPORT
 */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser, updateUser, createUser } from '../store/actions/userActions';
import { logout } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Tooltip, OverlayTrigger, Pagination } from 'react-bootstrap';

/*
 * CONST ASSIGNMENT
 */
const UserList = () => {
    // Const assignment
    const dispatch = useDispatch();
    const { users, loading, error, totalPages, currentPage } = useSelector(state => state.user);
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'user',
    });

    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/login');
        } else {
            dispatch(getUsers(currentPage));
        }
    }, [auth.isAuthenticated, dispatch, navigate, currentPage]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setShowEditModal(true);
    };

    const handleAdd = () => {
        setShowAddModal(true);
    };

    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseAddModal = () => {
        setValidationError('');
        setShowAddModal(false);
    };

    const handleEditChange = (e) => {
        setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
    };

    const handleAddChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        if (Object.values(currentUser).some(field => field === '')) {
            setValidationError('All fields are required.');
            return;
        }
        setValidationError('');
        dispatch(updateUser(currentUser._id, currentUser));
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        if (Object.values(newUser).some(field => field === '')) {
            setValidationError('All fields are required.');
            return;
        }
        setValidationError('');
        dispatch(createUser(newUser));
    };

    useEffect(() => {
        if (error) {
            setValidationError(error);
        }
    }, [error]);

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            You can't delete yourself
        </Tooltip>
    );

    const handlePageChange = (pageNumber) => {
        dispatch(getUsers(pageNumber));
    };

    // Return
    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>User List</h2>
                <div>
                    <Button variant="success" className="mr-2" onClick={handleAdd}>Add User</Button>
                    <Button variant="danger" onClick={handleLogout}>Logout</Button>
                </div>
            </div>
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <>
                    <table className="table table-hover table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button variant="warning" className="mr-2 mx-lg-2" onClick={() => handleEdit(user)}>Edit</Button>
                                    {auth.user && user._id === auth.user.id ? (
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={renderTooltip}
                                        >
                        <span className="d-inline-block">
                          <Button variant="danger" disabled style={{ pointerEvents: 'none' }}>Delete</Button>
                        </span>
                                        </OverlayTrigger>
                                    ) : (
                                        <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <Pagination>
                        {[...Array(totalPages).keys()].map(number => (
                            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => handlePageChange(number + 1)}>
                                {number + 1}
                            </Pagination.Item>
                        ))}
                    </Pagination>
                </>
            )}

            {/* Edit User Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {validationError && <p className="text-danger">{validationError}</p>}
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mt-2 mb-2" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={currentUser.firstName}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="lastName"
                                value={currentUser.lastName}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={currentUser.email}
                                onChange={handleEditChange}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={currentUser.role}
                                onChange={handleEditChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Control>
                        </Form.Group>

                        <Button className="mt-2 mb-2" variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Add User Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {validationError && <p className="text-danger">{validationError}</p>}
                    <Form onSubmit={handleAddSubmit}>
                        <Form.Group className="mt-2 mb-2" controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={newUser.firstName}
                                onChange={handleAddChange}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter last name"
                                name="lastName"
                                value={newUser.lastName}
                                onChange={handleAddChange}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                name="email"
                                value={newUser.email}
                                onChange={handleAddChange}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                value={newUser.password}
                                onChange={handleAddChange}
                            />
                        </Form.Group>

                        <Form.Group className="mt-2 mb-2" controlId="formRole">
                            <Form.Label>Role</Form.Label>
                            <Form.Control
                                as="select"
                                name="role"
                                value={newUser.role}
                                onChange={handleAddChange}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </Form.Control>
                        </Form.Group>

                        <Button className="mt-2 mb-2" variant="primary" type="submit">
                            Add User
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};


/*
 * EXPORT
 */
export default UserList;
