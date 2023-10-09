import React, { useEffect, useState } from 'react';


// React-Boostrap imports
import { Spinner, Stack } from 'react-bootstrap';

import {
    MDBContainer,
    MDBCol,
    MDBRow,
} from 'mdb-react-ui-kit';

import { MDBSpinner, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useVerificationsQuery } from '../context/SliceAPI'
import { useGetUserQuery } from '../context/userSliceAPI';
import { NewVerificationModal } from '../components/NewVerificationModal';

const ProjectUser = ({ userID }) => {
    const {
        data: User,
        error,
        isLoading: isLoadingUser,
    } = useGetUserQuery(userID);

    return (
        <>
            {error ? console.log(error) : isLoadingUser ? <MDBSpinner text="Loading..." /> : User.username}
        </>
    )
}

library.add(faCog, faPlus);

const CheckHub = () => {

    const [showNewVerficationModal, setShowNewVerificationModal] = useState(false);

    const toggleNewVerificationModal = () => setShowNewVerificationModal(!showNewVerficationModal);

    const {
        data: Verifications,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useVerificationsQuery();



    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login/');
        } else {

        }
    }, []);

    return (
        <>
            <NewVerificationModal
                toggleShow={toggleNewVerificationModal}
                basicModal={showNewVerficationModal}
                setBasicModal={setShowNewVerificationModal} />
            <MDBContainer fluid className='h-100 max-h-100 overflow-hidden px-5 px-xl-3'>
                <MDBRow className='h-100'>
                    {/* Regulation left panel start */}
                    <MDBCol>
                        {/* Regulation choose start */}
                        <MDBRow className=''>
                            <MDBCol className='p-2'>
                                <MDBBtn
                                    size='sm'
                                    className='m-2'
                                    color='dark'
                                    onClick={toggleNewVerificationModal}>
                                    <Stack gap={2} direction="horizontal">
                                        <span>New verification</span>
                                        <FontAwesomeIcon icon="fa-plus" />
                                    </Stack>
                                </MDBBtn>
                            </MDBCol>
                        </MDBRow>
                    </MDBCol>
                    {/* Regulation left panel end */}
                    <MDBCol xs={12} xl={10} xxl={10} className="d-flex justify-content-center ">
                        <div className='d-flex align-items-start flex-fill mt-4'>
                            <MDBTable align='middle' bordered>
                                <MDBTableHead>
                                    <tr>
                                        <th scope='col'>File</th>
                                        <th scope='col'>Regulations</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {isLoading ? <MDBSpinner text="Loading..." />
                                        : Verifications.map(verification =>
                                            <tr key={verification.id} >
                                                <td>{verification.file}</td>
                                                <td>{verification.regulations}</td>
                                            </tr>
                                        )
                                    }
                                </MDBTableBody>
                            </MDBTable>
                        </div>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
};

export default CheckHub;