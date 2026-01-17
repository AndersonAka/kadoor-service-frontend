const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Service pour gérer les déclarations d'incidents
 */
export const incidentService = {
  /**
   * Déclare un incident
   * @param {Object} incidentData - Données de l'incident
   * @returns {Promise<Object>} - Incident créé
   */
  async createIncident(incidentData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/incidents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(incidentData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erreur lors de la déclaration' }));
        throw new Error(error.message || 'Erreur lors de la déclaration');
      }

      return await response.json();
    } catch (error) {
      console.error('[incidentService] Error creating incident:', error);
      throw error;
    }
  },
};
