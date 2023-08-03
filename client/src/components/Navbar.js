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

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse,
    MDBBtn
} from 'mdb-react-ui-kit';

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
            <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to='/regulations'><Stack direction='horizontal' gap={2}><FontAwesomeIcon icon="fa-puzzle-piece" /><span>Code</span></Stack></MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to='/projects'><Stack direction='horizontal' gap={2}><FontAwesomeIcon icon="fa-list-check" /><span>Projects</span></Stack></MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to='/verifications'><Stack direction='horizontal' gap={2}><FontAwesomeIcon icon="fa-building" /><span>Check</span></Stack></MDBNavbarLink>
            </MDBNavbarItem>
        </>
    )
}

const publicLink = <Nav className="ms-auto">
    <MDBNavbarItem>
        <MDBNavbarLink tag={Link} to='/login'>Login</MDBNavbarLink>
    </MDBNavbarItem>
    <MDBNavbarItem>
        <MDBNavbarLink tag={Link} to='/signup'>Signup</MDBNavbarLink>
    </MDBNavbarItem>
</Nav>;

const Navigationbar = props => {
    const [isAuth, setIsAuth] = useState(false);
    const [logoutState, setLogoutState] = useState(false);
    const [showNav, setShowNav] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <MDBNavbar style={{ zIndex: 10010 }} dark bgColor='dark' sticky='top' variant='dark' expand="lg">
            <MDBContainer >
                <LogoutModal
                    ShowState={logoutState}
                    HideFunction={() => setLogoutState(false)} />
                <MDBNavbarBrand
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
                </MDBNavbarBrand>
                <MDBNavbarToggler
                    type='button'
                    data-target='#navbarColor02'
                    aria-controls='navbarColor02'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                    onClick={() => setShowNav(!showNav)}
                >
                    <MDBIcon icon='bars' fas />
                </MDBNavbarToggler>
                <MDBCollapse show={showNav} className='' navbar>
                    {isAuth === true ? (
                        <>
                            <MDBNavbarNav className='d-flex justify-content-center'>
                                <InternalLinks />
                            </MDBNavbarNav>
                            <MDBBtn className='ms-auto' color='light' onClick={() => setLogoutState(true)}>Logout</MDBBtn>
                        </>
                    ) : (
                        <>
                            <MDBNavbarNav className='d-flex justify-content-end'>
                                {publicLink}
                            </MDBNavbarNav>

                        </>
                    )}
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navigationbar;