import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Stack, Button } from 'react-bootstrap'

import { new_regulation } from '../context/regulationSlice'

const Test = () => {

    const [newReg, setNewReg] = useState({ name: '', scope: '' });

    const dispatch = useDispatch()

    const regulations = useSelector((state) => state.regulation.value)

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(new_regulation(newReg));
    };


    return (

        <>
            {regulations.map(reg => reg.name
            )}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Regulation Name</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => setNewReg({ ...newReg, name: e.target.value })}
                        placeholder="Insert the name of the regulation" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Scope</Form.Label>
                    <Form.Control
                        onChange={(e) => setNewReg({ ...newReg, scope: e.target.value })}
                        type="text"
                        placeholder="Insert the scope" />
                </Form.Group>
                <Stack direction='horizontal' gap={2}>
                    <Button variant="dark" type="submit">
                        Save
                    </Button>
                </Stack>

            </Form>
        </>

    )
}

export default Test;