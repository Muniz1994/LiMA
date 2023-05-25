import React, { useState, useEffect, useRef } from 'react';


// React-Boostrap imports
import { Container, Row, Col, Button, Card, Stack } from 'react-bootstrap';

import { CDBCard, CDBCardBody, CDBBtn } from 'cdbreact';



// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';

import Sidebar from '../components/Sidebar';


library.add(faCog, faPlus);

const Projects = () => {

    // Page loading state
    const [loading, setLoading] = useState(true);

    // All regulations data
    const [regulations_list, setRegulationList] = useState([])

    // State of active regulation and clause
    const [activeRegulation, setActiveRegulation] = useState({ id: '', name: '' })
    const [activeClause, setActiveClause] = useState({ id: '', name: '', text: '', code: '', has_code: false })

    // Modals States
    const [infoRegulationModalShow, setInfoRegulationModalShow] = useState(false);
    const [clauseListModalShow, setClauseListModalShow] = useState(false);

    const [ifcFile, setIfcFile] = useState(null);
    const [highlightedElements, setHighlightedElements] = useState(null);




    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login');
        } else {
            fetch('http://127.0.0.1:8000/api/v1/users/auth/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setLoading(false);
                });
            fetch('http://127.0.0.1:8000/api/licence/regulations/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    setRegulationList(data);
                })
                .catch(err => {
                    console.log("There must have been an error somewhere in your code", err.message)
                });;
        }
    }, []);

    return (
        <>
            <Row className='h-100'>
                {/* Regulation left panel start */}
                <Col>
                    {/* Regulation choose start */}
                    <Row className=''>
                        <Col className='p-2'>
                            <Button
                                size='sm'
                                className='m-2'
                                variant='light'>
                                <Stack gap={2} direction="horizontal">
                                    <span>New project</span>
                                    <FontAwesomeIcon icon="fa-plus" />
                                </Stack>
                            </Button>
                        </Col>
                    </Row>
                    <Row className=''>
                        <Col className='p-2'>
                            dasd
                        </Col>
                    </Row>
                </Col>
                {/* Regulation left panel end */}
                <Col xs={12} xl={10} xxl={10} className="h-100 border border-left max-h-100">
                    <Row className='h-100'>
                        <Col md={4}>
                            <Card>
                                <Card.Header>Project</Card.Header>
                                <Card.Body>
                                    <Card.Title>Project A</Card.Title>
                                    <Card.Text>
                                        <Stack direction='vertical'>
                                            <span>Adress: street tralala</span>
                                            <span>Responsible: xx/xx/xxxx</span>
                                            <span>Date created: xx/xx/xxxx</span>
                                        </Stack>
                                    </Card.Text>
                                    <Button variant="light">More info</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Header>Project</Card.Header>
                                <Card.Body>
                                    <Card.Title>Project A</Card.Title>
                                    <Card.Text>
                                        <Stack direction='vertical'>
                                            <span>Adress: street tralala</span>
                                            <span>Responsible: xx/xx/xxxx</span>
                                            <span>Date created: xx/xx/xxxx</span>
                                        </Stack>
                                    </Card.Text>
                                    <Button variant="light">More info</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <Card.Header>Project</Card.Header>
                                <Card.Body>
                                    <Card.Title>Project A</Card.Title>
                                    <Card.Text>
                                        <Stack direction='vertical'>
                                            <span>Adress: street tralala</span>
                                            <span>Responsible: xx/xx/xxxx</span>
                                            <span>Date created: xx/xx/xxxx</span>
                                        </Stack>
                                    </Card.Text>
                                    <Button variant="light">More info</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Col>
            </Row>
        </>
    );
};

export default Projects;