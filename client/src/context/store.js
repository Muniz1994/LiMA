import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import { apiSlice } from './SliceAPI'
import { userApiSlice } from './userSliceAPI'
import viewerReducer from './viewerSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        viewer: viewerReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        (getDefaultMiddleware().concat(apiSlice.middleware)).concat(userApiSlice.middleware)
})