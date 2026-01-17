'use client';

import { useEffect } from 'react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

/**
 * Composant pour tracker les éléments récemment consultés
 * À utiliser dans les pages de détails
 */
const RecentlyViewedTracker = ({ itemId, itemType }) => {
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    if (itemId && itemType) {
      addToRecentlyViewed(itemId, itemType);
    }
  }, [itemId, itemType, addToRecentlyViewed]);

  return null; // Ce composant ne rend rien
};

export default RecentlyViewedTracker;
