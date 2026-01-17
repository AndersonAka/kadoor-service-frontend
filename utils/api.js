// Utilisation du proxy Next.js via /api
// En développement, le proxy redirige vers BACKEND_URL (défini dans next.config.js)
// En production, utilisez NEXT_PUBLIC_API_URL si le proxy n'est pas disponible
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const api = {
    login: async (email, password) => {
        console.log('[API] Login request to:', `${API_BASE_URL}/auth/login`);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            console.log('[API] Login response status:', response.status, response.statusText);
            
            if (!response.ok) {
                let errorMessage = 'Identifiants invalides';
                let errorData = null;
                
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const responseText = await response.text();
                        console.error('[API] Login error response (raw):', responseText);
                        
                        if (responseText && responseText.trim() !== '') {
                            try {
                                errorData = JSON.parse(responseText);
                                console.error('[API] Login error response (parsed):', errorData);
                            } catch (parseError) {
                                console.error('[API] Failed to parse JSON error:', parseError);
                                errorMessage = responseText || `Erreur ${response.status}`;
                            }
                        }
                        
                        // NestJS retourne généralement { message: string, statusCode: number }
                        if (errorData) {
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            } else if (errorData.error) {
                                errorMessage = errorData.error;
                            } else if (errorData.statusCode) {
                                errorMessage = `Erreur ${errorData.statusCode}: Identifiants invalides`;
                            }
                        } else if (response.status === 401) {
                            errorMessage = 'Identifiants invalides';
                        } else {
                            errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur de connexion'}`;
                        }
                    } else {
                        const text = await response.text();
                        console.error('[API] Login error response (text):', text);
                        errorMessage = text || `Erreur ${response.status}: ${response.statusText || 'Identifiants invalides'}`;
                    }
                } catch (parseError) {
                    console.error('[API] Error parsing error response:', parseError);
                    if (response.status === 401) {
                        errorMessage = 'Identifiants invalides';
                    } else {
                        errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur de connexion'}`;
                    }
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('[API] Login success, data received:', data);
            return data;
        } catch (error) {
            console.error('[API] Login exception:', error);
            // Si c'est déjà une Error avec un message, la relancer
            if (error instanceof Error) {
                throw error;
            }
            // Sinon, créer une nouvelle Error
            throw new Error(error.message || 'Erreur de connexion au serveur');
        }
    },

    register: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            console.log('[API] Register response status:', response.status, response.statusText);

            if (!response.ok) {
                let errorMessage = 'Erreur lors de l\'inscription';
                let errorData = null;
                
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const responseText = await response.text();
                        console.error('[API] Register error response (raw):', responseText);
                        
                        if (responseText && responseText.trim() !== '') {
                            try {
                                errorData = JSON.parse(responseText);
                                console.error('[API] Register error response (parsed):', errorData);
                            } catch (parseError) {
                                console.error('[API] Failed to parse JSON error:', parseError);
                                errorMessage = responseText || `Erreur ${response.status}`;
                            }
                        }
                        
                        // NestJS retourne généralement { message: string, statusCode: number }
                        if (errorData) {
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            } else if (errorData.error) {
                                errorMessage = errorData.error;
                            } else if (errorData.statusCode) {
                                errorMessage = `Erreur ${errorData.statusCode}: Erreur lors de l'inscription`;
                            }
                        } else {
                            errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur lors de l\'inscription'}`;
                        }
                    } else {
                        const text = await response.text();
                        console.error('[API] Register error response (text):', text);
                        errorMessage = text || `Erreur ${response.status}: ${response.statusText || 'Erreur lors de l\'inscription'}`;
                    }
                } catch (parseError) {
                    console.error('[API] Error parsing error response:', parseError);
                    errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur lors de l\'inscription'}`;
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('[API] Register success, data received:', data);
            return data;
        } catch (error) {
            console.error('[API] Register exception:', error);
            // Si c'est déjà une Error avec un message, la relancer
            if (error instanceof Error) {
                throw error;
            }
            // Sinon, créer une nouvelle Error
            throw new Error(error.message || 'Erreur de connexion au serveur');
        }
    },

    getProfile: async (token) => {
        console.log('[API] GetProfile request to:', `${API_BASE_URL}/auth/profile`);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('[API] GetProfile response status:', response.status, response.statusText);

            if (!response.ok) {
                let errorMessage = 'Failed to fetch profile';
                let errorData = null;
                
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const responseText = await response.text();
                        console.error('[API] GetProfile error response (raw):', responseText);
                        
                        if (responseText && responseText.trim() !== '') {
                            try {
                                errorData = JSON.parse(responseText);
                                console.error('[API] GetProfile error response (parsed):', errorData);
                            } catch (parseError) {
                                console.error('[API] Failed to parse JSON error:', parseError);
                                errorMessage = responseText || `Erreur ${response.status}`;
                            }
                        }
                        
                        // NestJS retourne généralement { message: string, statusCode: number }
                        if (errorData) {
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            } else if (errorData.error) {
                                errorMessage = errorData.error;
                            } else if (errorData.statusCode) {
                                errorMessage = `Erreur ${errorData.statusCode}: ${errorMessage}`;
                            }
                        } else if (response.status === 401) {
                            errorMessage = 'Token invalide ou expiré';
                        } else if (response.status === 404) {
                            errorMessage = 'Endpoint profile non trouvé';
                        } else {
                            errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur lors de la récupération du profil'}`;
                        }
                    } else {
                        const text = await response.text();
                        console.error('[API] GetProfile error response (text):', text);
                        errorMessage = text || `Erreur ${response.status}: ${response.statusText || 'Failed to fetch profile'}`;
                    }
                } catch (parseError) {
                    console.error('[API] Error parsing error response:', parseError);
                    if (response.status === 401) {
                        errorMessage = 'Token invalide ou expiré';
                    } else if (response.status === 404) {
                        errorMessage = 'Endpoint profile non trouvé';
                    } else {
                        errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur lors de la récupération du profil'}`;
                    }
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('[API] GetProfile success, data received:', data);
            return data;
        } catch (error) {
            console.error('[API] GetProfile exception:', error);
            // Si c'est déjà une Error avec un message, la relancer
            if (error instanceof Error) {
                throw error;
            }
            // Sinon, créer une nouvelle Error
            throw new Error(error.message || 'Erreur de connexion au serveur lors de la récupération du profil');
        }
    },

    getHeroSlides: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/hero`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error(`Failed to fetch hero slides: ${response.status} ${response.statusText}`);
                // Retourner un tableau vide si l'API échoue
                return [];
            }

            return response.json();
        } catch (error) {
            console.error('Error in getHeroSlides:', error);
            // Si le backend n'est pas accessible, retourner un tableau vide
            return [];
        }
    },

    /**
     * Connexion avec Google OAuth (envoi du credential/token ID)
     */
    googleLogin: async (credential) => {
        console.log('[API] Google login request to:', `${API_BASE_URL}/auth/google/token`);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/google/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential }),
            });

            console.log('[API] Google login response status:', response.status, response.statusText);

            if (!response.ok) {
                let errorMessage = 'Échec de la connexion Google';
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    // Ignorer les erreurs de parsing
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('[API] Google login success, data received:', data);
            return data;
        } catch (error) {
            console.error('[API] Google login exception:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(error.message || 'Erreur de connexion avec Google');
        }
    },

    /**
     * Récupère les réservations de l'utilisateur connecté
     */
    getUserBookings: async (token) => {
        console.log('[API] GetUserBookings request to:', `${API_BASE_URL}/reservations`);
        try {
            const response = await fetch(`${API_BASE_URL}/reservations`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('[API] GetUserBookings response status:', response.status, response.statusText);

            if (!response.ok) {
                let errorMessage = 'Failed to fetch bookings';
                let errorData = null;
                
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType && contentType.includes('application/json')) {
                        const responseText = await response.text();
                        console.error('[API] GetUserBookings error response (raw):', responseText);
                        
                        if (responseText && responseText.trim() !== '') {
                            try {
                                errorData = JSON.parse(responseText);
                                console.error('[API] GetUserBookings error response (parsed):', errorData);
                            } catch (parseError) {
                                console.error('[API] Failed to parse JSON error:', parseError);
                                errorMessage = responseText || `Erreur ${response.status}`;
                            }
                        }
                        
                        if (errorData) {
                            if (errorData.message) {
                                errorMessage = errorData.message;
                            } else if (errorData.error) {
                                errorMessage = errorData.error;
                            }
                        } else if (response.status === 401) {
                            errorMessage = 'Token invalide ou expiré';
                        } else {
                            errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur lors de la récupération des réservations'}`;
                        }
                    } else {
                        const text = await response.text();
                        console.error('[API] GetUserBookings error response (text):', text);
                        errorMessage = text || `Erreur ${response.status}: ${response.statusText || 'Failed to fetch bookings'}`;
                    }
                } catch (parseError) {
                    console.error('[API] Error parsing error response:', parseError);
                    if (response.status === 401) {
                        errorMessage = 'Token invalide ou expiré';
                    } else {
                        errorMessage = `Erreur ${response.status}: ${response.statusText || 'Erreur lors de la récupération des réservations'}`;
                    }
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('[API] GetUserBookings success, data received:', data);
            
            // Si c'est un tableau, le retourner directement
            // Sinon, si c'est un objet avec une propriété data, retourner data
            return Array.isArray(data) ? data : (data.data || []);
        } catch (error) {
            console.error('[API] GetUserBookings exception:', error);
            if (error instanceof Error) {
                throw error;
            }
            throw new Error(error.message || 'Erreur de connexion au serveur lors de la récupération des réservations');
        }
    },
};
