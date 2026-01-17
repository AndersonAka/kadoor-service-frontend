'use client';

/**
 * Hook pour gérer les éléments récemment consultés
 */
export const useRecentlyViewed = () => {
  const STORAGE_KEY = 'recentlyViewed';
  const MAX_ITEMS = 10; // Maximum d'éléments à stocker

  /**
   * Ajoute un élément à la liste des récemment consultés
   * @param {string} id - ID de l'élément
   * @param {string} type - Type ('vehicle' ou 'apartment')
   */
  const addToRecentlyViewed = (id, type) => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let items = stored ? JSON.parse(stored) : [];

      // Retirer l'élément s'il existe déjà
      items = items.filter(item => !(item.id === id && item.type === type));

      // Ajouter le nouvel élément au début
      items.unshift({
        id,
        type,
        viewDate: new Date().toISOString(),
      });

      // Limiter à MAX_ITEMS
      items = items.slice(0, MAX_ITEMS);

      // Sauvegarder
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving to recently viewed:', error);
    }
  };

  /**
   * Récupère la liste des éléments récemment consultés
   * @returns {Array} Liste des éléments
   */
  const getRecentlyViewed = () => {
    if (typeof window === 'undefined') return [];

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting recently viewed:', error);
      return [];
    }
  };

  /**
   * Supprime tous les éléments récemment consultés
   */
  const clearRecentlyViewed = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    addToRecentlyViewed,
    getRecentlyViewed,
    clearRecentlyViewed,
  };
};
