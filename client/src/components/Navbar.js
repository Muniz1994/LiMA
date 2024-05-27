// React imports
import React, { useState } from 'react';

// Import router links
import { Link } from 'react-router-dom';


// Import logo
import { ReactComponent as Logo } from '../assets/lima_new_2.svg'


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
} from 'mdb-react-ui-kit';

import { faPuzzlePiece, faBuilding, faListCheck } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faPuzzlePiece, faBuilding, faListCheck);


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


const Navigationbar = props => {

    const [showNav, setShowNav] = useState(false);


    return (
        <MDBNavbar style={{ zIndex: 10010 }} dark bgColor='dark' sticky='top' variant='dark' expand="lg">
            <MDBContainer fluid className='mx-3'>
            
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
                            <MDBNavbarNav className='d-flex justify-content-center'>
                                <InternalLinks />
                            </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    );
};

export default Navigationbar;