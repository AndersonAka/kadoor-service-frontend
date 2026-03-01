'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import HeaderTailwind from '@/components/common/header/HeaderTailwind';
import FooterTailwind from '@/components/common/footer/FooterTailwind';
import PopupSignInUp from '@/components/common/PopupSignInUp';
import { apartmentService } from '@/services/apartmentService';
import { useCurrency } from '@/context/CurrencyContext';

const ApartmentsListing = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    city: '',
    bedrooms: '',
    minPrice: '',
    maxPrice: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const t = useTranslations('ApartmentsPage');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    fetchApartments();
  }, [currentPage, filters]);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      const result = await apartmentService.getAllApartments({
        page: currentPage,
        limit: 9,
        ...filters,
      });
      setApartments(result?.data || []);
      setTotalPages(result?.meta?.totalPages || 1);
    } catch (err) {
      setError(err.message);
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  const apartmentTypes = ['Studio', 'T1', 'T2', 'T3', 'T4', 'Villa', 'Duplex'];
  const cities = ['Abidjan', 'Paris', 'Montréal', 'Douala'];

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
                    {t('apartment_type') || 'Type'}
                  </label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="">{t('all_types') || 'Tous les types'}</option>
                    {apartmentTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* City Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('city') || 'Ville'}
                  </label>
                  <select
                    value={filters.city}
                    onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="">{t('all_cities') || 'Toutes les villes'}</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Bedrooms Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('bedrooms') || 'Chambres'}
                  </label>
                  <select
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  >
                    <option value="">Toutes</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>{num}+</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('price_range') || 'Prix par nuit'}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-1/2 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => setFilters({ type: '', city: '', bedrooms: '', minPrice: '', maxPrice: '' })}
                  className="w-full py-2.5 text-primary border border-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  {t('reset_filters') || 'Réinitialiser'}
                </button>
              </div>
            </aside>

            {/* Apartments Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {apartments.length} {t('apartments_found') || 'appartements trouvés'}
                </p>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {error && !loading && (
                <div className="text-center py-20">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button onClick={fetchApartments} className="btn-primary">Réessayer</button>
                </div>
              )}

              {!loading && !error && apartments.length === 0 && (
                <div className="text-center py-20 bg-white rounded-xl">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun appartement trouvé</h3>
                  <p className="text-gray-500">Essayez de modifier vos filtres</p>
                </div>
              )}

              {!loading && !error && apartments.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {apartments.map((apt) => (
                    <Link key={apt.id} href={`/apartment-details/${apt.id}`} className="group">
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                        <div className="relative h-52 overflow-hidden">
                          <Image
                            src={apt.images?.[0] || '/assets/images/services/apartment_luxury.png'}
                            alt={apt.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 flex gap-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              apt.isAvailable ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                            }`}>
                              {apt.isAvailable ? 'Disponible' : 'Loué'}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                              {apt.type || 'Appartement'}
                            </span>
                          </div>
                          <div className="absolute bottom-3 right-3">
                            <span className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-lg font-bold text-primary shadow-lg">
                              {formatPrice(apt.pricePerNight)}
                              <span className="text-sm font-normal text-gray-500">/nuit</span>
                            </span>
                          </div>
                        </div>

                        <div className="p-5">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                            {apt.title}
                          </h3>
                          <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {apt.city || apt.address || 'Abidjan'}
                          </p>

                          <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              {apt.bedrooms} ch.
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                              </svg>
                              {apt.bathrooms} sdb.
                            </span>
                            {apt.area && (
                              <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                </svg>
                                {Math.round(apt.area)} m²
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                  >
                    ←
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg ${
                        currentPage === page ? 'bg-primary text-white' : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
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

export default ApartmentsListing;
