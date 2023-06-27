import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace(process.env.REACT_APP_CLIENT_ROOT + '/');
        } else {
            setLoading(false);
        }
    }, []);

    const onSubmit = e => {

        e.preventDefault();

        const user = {
            email: email,
            password: password
        };

        axios.post(process.env.REACT_APP_API_ROOT + '/users/auth/login/', user)
            .then(response => {
                if (response.data) {
                    localStorage.clear();
                    localStorage.setItem('token', response.data.key);
                    window.location.replace(process.env.REACT_APP_CLIENT_ROOT + '/regulations');
                }
                else {
                    setEmail('');
                    setPassword('');
                    localStorage.clear();
                    setErrors(true);
                }
            });
    };

    return (
        <>

            <Row className='h-100 login-page'>
                <Col className='h-100 d-flex align-items-center justify-content-center'>
                    <Card className='shadow-lg col-10 col-md-3'>
                        <Col className='m-2'>
                            {loading === false && <h1>Login</h1>}
                            {errors === true && <p className='text-danger'>Cannot log in with provided credentials</p>}
                            {loading === false && (

                                <Form className='form-signin' onSubmit={onSubmit}>
                                    <Form.Group>
                                        <div className="form-outline mb-3">
                                            <Form.Label htmlFor='email' className="form-label">Email address:</Form.Label>
                                            <Form.Control
                                                className='form-control'
                                                name='email'
                                                type='email'
                                                value={email}
                                                required
                                                onChange={e => setEmail(e.target.value)}
                                            />{' '}
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <div className="form-outline mb-3">
                                            <Form.Label htmlFor='password' className="form-label">Password:</Form.Label>
                                            <Form.Control
                                                className='form-control'
                                                name='password'
                                                type='password'
                                                value={password}
                                                required
                                                onChange={e => setPassword(e.target.value)}
                                            />{' '}
                                        </div>
                                    </Form.Group>
                                    <input className='btn btn-dark' type='submit' value='Login' />
                                </Form>
                            )}
                        </Col>
                    </Card>
                </Col>
            </Row>
        </>

    );
};

export default Login;