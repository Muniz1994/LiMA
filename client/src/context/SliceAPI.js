import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api`
    reducerPath: 'api',
    // The API root
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_ROOT }),
    tagTypes: ['Regulations', 'Rules', 'Projects'],
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        //-----------------------------------------------------------------------------------------------------------------------
        // Regulations endpoints
        //-----------------------------------------------------------------------------------------------------------------------
        regulations: builder.query({
            query: () => 'regulations/',
            providesTags: ['Regulations']
        }),
        getRegulation: builder.query({
            query: regulationID => `regulations/${regulationID}`
        }),
        addNewReg: builder.mutation({
            query: newReg => ({
                url: 'regulations/',
                method: 'POST',
                body: newReg
            }),
            invalidatesTags: ['Regulations']
        }),
        deleteReg: builder.mutation({
            query: regID => ({
                url: `regulations/${regID}/`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Regulations']
        }),
        //-----------------------------------------------------------------------------------------------------------------------
        // Rules endpoints
        //-----------------------------------------------------------------------------------------------------------------------
        rules: builder.query({

            query: () => 'rules/',
            providesTags: ['Rules']
        }),
        getRule: builder.query({
            query: ruleID => `regulations/${ruleID}/`
        }),
        addNewRule: builder.mutation({
            query: newRule => ({
                url: 'regulations/',
                method: 'POST',
                body: newRule
            })
        }),
        //-----------------------------------------------------------------------------------------------------------------------
        // Projects endpoints
        //-----------------------------------------------------------------------------------------------------------------------
        projects: builder.query({
            query: () => 'projects/',
            providesTags: ['Projects']
        }),
        addNewProject: builder.mutation({
            query: newProject => ({
                url: 'projects/',
                method: 'POST',
                body: newProject
            })
        }),
        getProject: builder.query({
            query: projectID => `projects/${projectID}`
        }),
    })
})

export const {
    useRegulationsQuery,
    useGetRegulationQuery,
    useAddNewRegMutation,
    useDeleteRegMutation,
    useProjectsQuery,
    useGetProjectQuery,
    useAddNewProjectMutation, } = apiSlice

