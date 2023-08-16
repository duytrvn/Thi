import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuth } from "@/interfaces/auth";

export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    }),
    tagTypes: ["Auth"],
    endpoints: (builder) => ({
        Signin: builder.mutation({
            query: (data: IAuth) => ({
                url: `signin`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Auth"],
        }),
        Signup: builder.mutation({
            query: (data: IAuth) => ({
                url: `signup`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Auth"],
        })
    })
})

export const { useSigninMutation , useSignupMutation } = authApi