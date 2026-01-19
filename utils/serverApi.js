// Utilitaire pour les appels API côté serveur (Server Components)
// Utilise directement BACKEND_URL car le proxy Next.js ne fonctionne pas dans les Server Components

// BACKEND_URL doit être l'URL complète du backend sans /api à la fin
// Exemple: https://votre-backend.onrender.com
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:3001';

export const serverApi = {
    async getVehicleById(id) {
        try {
            const url = `${BACKEND_URL}/vehicles/${id}`;
            console.log(`[serverApi] Fetching vehicle from: ${url}`);
            
            const response = await fetch(url, {
                cache: 'no-store', // Pour avoir les données à jour
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                console.error(`[serverApi] Vehicle ${id} not found:`, response.status, response.statusText);
                // Si c'est une erreur 404, retourner null (normal)
                if (response.status === 404) {
                    return null;
                }
                // Pour les autres erreurs, logger et retourner null
                console.error(`[serverApi] Unexpected error fetching vehicle ${id}:`, response.status);
                return null;
            }
            
            const data = await response.json();
            console.log(`[serverApi] Vehicle ${id} fetched successfully`);
            return data;
        } catch (error) {
            console.error(`[serverApi] Error in getVehicleById(${id}):`, error.message);
            console.error(`[serverApi] BACKEND_URL: ${BACKEND_URL}`);
            return null;
        }
    },

    async getApartmentById(id) {
        try {
            const url = `${BACKEND_URL}/apartments/${id}`;
            console.log(`[serverApi] Fetching apartment from: ${url}`);
            
            const response = await fetch(url, {
                cache: 'no-store', // Pour avoir les données à jour
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                console.error(`[serverApi] Apartment ${id} not found:`, response.status, response.statusText);
                // Si c'est une erreur 404, retourner null (normal)
                if (response.status === 404) {
                    return null;
                }
                // Pour les autres erreurs, logger et retourner null
                console.error(`[serverApi] Unexpected error fetching apartment ${id}:`, response.status);
                return null;
            }
            
            const data = await response.json();
            console.log(`[serverApi] Apartment ${id} fetched successfully`);
            return data;
        } catch (error) {
            console.error(`[serverApi] Error in getApartmentById(${id}):`, error.message);
            console.error(`[serverApi] BACKEND_URL: ${BACKEND_URL}`);
            return null;
        }
    },
};
