import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './SliceAPI'
import regulationReducer from './regulationSlice'
import activeRegulationReducer from './activeRegulationSlice'
import activeClauseReducer from './activeClauseSlice'
import { userApiSlice } from './userSliceAPI'
import viewerReducer from './viewerSlice'

export default configureStore({
    reducer: {
        regulations_list: regulationReducer,
        activeRegulation: activeRegulationReducer,
        activeClause: activeClauseReducer,
        viewer: viewerReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        (getDefaultMiddleware().concat(apiSlice.middleware)).concat(userApiSlice.middleware)
})