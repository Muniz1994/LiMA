// React imports
import React, { useState, useEffect } from 'react';

// Import router links
import { Link } from 'react-router-dom';
import axios from 'axios';

// Import logo
import { ReactComponent as Logo } from '../assets/lima_new_2.svg'

// Import React Bootstrap components
import Nav from 'react-bootstrap/Nav';

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
    MDBBtn,
    MDBModal,
    MDBModalHeader,
    MDBModalBody,
    MDBModalFooter,
    MDBModalDialog,
    MDBModalContent
} from 'mdb-react-ui-kit';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPuzzlePiece, faBuilding, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faPuzzlePiece, faBuilding, faListCheck);

// Logout
const handleLogout = e => {
    e.preventDefault();

    // TODO: change to RTK
    axios.post(process.env.REACT_APP_API_ROOT + 'auth/logout/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
    })
        .then(response => {
            console.log(response.data)
            localStorage.clear();
            window.location.replace(process.env.REACT_APP_CLIENT_ROOT + '/login');
        })
};

const LogoutModal = ({ ShowState, toggleOpen }) => {
    return (
        <>
            <MDBModal show={ShowState} tabIndex='-1'>
                <MDBModalDialog centered>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <h1>Logout</h1>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <span>Do you wish to logout?</span>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn onClick={handleLogout} color='dark' outline>Yes</MDBBtn>
                            <MDBBtn onClick={toggleOpen} color='dark'>Cancel</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    )
}


// Internal and public links
const InternalLinks = () => {
    return (
        <>
            <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to='/regulations'>
                    <Stack direction='horizontal' gap={2}>
                        <MDBIcon fas icon="puzzle-piece" />
                        <span>Regulamento digital</span>
                    </Stack>
                </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to='/checkpanel'>
                    <Stack direction='horizontal' gap={2}>
                        <MDBIcon far icon="list-alt" />
                        <span>Painél de verificação</span>
                    </Stack>
                </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
                <MDBNavbarLink tag={Link} to='/reports'>
                    <Stack direction='horizontal' gap={2}>
                        <MDBIcon far icon="building" />
                        <span>Relatório</span>
                    </Stack>
                </MDBNavbarLink>
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

    const toggleLogoutModal = () => {
        setLogoutState(!logoutState)
    }

    return (
        <MDBNavbar style={{ zIndex: 10010 }} dark bgColor='dark' sticky='top' variant='dark' expand="lg">
            <MDBContainer fluid className='mx-3'>
                <LogoutModal
                    ShowState={logoutState}
                    toggleOpen={toggleLogoutModal} />
                <MDBNavbarBrand
                    href="/">
                    <Logo className="logo-app" />
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
                            <MDBBtn className='ms-auto shadow-0' color='light' onClick={() => {
                                setLogoutState(!logoutState)
                            }}>Logout</MDBBtn>
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