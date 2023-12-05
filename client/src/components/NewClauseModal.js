import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader } from 'mdb-react-ui-kit';

export function NewClauseModal({ ShowState, HideFunction, RegulationId, setUpdatedClause }) {

    const [clauseName, setClauseName] = useState('');
    const [externalRef, setExternalRef] = useState('');
    const [clauseText, setClauseText] = useState('');

    const HandleSubmit = (event) => {
        event.preventDefault();
        const newClause = {
            name: clauseName,
            external_reference: externalRef,
            text: clauseText,
            regulation: RegulationId
        };

        console.log(newClause);
        // TODO: change to RTK
        axios.post(process.env.REACT_APP_API_ROOT + 'rules/', newClause)
            .then(response => {
                setUpdatedClause(response.data);
                HideFunction();
            })
            .catch(err => console.log(err));

    };

    return (
        <MDBModal show={ShowState} onHide={HideFunction} className='modal-lg'>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader closeButton>
                        <Modal.Title><p>New rule</p></Modal.Title>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <Form onSubmit={HandleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Rule name: </Form.Label>
                                <Form.Control
                                    onChange={(e) => setClauseName(e.target.value)}
                                    type="text"
                                    placeholder="Insert the name of the clause" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>External reference: </Form.Label>
                                <Form.Control
                                    onChange={(e) => setExternalRef(e.target.value)}
                                    type="text"
                                    placeholder="Insert the legal reference of the rule" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Rule text</Form.Label>
                                <Form.Control
                                    onChange={(e) => setClauseText(e.target.value)}
                                    className='text-area-rule'
                                    as="textarea"
                                    placeholder="Insert the text" />
                            </Form.Group>

                            <Stack direction='horizontal' gap={2}>
                                <Button variant="dark" type="submit">
                                    Save
                                </Button>
                                <Button onClick={HideFunction} variant="light">
                                    Cancel
                                </Button>
                            </Stack>

                        </Form>
                    </MDBModalBody>

                </MDBModalContent>

            </MDBModalDialog>

        </MDBModal>
    );
}
