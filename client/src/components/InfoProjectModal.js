import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Modal from 'react-bootstrap/Modal';

export function InfoProjectModal({ ShowState, HideFunction, regulation, regulations_list }) {

    const [modalRegulation, setModalRegulation] = useState({})

    useEffect(() => {
        if (regulation) {
            setModalRegulation(regulations_list.find(reg => reg.name === regulation))
        }
    }, [regulations_list, regulation])

    return (
        <Modal show={ShowState} onHide={HideFunction}>
            <Modal.Header closeButton>
                <Modal.Title>{regulation}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>City: {modalRegulation.city}</p>
                <p>Came into effect: {modalRegulation.came_into_effect}</p>
                <p>Creation date: {modalRegulation.date_created}</p>
                <p>Last modified date: {modalRegulation.date_modified}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={HideFunction}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
