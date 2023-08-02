import { createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        value: [{ name: '' }],
    },
    reducers: {
        update_projects: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { update_projects } = projectSlice.actions;

//------------------------------------------------------------------------------
// Get projects thunk
//------------------------------------------------------------------------------
export const get_projects = () => async dispatch => {

    try {

        const projects = await axios.get(process.env.REACT_APP_API_ROOT + 'projects/')

        dispatch(update_projects(projects.data))
    } catch (err) {
        console.log(err)
    }

};

export const new_project = newReg => async dispatch => {

    try {
        await axios.post(process.env.REACT_APP_API_ROOT + 'projects/', newReg)

        dispatch(get_projects())

    } catch (err) {

        console.log(err)
    }

};

export default projectSlice.reducer