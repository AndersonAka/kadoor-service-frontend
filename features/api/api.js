import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Utilisation du proxy Next.js via /api
// En développement, le proxy redirige vers BACKEND_URL (défini dans next.config.js)
// En production, utilisez NEXT_PUBLIC_API_URL si le proxy n'est pas disponible
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: (builder) => ({}),
});
