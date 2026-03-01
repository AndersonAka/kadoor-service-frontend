"use client";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import { AuthProvider } from "@/context/AuthContext";
import { ToastProvider } from "@/context/ToastContext";
import { LoginModalProvider } from "@/context/LoginModalContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import ScrollToTop from "@/components/common/ScrollTop";
import LoginSuccessHandler from "@/components/common/LoginSuccessHandler";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import { useEffect } from "react";
// Pure Tailwind CSS - Bootstrap removed
import "@/app/globals.css";
import "../../public/assets/scss/index.scss";
import "rc-slider/assets/index.css";

const Providers = ({ children }) => {
    return (
        <Provider store={store}>
            <ToastProvider>
                <CurrencyProvider>
                    <AuthProvider>
                        <LoginModalProvider>
                            {children}
                            <PopupSignInUp />
                            <ScrollToTop />
                            <LoginSuccessHandler />
                        </LoginModalProvider>
                    </AuthProvider>
                </CurrencyProvider>
            </ToastProvider>
        </Provider>
    );
};

export default Providers;
