// React imports
import React, { useState, useEffect } from 'react';

// Import router links
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import logo
import logo from '../../../Lima_new.svg'

// Import React Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


// Logout
const handleLogout = e => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/v1/users/auth/logout/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    })
        .then(response => {
            console.log(response.data)
            localStorage.clear();
            window.location.replace('http://localhost:3000/login');
        })
};

const LogoutModal = ({ ShowState, HideFunction }) => {
    return (
        <>
            <Modal show={ShowState} onHide={HideFunction}>
                <Modal.Header>
                    <h1>Logout</h1>
                </Modal.Header>
                <Modal.Body>
                    <span>Do you wish to logout?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='px-4' onClick={handleLogout} variant='success'>
                        Yes
                    </Button>
                    <Button className='px-4' onClick={HideFunction} variant='danger'>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

// Internal and public links
const InternalLinks = () => {
    return (
        <>
            <Nav.Link as={Link} to='/projects'>Projects</Nav.Link>
            <Nav.Link as={Link} to='/regulations'>Regulations</Nav.Link>
            <Nav.Link as={Link} to='/verifications'>Verifications</Nav.Link>
            <Nav.Link as={Link} to='/testpage'>Test Page</Nav.Link>
        </>
    )
}

const publicLink = <Nav className="ms-auto">
    <Nav.Link as={Link} to='/login'>Login</Nav.Link>
    <Nav.Link as={Link} to='/signup'>Signup</Nav.Link>
</Nav>;

const Navigationbar = props => {
    const [isAuth, setIsAuth] = useState(false);
    const [logoutState, setLogoutState] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <Navbar className='border-bottom border-dark shadow-sm text-white' sticky='top' bg="dark" variant='dark' expand="lg">
            <Container>
                <LogoutModal
                    ShowState={logoutState}
                    HideFunction={() => setLogoutState(false)} />
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        height="35"
                        className="d-inline-block align-top"
                        alt="Brand logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {isAuth === true ? (
                        <>
                            <Nav activeKey={props.pathname} className="ms-auto"><InternalLinks /></Nav>
                            <Nav className="ms-auto"><Button onClick={() => setLogoutState(true)} variant='light'>Logout</Button></Nav>

                        </>
                    ) : (
                        <>
                            <Nav className="ms-auto">
                                {publicLink}
                            </Nav>

                        </>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigationbar;