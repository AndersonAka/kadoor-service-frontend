// Utilitaire pour les appels API côté serveur (Server Components)
// Utilise directement BACKEND_URL car le proxy Next.js ne fonctionne pas dans les Server Components

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export const serverApi = {
    async getVehicleById(id) {
        try {
            const response = await fetch(`${BACKEND_URL}/vehicles/${id}`, {
                cache: 'no-store', // Pour avoir les données à jour
            });
            if (!response.ok) {
                console.error(`Vehicle ${id} not found:`, response.status, response.statusText);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error(`Error in serverApi.getVehicleById(${id}):`, error);
            return null;
        }
    },

    async getApartmentById(id) {
        try {
            const response = await fetch(`${BACKEND_URL}/apartments/${id}`, {
                cache: 'no-store', // Pour avoir les données à jour
            });
            if (!response.ok) {
                console.error(`Apartment ${id} not found:`, response.status, response.statusText);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.error(`Error in serverApi.getApartmentById(${id}):`, error);
            return null;
        }
    },
};
