// Utilisation du proxy Next.js via /api
// En développement, le proxy redirige vers BACKEND_URL (défini dans next.config.js)
// En production, utilisez NEXT_PUBLIC_API_URL si le proxy n'est pas disponible
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const vehicleService = {
    async getAllVehicles(filters = {}) {
        try {
            const {
                page = 1,
                limit = 10,
                type,
                location,
                minPrice,
                maxPrice,
                search,
            } = filters;

            // Construire les paramètres de requête
            const queryParams = new URLSearchParams();
            
            // Page et limit sont toujours requis
            // Le backend a une validation @Max(100) sur limit
            const validPage = Math.max(1, parseInt(page) || 1);
            const validLimit = Math.min(100, Math.max(1, parseInt(limit) || 10)); // Limiter à 100 max
            
            queryParams.append('page', validPage.toString());
            queryParams.append('limit', validLimit.toString());
            
            // Type doit être une valeur valide de l'enum VehicleType (TYPE_1, TYPE_2, TYPE_3, TYPE_4)
            if (type && typeof type === 'string' && ['TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4'].includes(type)) {
                queryParams.append('type', type);
            }
            
            // Location - string optionnel
            if (location && typeof location === 'string' && location.trim() !== '') {
                queryParams.append('location', location.trim());
            }
            
            // Prix - doivent être des nombres valides >= 0
            if (minPrice !== undefined && minPrice !== null && !isNaN(minPrice) && minPrice >= 0) {
                queryParams.append('minPrice', minPrice.toString());
            }
            if (maxPrice !== undefined && maxPrice !== null && !isNaN(maxPrice) && maxPrice >= 0) {
                queryParams.append('maxPrice', maxPrice.toString());
            }
            
            // Search - string optionnel
            if (search && typeof search === 'string' && search.trim() !== '') {
                queryParams.append('search', search.trim());
            }

            const response = await fetch(`${API_URL}/vehicles?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to fetch vehicles: ${response.status} ${response.statusText}`);
                console.error('Error details:', errorText);
                console.error('Request URL:', `${API_URL}/vehicles?${queryParams.toString()}`);
                return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
            }
            
            const result = await response.json();
            // Le backend retourne { data: [...], meta: {...} }
            return {
                data: result?.data || [],
                meta: result?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 }
            };
        } catch (error) {
            console.error('Error in getAllVehicles:', error);
            return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
        }
    },

    async getVehicleById(id) {
        try {
            const response = await fetch(`${API_URL}/vehicles/${id}`);
            if (!response.ok) throw new Error('Vehicle not found');
            return await response.json();
        } catch (error) {
            console.error(`Error in getVehicleById(${id}):`, error);
            return null;
        }
    }
};
