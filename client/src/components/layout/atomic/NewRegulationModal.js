import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

export function NewRegulationModal({ ShowState, HideFunction, setUpdatedRegulations }) {

    const [regulationName, setRegulationName] = useState('');
    const [regulationCity, setRegulationCity] = useState('');

    const HandleSubmit = (event) => {
        event.preventDefault();
        const newRegulation = {
            name: regulationName,
            city: regulationCity
        };
        axios.post('http://127.0.0.1:8000/api/licence/regulations/', newRegulation)
            .then(response => {
                console.log(response.data);
                setUpdatedRegulations(response.data);
                HideFunction();
            })
            .catch(err => console.log(err));

    };

    return (
        <Modal show={ShowState} onHide={HideFunction}>
            <Modal.Header closeButton>
                <Modal.Title><p>New Regulation</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={HandleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Regulation Name</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={(e) => setRegulationName(e.target.value)}
                            placeholder="Insert the name of the regulation" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            onChange={(e) => setRegulationCity(e.target.value)}
                            type="text"
                            placeholder="Insert the city" />
                    </Form.Group>
                    <Stack direction='horizontal' gap={2}>
                        <input className="btn btn-theme-b text-white" type="submit">
                        </input>
                        <Button onClick={HideFunction} variant="theme-e text-white">
                            Cancel
                        </Button>
                    </Stack>

                </Form>
            </Modal.Body>
        </Modal>
    );
}
