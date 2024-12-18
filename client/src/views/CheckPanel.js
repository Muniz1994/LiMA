import React, { useState } from 'react';

// React-Boostrap imports
import {Stack } from 'react-bootstrap';

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
import { NewVerificationModal } from '../components/NewVerificationModal';
import { AddFileModal } from '../components/AddFileModal';

library.add(faCog, faPlus);


const CheckPanel = () => {

    const [showNewVerficationModal, setShowNewVerificationModal] = useState(false);
    const [addIfcModal, setAddIfcModal] = useState(false);
    const [activeVerificationID, setActiveVerificationID] = useState(null);

    const hideIfcModal = () => setAddIfcModal(false);

    const toggleNewVerificationModal = () => setShowNewVerificationModal(!showNewVerficationModal);

    const {
        data: Verifications,
        isLoading,
    } = useVerificationsQuery();

    return (
        <>
            <NewVerificationModal
                toggleShow={toggleNewVerificationModal}
                basicModal={showNewVerficationModal}
                setBasicModal={setShowNewVerificationModal} />
            <AddFileModal
                ShowState={addIfcModal}
                HideFunction={hideIfcModal}
                verificationId={activeVerificationID} />

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
                                    onClick={toggleNewVerificationModal}
                                    outline>
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
                            <MDBTable align='middle'>
                                <MDBTableHead className='bg-light p-2 border-top border-bottom'>
                                    <tr>
                                        <th scope='col'>Creation date</th>
                                        <th scope='col'>IFC file</th>
                                        <th scope='col'></th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {isLoading ? <MDBSpinner text="Loading..." />
                                        : Verifications.map(verification =>
                                            <tr key={verification.id} >
                                                <td>{verification.time_executed}</td>
                                                {verification.ifc_file ?
                                                    <td>{verification.ifc_file}</td> :
                                                    <td>
                                                        <MDBBtn
                                                            color='dark'
                                                            onClick={() => {
                                                                setAddIfcModal(true);
                                                                setActiveVerificationID(verification.id);
                                                            }}>Add file
                                                        </MDBBtn>
                                                    </td>}

                                                <td><MDBBtn outline color='dark'>info</MDBBtn></td>
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

export default CheckPanel;