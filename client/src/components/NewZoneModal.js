import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

export function NewZoneModal({ ShowState, HideFunction, regulationId, setUpdatedZone }) {

    const [zoneName, setZoneName] = useState('');


    const HandleSubmit = (event) => {
        event.preventDefault();

        const newZone = {
            name: zoneName,
            regulation: regulationId
        };
        axios.post(process.env.REACT_APP_API_ROOT + 'zones/', newZone)
            .then(response => {
                setUpdatedZone(response.data);
                HideFunction();
            })
            .catch(err => console.log(err));

    };

    return (
        <Modal show={ShowState} onHide={HideFunction} className='modal-md'>
            <Modal.Header closeButton>
                <Modal.Title><p>New zone</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={HandleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Zone name: </Form.Label>
                        <Form.Control
                            onChange={(e) => setZoneName(e.target.value)}
                            type="text"
                            placeholder="Insert the name of the zone" />
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
            </Modal.Body>
        </Modal>
    );
}
