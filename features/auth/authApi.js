import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Utilisation du proxy Next.js via /api
// En développement, le proxy redirige vers BACKEND_URL (défini dans next.config.js)
// En production, utilisez NEXT_PUBLIC_API_URL si le proxy n'est pas disponible
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/auth/login",
                method: "POST",
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: "/auth/register",
                method: "POST",
                body: userData,
            }),
        }),
        getProfile: builder.query({
            query: () => "/auth/profile",
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetProfileQuery } = authApi;
