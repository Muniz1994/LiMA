import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function ClauseListModal({ ShowState, HideFunction, setClauseListModalShow, activeRegulation, regulations_list, setActiveClause, setEditorKey = null, setNewClauseModalShow = null }) {


    return (
        <Modal show={ShowState} onHide={HideFunction}>
            <Modal.Header closeButton>
                <Modal.Title>{activeRegulation.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup className='h-100 overflow-scroll   clause-list-size'>

                    {regulations_list.map(reg => <>
                        {reg.name === activeRegulation.name && reg.zones.map(zone => zone.rules.map(rule =>

                            <ListGroupItem
                                variant='light'
                                id={rule.id}
                                className='d-flex justify-content-between align-items-center small'
                                action
                                as='button'
                                onClick={() => {
                                    setActiveClause({ id: rule.id, name: rule.name, text: rule.text, code: rule.code });

                                    if (setEditorKey) {
                                        setEditorKey(Math.random());
                                    };

                                    setClauseListModalShow(false);
                                }}>

                                <div className="ms-2 me-auto">
                                    <Stack direction='horizontal' gap={2}>

                                    </Stack>
                                    <div className="fw-bold">{rule.name}</div>
                                </div>

                                {rule.has_code === false ?
                                    <Badge bg="danger" pill>
                                        No code
                                    </Badge>
                                    :
                                    <Badge bg="success" pill>
                                        Has code
                                    </Badge>}
                            </ListGroupItem>))}

                    </>
                    )}
                    {activeRegulation.name !== '' &&
                        <ListGroupItem
                            className='d-flex justify-content-between align-items-start list-group-item-action'
                            action
                            onClick={() => {
                                if (setNewClauseModalShow) {
                                    setNewClauseModalShow(true)
                                };

                            }}>

                            <div className="ms-2 me-auto">
                                <div

                                    className="fw-bold">
                                    Add new <FontAwesomeIcon icon="fa-plus" />
                                </div>
                            </div>
                        </ListGroupItem>}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={HideFunction}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
