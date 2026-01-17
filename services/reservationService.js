const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Service pour gérer les réservations
 */
export const reservationService = {
  /**
   * Crée une réservation de véhicule
   * @param {Object} reservationData - Données de réservation
   * @param {string} reservationData.vehicleId - ID du véhicule
   * @param {string} reservationData.startDate - Date de début (ISO string)
   * @param {string} reservationData.endDate - Date de fin (ISO string)
   * @param {string} [reservationData.pickupLocation] - Lieu de prise en charge
   * @param {string} [reservationData.dropoffLocation] - Lieu de restitution
   * @param {number} [reservationData.additionalDrivers] - Nombre de conducteurs supplémentaires
   * @param {string} [reservationData.specialRequests] - Demandes spéciales
   * @returns {Promise<Object>} - Réservation créée
   */
  async createVehicleReservation(reservationData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/reservations/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erreur lors de la réservation' }));
        throw new Error(error.message || 'Erreur lors de la réservation');
      }

      return await response.json();
    } catch (error) {
      console.error('[reservationService] Error creating vehicle reservation:', error);
      throw error;
    }
  },

  /**
   * Crée une réservation d'appartement
   * @param {Object} reservationData - Données de réservation
   * @param {string} reservationData.apartmentId - ID de l'appartement
   * @param {string} reservationData.startDate - Date de début (ISO string)
   * @param {string} reservationData.endDate - Date de fin (ISO string)
   * @param {number} [reservationData.numberOfGuests] - Nombre de personnes
   * @param {string} [reservationData.specialRequests] - Demandes spéciales
   * @returns {Promise<Object>} - Réservation créée
   */
  async createApartmentReservation(reservationData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/reservations/apartments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(reservationData),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Erreur lors de la réservation' }));
        throw new Error(error.message || 'Erreur lors de la réservation');
      }

      return await response.json();
    } catch (error) {
      console.error('[reservationService] Error creating apartment reservation:', error);
      throw error;
    }
  },

  /**
   * Vérifie la disponibilité d'un véhicule
   * @param {string} vehicleId - ID du véhicule
   * @param {string} startDate - Date de début (ISO string)
   * @param {string} endDate - Date de fin (ISO string)
   * @returns {Promise<Object>} - { available: boolean, reason?: string }
   */
  async checkVehicleAvailability(vehicleId, startDate, endDate) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/vehicles/${vehicleId}/availability?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return { available: false, reason: 'Impossible de vérifier la disponibilité' };
      }

      return await response.json();
    } catch (error) {
      console.error('[reservationService] Error checking vehicle availability:', error);
      return { available: false, reason: 'Erreur lors de la vérification' };
    }
  },

  /**
   * Vérifie la disponibilité d'un appartement
   * @param {string} apartmentId - ID de l'appartement
   * @param {string} startDate - Date de début (ISO string)
   * @param {string} endDate - Date de fin (ISO string)
   * @returns {Promise<Object>} - { available: boolean, reason?: string }
   */
  async checkApartmentAvailability(apartmentId, startDate, endDate) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/apartments/${apartmentId}/availability?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        return { available: false, reason: 'Impossible de vérifier la disponibilité' };
      }

      return await response.json();
    } catch (error) {
      console.error('[reservationService] Error checking apartment availability:', error);
      return { available: false, reason: 'Erreur lors de la vérification' };
    }
  },
};
