// Utilisation du proxy Next.js via /api
// En développement, le proxy redirige vers BACKEND_URL (défini dans next.config.js)
// En production, utilisez NEXT_PUBLIC_API_URL si le proxy n'est pas disponible
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const apartmentService = {
    async getAllApartments(filters = {}) {
        try {
            const {
                page = 1,
                limit = 10,
                type,
                city,
                minPrice,
                maxPrice,
                bedrooms,
                search,
            } = filters;

            // Construire les paramètres de requête
            const queryParams = new URLSearchParams();
            
            // Page et limit sont toujours requis
            queryParams.append('page', (page || 1).toString());
            queryParams.append('limit', (limit || 10).toString());
            
            // Type doit être une valeur valide de l'enum ApartmentType (TYPE_1, TYPE_2, TYPE_3)
            if (type && typeof type === 'string' && ['TYPE_1', 'TYPE_2', 'TYPE_3'].includes(type)) {
                queryParams.append('type', type);
            }
            
            // City - string optionnel
            if (city && typeof city === 'string' && city.trim() !== '') {
                queryParams.append('city', city.trim());
            }
            
            // Prix - doivent être des nombres valides >= 0
            if (minPrice !== undefined && minPrice !== null && !isNaN(minPrice) && minPrice >= 0) {
                queryParams.append('minPrice', minPrice.toString());
            }
            if (maxPrice !== undefined && maxPrice !== null && !isNaN(maxPrice) && maxPrice >= 0) {
                queryParams.append('maxPrice', maxPrice.toString());
            }
            
            // Bedrooms - doit être un nombre >= 1
            if (bedrooms !== undefined && bedrooms !== null && !isNaN(bedrooms) && parseInt(bedrooms) >= 1) {
                queryParams.append('bedrooms', parseInt(bedrooms).toString());
            }
            
            // Search - string optionnel
            if (search && typeof search === 'string' && search.trim() !== '') {
                queryParams.append('search', search.trim());
            }

            const response = await fetch(`${API_URL}/apartments?${queryParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to fetch apartments: ${response.status} ${response.statusText}`);
                console.error('Error details:', errorText);
                console.error('Request URL:', `${API_URL}/apartments?${queryParams.toString()}`);
                return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
            }
            
            const result = await response.json();
            // Le backend retourne { data: [...], meta: {...} }
            return {
                data: result?.data || [],
                meta: result?.meta || { total: 0, page: 1, limit: 10, totalPages: 0 }
            };
        } catch (error) {
            console.error('Error in getAllApartments:', error);
            return { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
        }
    },

    async getApartmentById(id) {
        try {
            const response = await fetch(`${API_URL}/apartments/${id}`);
            if (!response.ok) throw new Error('Apartment not found');
            return await response.json();
        } catch (error) {
            console.error(`Error in getApartmentById(${id}):`, error);
            return null;
        }
    }
};
