import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux'

// React-Boostrap imports
import { Container, Row, Col, Button, Card, Stack } from 'react-bootstrap';

// Import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';

import { get_projects } from '../context/projectSlice';


library.add(faCog, faPlus);

const Projects = () => {

    const dispatch = useDispatch();

    const projects = useSelector((state) => state.project.value);

    useEffect(() => {
        if (localStorage.getItem('token') === null) {
            window.location.replace('http://localhost:3000/login/');
        } else {

            dispatch(get_projects());

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

                            {projects.map(project =>


                                <Card className='mb-2' style={{ width: '30rem' }}>
                                    <Card.Header>Project</Card.Header>
                                    <Card.Body>
                                        <Card.Title>{project.name}</Card.Title>
                                        <Card.Text>
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