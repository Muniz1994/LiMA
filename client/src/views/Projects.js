import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';

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
    const [projectList, setProjectList] = useState([])





    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login/');
        } else {

            // Confirm user authentication
            axios.get(process.env.REACT_APP_API_ROOT + 'users/auth/user/',
                {
                    headers: {
                        'Authorization': `Token ${localStorage.getItem('token')}`
                    }
                })
                .then(data => {
                    setLoading(false);
                })
                .catch(
                    console.log
                );

            // Get regulations
            axios.get(process.env.REACT_APP_API_ROOT + 'projects/')
                .then(response => {
                    setProjectList(response.data);
                })
                .catch(
                    console.log
                );
        }
    }, []);

    return (
        <>
            <Container fluid className='h-100 max-h-100 overflow-hidden px-5 px-xl-3'>
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
                        <Row className='d-flex align-items-center'>

                            {projectList.map(project =>


                                <Card className='mb-2' style={{ width: '30rem' }}>
                                    <Card.Header>Project</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{project.name}</Card.Title>
                                        <Card.Text>
                                            <Stack direction='vertical'>
                                                <span>Adress: {project.urbanistic_operation.adress ? (project.urbanistic_operation.adress).substring(0, 30) : 'sem'}</span>
                                                <span>Responsible: {project.user}</span>
                                                <span>Date created: {project.date_created}</span>
                                            </Stack>
                                        </Card.Text>
                                        <Button variant="light">More info</Button>
                                    </Card.Body>
                                </Card>

                            )}


                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Projects;