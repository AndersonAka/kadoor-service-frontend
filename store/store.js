import { configureStore } from "@reduxjs/toolkit";
import agentSlice from "../features/agent/agentSlice";
import { api } from "../features/api/api";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";
import filterSlice from "../features/filter/filterSlice";
import propertiesSlice from "../features/properties/propertiesSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        properties: propertiesSlice,
        filter: filterSlice,
        agent: agentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware).concat(authApi.middleware),
});
