import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const base_auth_url = process.env.EXPO_PUBLIC_BASE_AUTH_URL
const auth_api_key = process.env.EXPO_PUBLIC_AUTH_API_KEY

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: base_auth_url}),
    endpoints: (builder) => ({
        postSignup: builder.mutation({
            query:({...userData}) => ({
                url:`accounts:signUp?key=${auth_api_key}`,
                method: 'POST',
                body: userData
            })
        }),
        postLogin: builder.mutation({
            query:({...userData}) => ({
                url:`accounts:signInWithPassword?key=${auth_api_key}`,
                method: 'POST',
                body: userData
            })
        })
    })
})

export const {usePostSignupMutation, usePostLoginMutation} = authApi
