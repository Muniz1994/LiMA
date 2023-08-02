import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Stack, Button, Spinner } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup';

import { new_regulation } from '../context/regulationSlice'

import { useAddNewRegMutation, useDeleteRegMutation, useRegulationsQuery } from '../context/SliceAPI'

const Test2 = () => {

    const [newReg, setNewReg] = useState({ name: null, scope: null });

    const {
        data: Regs,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useRegulationsQuery();

    const [addNewReg, { isLoadingReg }] = useAddNewRegMutation();

    const [deleteReg, { isLoading: isDeletingReg }] = useDeleteRegMutation();


    const handleSubmit = e => {
        e.preventDefault();

        const canSave = Object.values(newReg).every(Boolean) && !isLoadingReg

        if (canSave) {
            addNewReg(newReg);
        }
    }

    return (


        <>

            <ListGroup>
                {isLoading ? <Spinner text="Loading..." /> : (isSuccess ? Regs.map(reg => <ListGroup.Item key={reg.id} className='d-flex'><span className='me-auto'>{reg.name}</span> {!isDeletingReg ? <Button variant='danger' onClick={() => { deleteReg(reg.id) }}>delete</Button> : <Spinner text="Loading..." />}</ListGroup.Item>) : (isError ? error.toString() : 'dsad'))}
            </ListGroup>


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

export default Test2;