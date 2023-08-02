import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Stack, Button, Spinner } from 'react-bootstrap'

import { new_regulation } from '../context/regulationSlice'

import { useAddNewRegMutation, useGetRegsQuery } from '../context/regSliceAPI'

const Test2 = () => {

    const [newReg, setNewReg] = useState({ name: null, scope: null });

    const {
        data: Regs,
        isLoading,
        isSuccess,
        isError,
        error,
        refetch
    } = useGetRegsQuery();

    const [addNewReg, { isLoadingReg }] = useAddNewRegMutation();


    const handleSubmit = e => {
        e.preventDefault();

        const canSave = Object.values(newReg).every(Boolean) && !isLoadingReg

        if (canSave) {
            addNewReg(newReg);

            refetch();
        }
    }


    return (


        <>

            {isLoading ? <Spinner text="Loading..." /> : (isSuccess ? Regs.map(reg => reg.name) : (isError ? error.toString() : 'dsad'))}

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