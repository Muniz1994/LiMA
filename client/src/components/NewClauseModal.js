import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';

export function NewClauseModal({ ShowState, HideFunction, regulationId, setUpdatedClause }) {

    const [clauseName, setClauseName] = useState('');
    const [clauseText, setClauseText] = useState('');

    const HandleSubmit = (event) => {
        event.preventDefault();
        const newClause = {
            name: clauseName,
            text: clauseText,
            regulation: regulationId
        };
        axios.post('http://127.0.0.1:8000/api/licence/clause/', newClause)
            .then(response => {
                setUpdatedClause(response.data);
                HideFunction();
            })
            .catch(err => console.log(err));

    };

    return (
        <Modal show={ShowState} onHide={HideFunction}>
            <Modal.Header closeButton>
                <Modal.Title><p>New Clause</p></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={HandleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Clause Name</Form.Label>
                        <Form.Control
                            onChange={(e) => setClauseName(e.target.value)}
                            type="text"
                            placeholder="Insert the name of the clause" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Clause text</Form.Label>
                        <Form.Control
                            onChange={(e) => setClauseText(e.target.value)}
                            type="text"
                            placeholder="Insert the text" />
                    </Form.Group>
                    <Stack direction='horizontal' gap={2}>
                        <Button variant="theme-b text-white" type="submit">
                            Save
                        </Button>
                        <Button onClick={HideFunction} variant="theme-e text-white">
                            Cancel
                        </Button>
                    </Stack>

                </Form>
            </Modal.Body>
        </Modal>
    );
}
