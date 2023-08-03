import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import regulationReducer from './regulationSlice'
import projectReducer from './projectSlice'
import { apiSlice } from './SliceAPI'
import { userApiSlice } from './userSliceAPI'

export default configureStore({
    reducer: {
        counter: counterReducer,
        regulation: regulationReducer,
        project: projectReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        (getDefaultMiddleware().concat(apiSlice.middleware)).concat(userApiSlice.middleware)
})