// React imports
import React, { useState, useEffect } from 'react';

// Import router links
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import logo
import { ReactComponent as Logo } from '../lima_new_2.svg'

// Import React Bootstrap components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

import Stack from 'react-bootstrap/Stack';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece, faBuilding, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faPuzzlePiece, faBuilding, faListCheck);



// Logout
const handleLogout = e => {
    e.preventDefault();

    axios.post(process.env.REACT_APP_API_ROOT + '/users/auth/logout/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    })
        .then(response => {
            console.log(response.data)
            localStorage.clear();
            window.location.replace(process.env.REACT_APP_CLIENT_ROOT + '/login');
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
                    <Button className='px-4' onClick={handleLogout} variant='theme-b'>
                        Yes
                    </Button>
                    <Button className='px-4' onClick={HideFunction} variant='theme-e'>
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
            <Nav.Link as={Link} to='/regulations'><Stack direction='horizontal' gap={2}><FontAwesomeIcon icon="fa-puzzle-piece" /><span>Code</span></Stack></Nav.Link>
            <Nav.Link as={Link} to='/projects'><Stack direction='horizontal' gap={2}><FontAwesomeIcon icon="fa-list-check" /><span>Projects</span></Stack></Nav.Link>
            <Nav.Link as={Link} to='/verifications'><Stack direction='horizontal' gap={2}><FontAwesomeIcon icon="fa-building" /><span>Check</span></Stack></Nav.Link>
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
        <Navbar className='shadow text-white' bg='dark' sticky='top' variant='dark' expand="lg">
            <Container >
                <LogoutModal
                    ShowState={logoutState}
                    HideFunction={() => setLogoutState(false)} />
                <Navbar.Brand
                    href="/">
                    <Logo
                        className="logo-app"
                        width="auto" />

                    {/* <img
                        src="/chek_logo.png"
                        width="auto"
                        height="60"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {isAuth === true ? (
                        <>
                            <Nav activeKey={props.pathname} className="ms-auto text-white"><InternalLinks /></Nav>
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