"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "../utils/api";
import { useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    console.log('[AuthContext] Initializing auth with token');
                    const profile = await api.getProfile(token);
                    console.log('[AuthContext] Profile loaded successfully:', profile);
                    setUser(profile);
                } catch (error) {
                    console.error("[AuthContext] Auth initialization failed:", error);
                    // Ne pas afficher d'erreur à l'utilisateur si c'est juste un token expiré
                    // Supprimer le token invalide
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            console.log('[AuthContext] Attempting login for:', email);
            const data = await api.login(email, password);
            console.log('[AuthContext] Login response received:', data);
            
            if (!data || !data.access_token) {
                console.error('[AuthContext] No access_token in response');
                return { success: false, error: 'Invalid response from server' };
            }
            
            localStorage.setItem("token", data.access_token);
            
            // Utiliser les données utilisateur de la réponse si disponibles
            if (data.user) {
                setUser(data.user);
                
                // Stocker le flag pour la notification de connexion
                sessionStorage.setItem('showLoginSuccess', 'true');
                sessionStorage.setItem('loginUserName', data.user.firstName || data.user.email);
                
                // Toujours rediriger vers la page d'accueil
                router.push('/');
                return { success: true };
            }
            
            // Sinon, essayer de récupérer le profil
            try {
                const profile = await api.getProfile(data.access_token);
                setUser(profile);
                
                // Stocker le flag pour la notification de connexion
                sessionStorage.setItem('showLoginSuccess', 'true');
                sessionStorage.setItem('loginUserName', profile.firstName || profile.email);
                
                // Toujours rediriger vers la page d'accueil
                router.push('/');
                return { success: true };
            } catch (profileError) {
                console.error('[AuthContext] Error fetching profile:', profileError);
                // Utiliser les données de base du login même si getProfile échoue
                if (data.user) {
                    setUser(data.user);
                    sessionStorage.setItem('showLoginSuccess', 'true');
                    sessionStorage.setItem('loginUserName', data.user.firstName || data.user.email);
                    router.push('/');
                    return { success: true };
                }
                throw profileError;
            }
        } catch (error) {
            console.error('[AuthContext] Login error:', error);
            return { success: false, error: error.message || 'Login failed' };
        }
    };

    /**
     * Connexion avec Google OAuth
     */
    const loginWithGoogle = useCallback(async (credential) => {
        try {
            console.log('[AuthContext] Attempting Google login');
            const data = await api.googleLogin(credential);
            console.log('[AuthContext] Google login response received:', data);
            
            if (!data || !data.access_token) {
                console.error('[AuthContext] No access_token in Google response');
                return { success: false, error: 'Invalid response from server' };
            }
            
            localStorage.setItem("token", data.access_token);
            
            // Déterminer l'utilisateur
            let userData = data.user;
            if (!userData) {
                // Récupérer le profil si non fourni
                userData = await api.getProfile(data.access_token);
            }
            
            // Mettre à jour l'état utilisateur
            setUser(userData);
            
            // Stocker le flag pour la notification de connexion
            sessionStorage.setItem('showLoginSuccess', 'true');
            sessionStorage.setItem('loginUserName', userData.firstName || userData.email);
            
            // Forcer un rechargement complet de la page pour éviter que la page reste figée
            // Utiliser window.location.href avec la locale pour un rechargement complet
            window.location.href = `/${locale}/`;
            
            return { success: true };
        } catch (error) {
            console.error('[AuthContext] Google login error:', error);
            return { success: false, error: error.message || 'Google login failed' };
        }
    }, [locale]);

    /**
     * Définir l'utilisateur à partir d'un token (pour callback OAuth)
     */
    const setUserFromToken = useCallback(async (token) => {
        try {
            localStorage.setItem("token", token);
            const profile = await api.getProfile(token);
            setUser(profile);
            return { success: true, user: profile };
        } catch (error) {
            console.error('[AuthContext] Error setting user from token:', error);
            localStorage.removeItem("token");
            return { success: false, error: error.message };
        }
    }, []);

    const register = async (userData) => {
        try {
            await api.register(userData);
            router.push("/login");
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ 
            user,
            setUser,
            login, 
            loginWithGoogle, 
            setUserFromToken,
            register, 
            logout, 
            loading 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
