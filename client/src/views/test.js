import React, { useState, useEffect, useRef, useContext } from 'react';

import axios from 'axios';

import { useAppContext } from '../middleware/context-provider';

// React-Boostrap imports
import { Container, Row, Col, Button, Card, Stack } from 'react-bootstrap';

import { RegulationsContext, RegulationsDispatchContext } from '../components/Context/RegulationsContext';


const Test = () => {

    const regulations = useAppContext();
    const dispatch = useAppContext()[1];

    useEffect(() => {
        dispatch({ type: 'GET-REGULATIONS' });

    }, []);

    return (
        <>

            <Container fluid className='h-100 max-h-100 overflow-hidden px-5 px-xl-3'>
                a
                {console.log(regulations)}


            </Container>
        </>
    );
};

export default Test;