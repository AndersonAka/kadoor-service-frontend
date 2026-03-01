'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import HeaderTailwind from '@/components/common/header/HeaderTailwind';
import FooterTailwind from '@/components/common/footer/FooterTailwind';
import PopupSignInUp from '@/components/common/PopupSignInUp';
import { vehicleService } from '@/services/vehicleService';
import { useCurrency } from '@/context/CurrencyContext';

const VehiclesListing = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    transmission: '',
    minPrice: '',
    maxPrice: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const t = useTranslations('VehiclesPage');
  const tNav = useTranslations('Navigation');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchVehicles();
  }, [currentPage, filters]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const result = await vehicleService.getAllVehicles({
        page: currentPage,
        limit: 9,
        ...filters,
      });
      setVehicles(result?.data || []);
      setTotalPages(result?.meta?.totalPages || 1);
    } catch (err) {
      setError(err.message);
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const vehicleTypes = ['Berline', 'SUV', 'Luxe', '4x4', 'Citadine', 'Utilitaire', 'Fourgonnette'];
  const transmissions = ['Automatique', 'Manuelle'];

  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Main Content */}
      <section className="pt-28 pb-12 bg-gray-50">
        <div className="container-kadoor">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  {t('filters') || 'Filtres'}
                </h3>

                {/* Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('vehicle_type') || 'Type de véhicule'}
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  >
                    <option value="">{t('all_types') || 'Tous les types'}</option>
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Transmission Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('transmission') || 'Transmission'}
                  </label>
                  <select
                    value={filters.transmission}
                    onChange={(e) => setFilters({ ...filters, transmission: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  >
                    <option value="">{t('all_transmissions') || 'Toutes'}</option>
                    {transmissions.map((trans) => (
                      <option key={trans} value={trans}>{trans}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('price_range') || 'Prix par jour'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => setFilters({ type: '', transmission: '', minPrice: '', maxPrice: '' })}
                  className="w-full py-2.5 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  {t('reset_filters') || 'Réinitialiser'}
                </button>
              </div>
            </aside>

            {/* Vehicle Grid */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {vehicles.length} {t('vehicles_found') || 'véhicules trouvés'}
                </p>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-20">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button onClick={fetchVehicles} className="btn-primary">
                    {t('retry') || 'Réessayer'}
                  </button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && vehicles.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t('no_vehicles') || 'Aucun véhicule trouvé'}
                  </h3>
                  <p className="text-gray-500">
                    {t('try_different_filters') || 'Essayez de modifier vos filtres'}
                  </p>
                </div>
              )}

              {/* Vehicle Cards Grid */}
              {!loading && !error && vehicles.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {vehicles.map((vehicle) => (
                    <Link
                      key={vehicle.id}
                      href={`/vehicle-details/${vehicle.id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={vehicle.images?.[0] || '/assets/images/services/mercedes.png'}
                            alt={vehicle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              vehicle.isAvailable 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}>
                              {vehicle.isAvailable ? 'Disponible' : 'Loué'}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                              {vehicle.type}
                            </span>
                          </div>
                          {/* Price Badge */}
                          <div className="absolute bottom-3 right-3">
                            <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg font-bold text-primary shadow-lg">
                              {formatPrice(vehicle.pricePerDay)}
                              <span className="text-sm font-normal text-gray-500">/jour</span>
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {vehicle.title}
                          </h3>
                          <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {vehicle.location || 'Abidjan'}
                          </p>

                          {/* Features */}
                          <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              </svg>
                              {vehicle.transmission || 'Auto'}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                              {vehicle.fuel || 'Diesel'}
                            </span>
                            {vehicle.seats && (
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {vehicle.seats} places
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page
                          ? 'bg-primary text-white'
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default VehiclesListing;
