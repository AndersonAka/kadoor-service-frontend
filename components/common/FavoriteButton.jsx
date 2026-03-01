'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import favoritesService from '@/services/favoritesService';

const FavoriteButton = ({ vehicleId, apartmentId, itemId, itemType, className = '', size = 'md' }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  // Support both formats: (vehicleId/apartmentId) or (itemId/itemType)
  const resolvedVehicleId = vehicleId || (itemType === 'vehicle' ? itemId : undefined);
  const resolvedApartmentId = apartmentId || (itemType === 'apartment' ? itemId : undefined);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  useEffect(() => {
    if (user && (resolvedVehicleId || resolvedApartmentId)) {
      checkFavoriteStatus();
    }
  }, [user, resolvedVehicleId, resolvedApartmentId]);

  const checkFavoriteStatus = async () => {
    try {
      const result = await favoritesService.checkFavorite(resolvedVehicleId, resolvedApartmentId);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // Could trigger login modal here
      return;
    }

    setLoading(true);
    try {
      const result = await favoritesService.toggleFavorite(resolvedVehicleId, resolvedApartmentId);
      setIsFavorite(result.isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        ${sizeClasses[size]}
        flex items-center justify-center
        rounded-full
        bg-white/90 backdrop-blur-sm
        shadow-md
        border border-gray-100
        transition-all duration-200
        hover:scale-110 hover:shadow-lg
        disabled:opacity-50
        ${className}
      `}
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      {loading ? (
        <div className={`${iconSizes[size]} border-2 border-gray-300 border-t-primary rounded-full animate-spin`} />
      ) : (
        <svg
          className={`${iconSizes[size]} transition-colors duration-200 ${
            isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-400'
          }`}
          fill={isFavorite ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;
