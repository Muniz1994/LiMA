import { createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

export const regulationSlice = createSlice({
    name: 'regulation',
    initialState: {
        value: [{ name: '' }],
    },
    reducers: {
        update_regulations: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { update_regulations } = regulationSlice.actions;

//------------------------------------------------------------------------------
// Get regulations thunk
//------------------------------------------------------------------------------
export const get_regulations = () => async dispatch => {

    try {

        const regulations = await axios.get(process.env.REACT_APP_API_ROOT + 'regulations/')

        dispatch(update_regulations(regulations.data))
    } catch (err) {
        console.log(err)
    }

};

export const new_regulation = newReg => async dispatch => {

    try {
        await axios.post(process.env.REACT_APP_API_ROOT + 'regulations/', newReg)

        dispatch(get_regulations())

    } catch (err) {

        console.log(err)
    }

};

export default regulationSlice.reducer