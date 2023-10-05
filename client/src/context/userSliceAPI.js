import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApiSlice = createApi({
    // The cache reducer expects to be added at `state.api`
    reducerPath: 'user-api',
    // The API root
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_ROOT }),
    tagTypes: ['Users'],
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        //--------------------------------------------------------------------
        // Users endpoints
        //--------------------------------------------------------------------
        users: builder.query({
            query: () => 'users/',
            providesTags: ['Regulations']
        }),
        getUser: builder.query({
            query: userID => `users/${userID}/`
        }),

    })
})

export const {
    useGetUserQuery } = userApiSlice

