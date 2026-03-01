const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const getAuthHeaders = () => {
  if (typeof window === 'undefined') return {};
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const favoritesService = {
  async getFavorites(type) {
    const url = type 
      ? `${API_URL}/favorites?type=${type}` 
      : `${API_URL}/favorites`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des favoris');
    }

    return response.json();
  },

  async addFavorite(vehicleId, apartmentId) {
    const response = await fetch(`${API_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ vehicleId, apartmentId }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'ajout aux favoris');
    }

    return response.json();
  },

  async removeFavorite(vehicleId, apartmentId) {
    const response = await fetch(`${API_URL}/favorites`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ vehicleId, apartmentId }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du favori');
    }

    return response.json();
  },

  async toggleFavorite(vehicleId, apartmentId) {
    const response = await fetch(`${API_URL}/favorites/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ vehicleId, apartmentId }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors du basculement du favori');
    }

    return response.json();
  },

  async checkFavorite(vehicleId, apartmentId) {
    const params = new URLSearchParams();
    if (vehicleId) params.append('vehicleId', vehicleId);
    if (apartmentId) params.append('apartmentId', apartmentId);

    const response = await fetch(`${API_URL}/favorites/check?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) {
      return { isFavorite: false };
    }

    return response.json();
  },
};

export default favoritesService;
