// Service pour gérer les témoignages
// En développement, le proxy redirige vers BACKEND_URL (défini dans next.config.js)
// En production, utilisez NEXT_PUBLIC_API_URL si le proxy n'est pas disponible
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const testimonialService = {
  /**
   * Récupère tous les témoignages actifs
   * @returns {Promise<Array>} Liste des témoignages actifs
   */
  async getActiveTestimonials() {
    try {
      const response = await fetch(`${API_URL}/testimonials?activeOnly=true`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  /**
   * Récupère tous les témoignages (actifs et inactifs)
   * @returns {Promise<Array>} Liste de tous les témoignages
   */
  async getAllTestimonials() {
    try {
      const response = await fetch(`${API_URL}/testimonials`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching all testimonials:', error);
      return [];
    }
  },
};
