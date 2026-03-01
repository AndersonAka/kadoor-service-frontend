'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import HeaderTailwind from '../common/header/HeaderTailwind';
import FooterTailwind from '../common/footer/FooterTailwind';
import PopupSignInUp from '../common/PopupSignInUp';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import favoritesService from '@/services/favoritesService';

const Favorites = () => {
  const t = useTranslations('Favorites');
  const { user, isAuthenticated } = useAuth();
  const { formatPrice } = useCurrency();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [removing, setRemoving] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoritesService.getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (vehicleId, apartmentId) => {
    const itemId = vehicleId || apartmentId;
    setRemoving(itemId);
    try {
      await favoritesService.removeFavorite(vehicleId, apartmentId);
      setFavorites(prev => prev.filter(fav => 
        fav.vehicleId !== vehicleId && fav.apartmentId !== apartmentId
      ));
    } catch (error) {
      console.error('Error removing favorite:', error);
    } finally {
      setRemoving(null);
    }
  };

  const filteredFavorites = favorites.filter(fav => {
    if (activeTab === 'all') return true;
    if (activeTab === 'vehicles') return fav.vehicle;
    if (activeTab === 'apartments') return fav.apartment;
    return true;
  });

  const vehicleCount = favorites.filter(f => f.vehicle).length;
  const apartmentCount = favorites.filter(f => f.apartment).length;

  if (!isAuthenticated) {
    return (
      <>
        <HeaderTailwind />
        <PopupSignInUp />
        
        <section className="pt-28 pb-12 relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80&sat=-100"
              alt="Favorites background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
          </div>
          <div className="container-kadoor text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t('subtitle')}</p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-kadoor">
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('login_required')}</h2>
              <p className="text-gray-600 mb-8">{t('login_description')}</p>
              <Link href="/login" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                {t('login_button')}
              </Link>
            </div>
          </div>
        </section>

        <FooterTailwind />
      </>
    );
  }

  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />
      
      <section className="pt-28 pb-12 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80&sat=-100"
            alt="Favorites background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>
        <div className="container-kadoor text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-kadoor">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 pb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('tab_all')} ({favorites.length})
            </button>
            <button
              onClick={() => setActiveTab('vehicles')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'vehicles' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('tab_vehicles')} ({vehicleCount})
            </button>
            <button
              onClick={() => setActiveTab('apartments')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'apartments' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {t('tab_apartments')} ({apartmentCount})
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                  <div className="aspect-[4/3] bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredFavorites.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('empty_title')}</h2>
              <p className="text-gray-600 mb-8">{t('empty_description')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/vehicles" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  {t('browse_vehicles')}
                </Link>
                <Link href="/apartments" className="inline-flex items-center gap-2 bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/5 transition-colors">
                  {t('browse_apartments')}
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map(favorite => {
                const item = favorite.vehicle || favorite.apartment;
                const isVehicle = !!favorite.vehicle;
                const itemLink = isVehicle 
                  ? `/vehicle-details/${favorite.vehicleId}`
                  : `/apartment-details/${favorite.apartmentId}`;
                const mainImage = item?.images?.[0] || '/assets/images/placeholder.jpg';
                const itemId = favorite.vehicleId || favorite.apartmentId;

                return (
                  <div key={favorite.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                    <div className="relative aspect-[4/3]">
                      <Link href={itemLink}>
                        <Image
                          src={mainImage}
                          alt={item?.title || item?.brand || 'Item'}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isVehicle ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                        }`}>
                          {isVehicle ? t('type_vehicle') : t('type_apartment')}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFavorite(favorite.vehicleId, favorite.apartmentId)}
                        disabled={removing === itemId}
                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {removing === itemId ? (
                          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <Link href={itemLink}>
                        <h3 className="font-semibold text-gray-900 mb-1 hover:text-primary transition-colors line-clamp-1">
                          {isVehicle ? `${item?.brand} ${item?.model}` : item?.title}
                        </h3>
                      </Link>
                      {item?.city && (
                        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {item.city}
                        </p>
                      )}
                      <p className="text-lg font-bold text-primary">
                        {formatPrice(item?.pricePerDay || item?.price)}<span className="text-sm font-normal text-gray-500">/{t('per_day')}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default Favorites;
