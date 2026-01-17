"use client";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import ScrollToTop from "@/components/common/ScrollTop";
import LoginSuccessHandler from "@/components/common/LoginSuccessHandler";
import { useEffect } from "react";
import "../../public/assets/scss/index.scss";
import "rc-slider/assets/index.css";

if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
}

const Providers = ({ children }) => {
    return (
        <Provider store={store}>
            <ToastProvider>
                <AuthProvider>
                    {children}
                    <ScrollToTop />
                    <LoginSuccessHandler />
                </AuthProvider>
            </ToastProvider>
        </Provider>
    );
};

export default Providers;
