import { createSlice } from '@reduxjs/toolkit'


export const activeClauseSlice = createSlice({
    name: 'activeClause',
    initialState: {
        value: { id: '', name: '', text: '', code: '', has_code: false },
    },
    reducers: {
        setActiveClause: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setActiveClause } = activeClauseSlice.actions

export default activeClauseSlice.reducer