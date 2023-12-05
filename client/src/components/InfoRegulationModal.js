import React, { useState, useEffect } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export function InfoRegulationModal({ ShowState, setShowState, toggleOpen, regulation, regulations_list }) {

    const [modalRegulation, setModalRegulation] = useState({})

    useEffect(() => {
        if (regulation) {
            setModalRegulation(regulations_list.find(reg => reg.name === regulation))
        }
    }, [regulations_list, regulation])

    return (
        <MDBModal show={ShowState} setopen={setShowState} tabIndex='-1'>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>{regulation}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <p>City: {modalRegulation.scope}</p>
                    </MDBModalBody>

                    <MDBModalFooter>
                        <MDBBtn color='black' onClick={toggleOpen}>
                            Close
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
