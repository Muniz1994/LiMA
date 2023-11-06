import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import { MDBIcon, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalHeader, MDBModalTitle } from 'mdb-react-ui-kit';

export function NewRegulationModal({ ShowState, HideFunction, setUpdatedRegulations }) {

    const [regulationName, setRegulationName] = useState('');
    const [regulationCity, setRegulationCity] = useState('');

    const HandleSubmit = (event) => {
        event.preventDefault();
        const newRegulation = {
            name: regulationName,
            scope: regulationCity
        };
        axios.post(process.env.REACT_APP_API_ROOT + 'regulations/', newRegulation)
            .then(response => {
                console.log(response.data);
                setUpdatedRegulations(response.data);
                HideFunction();
            })
            .catch(err => console.log(err));

    };

    return (
        <MDBModal show={ShowState} onHide={HideFunction}>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader closeButton>
                        <MDBModalTitle>Novo regulamento <MDBIcon fas icon="book" /></MDBModalTitle>
                    </MDBModalHeader>
                    <MDBModalBody>
                        <Form onSubmit={HandleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome do regulamento</Form.Label>
                                <Form.Control
                                    type="text"
                                    onChange={(e) => setRegulationName(e.target.value)}
                                    placeholder="Insira o nome do regulamento" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Âmbito</Form.Label>
                                <Form.Control
                                    onChange={(e) => setRegulationCity(e.target.value)}
                                    type="text"
                                    placeholder="Insira o âmbito do regulamento" />
                            </Form.Group>
                            <Stack direction='horizontal' gap={2}>
                                <Button variant="dark" type="submit">
                                    Salvar
                                </Button>
                                <Button onClick={HideFunction} variant="light">
                                    Cancelar
                                </Button>
                            </Stack>

                        </Form>
                    </MDBModalBody>

                </MDBModalContent>
            </MDBModalDialog>

        </MDBModal>
    );
}
