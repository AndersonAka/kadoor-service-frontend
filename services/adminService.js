// Utiliser le proxy Next.js pour les appels API
// Le proxy redirige /api/* vers le backend
// Si NEXT_PUBLIC_API_BASE est défini, l'utiliser directement, sinon utiliser le proxy /api
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

/**
 * Service pour les APIs d'administration
 */
class AdminService {
  /**
   * Récupère le token d'authentification depuis le localStorage
   */
  getAuthHeaders() {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('[AdminService] Auth headers:', { ...headers, Authorization: token ? 'Bearer ***' : 'none' });
    return headers;
  }

  /**
   * Dashboard - Statistiques
   */
  async getDashboardStats() {
    try {
      const response = await fetch(`${API_BASE}/admin/dashboard/stats`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération des statistiques');
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  /**
   * Dashboard - Données pour graphiques
   * @param {string} period - 'day' | 'week' | 'month' | 'year'
   */
  async getChartData(period = 'month') {
    try {
      const response = await fetch(`${API_BASE}/admin/dashboard/charts?period=${period}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération des données graphiques');
      return await response.json();
    } catch (error) {
      console.error('Error fetching chart data:', error);
      throw error;
    }
  }

  /**
   * Véhicules - Liste
   */
  async getVehicles(query = {}) {
    try {
      const params = new URLSearchParams(query);
      const response = await fetch(`${API_BASE}/admin/vehicles?${params}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération des véhicules');
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      throw error;
    }
  }

  /**
   * Véhicules - Détails
   */
  async getVehicle(id) {
    try {
      const response = await fetch(`${API_BASE}/admin/vehicles/${id}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération du véhicule');
      return await response.json();
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      throw error;
    }
  }

  /**
   * Véhicules - Créer
   */
  async createVehicle(data) {
    try {
      const response = await fetch(`${API_BASE}/admin/vehicles`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur lors de la création du véhicule');
      return await response.json();
    } catch (error) {
      console.error('Error creating vehicle:', error);
      throw error;
    }
  }

  /**
   * Véhicules - Modifier
   */
  async updateVehicle(id, data) {
    try {
      const response = await fetch(`${API_BASE}/admin/vehicles/${id}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification du véhicule');
      return await response.json();
    } catch (error) {
      console.error('Error updating vehicle:', error);
      throw error;
    }
  }

  /**
   * Véhicules - Supprimer
   */
  async deleteVehicle(id) {
    try {
      const response = await fetch(`${API_BASE}/admin/vehicles/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression du véhicule');
      return await response.json();
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      throw error;
    }
  }

  /**
   * Appartements - Liste
   */
  async getApartments(query = {}) {
    try {
      const params = new URLSearchParams(query);
      const response = await fetch(`${API_BASE}/admin/apartments?${params}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération des appartements');
      return await response.json();
    } catch (error) {
      console.error('Error fetching apartments:', error);
      throw error;
    }
  }

  /**
   * Appartements - Détails
   */
  async getApartment(id) {
    try {
      const response = await fetch(`${API_BASE}/admin/apartments/${id}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération de l\'appartement');
      return await response.json();
    } catch (error) {
      console.error('Error fetching apartment:', error);
      throw error;
    }
  }

  /**
   * Appartements - Créer
   */
  async createApartment(data) {
    try {
      const response = await fetch(`${API_BASE}/admin/apartments`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur lors de la création de l\'appartement');
      return await response.json();
    } catch (error) {
      console.error('Error creating apartment:', error);
      throw error;
    }
  }

  /**
   * Appartements - Modifier
   */
  async updateApartment(id, data) {
    try {
      const response = await fetch(`${API_BASE}/admin/apartments/${id}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification de l\'appartement');
      return await response.json();
    } catch (error) {
      console.error('Error updating apartment:', error);
      throw error;
    }
  }

  /**
   * Appartements - Supprimer
   */
  async deleteApartment(id) {
    try {
      const response = await fetch(`${API_BASE}/admin/apartments/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la suppression de l\'appartement');
      return await response.json();
    } catch (error) {
      console.error('Error deleting apartment:', error);
      throw error;
    }
  }

  /**
   * Réservations - Liste
   */
  async getReservations(query = {}) {
    try {
      const params = new URLSearchParams(query);
      const url = `${API_BASE}/admin/reservations?${params}`;
      console.log('[AdminService] Fetching reservations from:', url);
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });
      console.log('[AdminService] Reservations response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[AdminService] Reservations error response:', errorText);
        throw new Error(`Erreur ${response.status}: ${errorText || 'Erreur lors de la récupération des réservations'}`);
      }
      const data = await response.json();
      console.log('[AdminService] Reservations data received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching reservations:', error);
      throw error;
    }
  }

  /**
   * Réservations - Détails
   */
  async getReservation(id) {
    try {
      const response = await fetch(`${API_BASE}/admin/reservations/${id}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération de la réservation');
      return await response.json();
    } catch (error) {
      console.error('Error fetching reservation:', error);
      throw error;
    }
  }

  /**
   * Réservations - Modifier le statut
   */
  async updateReservationStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE}/admin/reservations/${id}/status`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Erreur lors de la modification du statut');
      return await response.json();
    } catch (error) {
      console.error('Error updating reservation status:', error);
      throw error;
    }
  }

  /**
   * Réservations - Annuler
   */
  async cancelReservation(id) {
    try {
      const response = await fetch(`${API_BASE}/admin/reservations/${id}/cancel`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de l\'annulation de la réservation');
      return await response.json();
    } catch (error) {
      console.error('Error canceling reservation:', error);
      throw error;
    }
  }

  /**
   * Clients - Liste
   */
  async getClients(query = {}) {
    try {
      const params = new URLSearchParams(query);
      const url = `${API_BASE}/admin/clients?${params}`;
      console.log('[AdminService] Fetching clients from:', url);
      const response = await fetch(url, {
        headers: this.getAuthHeaders(),
      });
      console.log('[AdminService] Clients response status:', response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error('[AdminService] Clients error response:', errorText);
        throw new Error(`Erreur ${response.status}: ${errorText || 'Erreur lors de la récupération des clients'}`);
      }
      const data = await response.json();
      console.log('[AdminService] Clients data received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching clients:', error);
      throw error;
    }
  }

  /**
   * Clients - Détails
   */
  async getClient(id) {
    try {
      const response = await fetch(`${API_BASE}/admin/clients/${id}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération du client');
      return await response.json();
    } catch (error) {
      console.error('Error fetching client:', error);
      throw error;
    }
  }

  /**
   * Clients - Historique des réservations
   */
  async getClientBookings(clientId, query = {}) {
    try {
      const params = new URLSearchParams(query);
      const response = await fetch(`${API_BASE}/admin/clients/${clientId}/bookings?${params}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération de l\'historique');
      return await response.json();
    } catch (error) {
      console.error('Error fetching client bookings:', error);
      throw error;
    }
  }

  /**
   * Newsletter - Liste des abonnés
   */
  async getNewsletterSubscribers() {
    try {
      const response = await fetch(`${API_BASE}/newsletter`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération des abonnés');
      return await response.json();
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      throw error;
    }
  }

  /**
   * Newsletter - Désabonner un utilisateur
   */
  async unsubscribeNewsletter(email) {
    try {
      const response = await fetch(`${API_BASE}/newsletter/unsubscribe/${encodeURIComponent(email)}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors du désabonnement');
      return await response.json();
    } catch (error) {
      console.error('Error unsubscribing newsletter:', error);
      throw error;
    }
  }

  /**
   * Incidents - Liste
   */
  async getIncidents(query = {}) {
    try {
      const params = new URLSearchParams(query);
      const response = await fetch(`${API_BASE}/incidents?${params}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération des incidents');
      return await response.json();
    } catch (error) {
      console.error('Error fetching incidents:', error);
      throw error;
    }
  }

  /**
   * Incidents - Détails
   */
  async getIncident(id) {
    try {
      const response = await fetch(`${API_BASE}/incidents/${id}`, {
        headers: this.getAuthHeaders(),
      });
      if (!response.ok) throw new Error('Erreur lors de la récupération de l\'incident');
      return await response.json();
    } catch (error) {
      console.error('Error fetching incident:', error);
      throw error;
    }
  }

  /**
   * Incidents - Mettre à jour le statut
   */
  async updateIncidentStatus(id, status) {
    try {
      const response = await fetch(`${API_BASE}/incidents/${id}/status`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du statut');
      return await response.json();
    } catch (error) {
      console.error('Error updating incident status:', error);
      throw error;
    }
  }

  /**
   * Utilisateur - Mettre à jour le profil
   */
  async updateProfile(userId, data) {
    try {
      const response = await fetch(`${API_BASE}/users/${userId}`, {
        method: 'PATCH',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erreur lors de la mise à jour du profil');
      return await response.json();
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  /**
   * Utilisateur - Changer le mot de passe
   * Note: L'endpoint backend n'existe pas encore, cette fonctionnalité sera disponible prochainement
   */
  async changePassword(userId, oldPassword, newPassword) {
    try {
      // TODO: Implémenter l'endpoint backend /api/users/:id/password
      // Pour l'instant, on simule une erreur
      throw new Error('Fonctionnalité de changement de mot de passe en cours de développement');
      
      // Code à décommenter quand l'endpoint sera disponible :
      // const response = await fetch(`${API_BASE}/api/users/${userId}/password`, {
      //   method: 'PATCH',
      //   headers: this.getAuthHeaders(),
      //   body: JSON.stringify({ oldPassword, newPassword }),
      // });
      // if (!response.ok) throw new Error('Erreur lors du changement de mot de passe');
      // return await response.json();
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }
}

export default new AdminService();
