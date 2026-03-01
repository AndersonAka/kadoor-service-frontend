'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { Link } from "@/i18n/routing";
import HeaderTailwind from "../common/header/HeaderTailwind";
import FooterTailwind from "../common/footer/FooterTailwind";
import { useCurrency } from "@/context/CurrencyContext";

const BookingDetails = () => {
  const { user } = useAuth();
  const params = useParams();
  const t = useTranslations('Bookings');
  const { formatPrice } = useCurrency();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && params.id) {
      fetchBookingDetails();
    }
  }, [user, params.id]);

  const fetchBookingDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError(t('login_required') || 'Vous devez être connecté pour voir les détails de la réservation');
        setLoading(false);
        return;
      }

      const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
      const url = `${API_BASE}/reservations/${params.id}`;
      console.log('[BookingDetails] Fetching booking from:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('[BookingDetails] Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[BookingDetails] Error response:', errorText);
        throw new Error(`Erreur ${response.status}: ${errorText || response.statusText || 'Erreur lors de la récupération de la réservation'}`);
      }

      const data = await response.json();
      console.log('[BookingDetails] Booking data received:', data);
      
      // Vérifier que la réservation appartient à l'utilisateur
      const userId = user.id || user.userId;
      if (data.userId !== userId && data.user?.id !== userId) {
        throw new Error('Vous n\'avez pas accès à cette réservation');
      }
      
      setBooking(data);
    } catch (err) {
      console.error('Error fetching booking:', err);
      setError(err.message || t('error_loading_booking') || 'Erreur lors du chargement de la réservation');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusConfig = (status) => {
    const configs = {
      'PENDING': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: t('status_pending') || 'En attente' },
      'CONFIRMED': { bg: 'bg-green-100', text: 'text-green-800', label: t('status_confirmed') || 'Confirmée' },
      'CANCELLED': { bg: 'bg-red-100', text: 'text-red-800', label: t('status_cancelled') || 'Annulée' },
      'COMPLETED': { bg: 'bg-blue-100', text: 'text-blue-800', label: t('status_completed') || 'Terminée' },
    };
    return configs[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
  };

  if (loading) {
    return (
      <>
        <HeaderTailwind />
        <main className="pt-24 pb-16 min-h-screen bg-gray-50">
          <div className="container-kadoor">
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </main>
        <FooterTailwind />
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeaderTailwind />
        <main className="pt-24 pb-16 min-h-screen bg-gray-50">
          <div className="container-kadoor">
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
            <Link 
              href="/bookings" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('back_to_bookings') || 'Retour aux réservations'}
            </Link>
          </div>
        </main>
        <FooterTailwind />
      </>
    );
  }

  if (!booking) {
    return null;
  }

  const statusConfig = getStatusConfig(booking.status);

  return (
    <>
      <HeaderTailwind />
      <main className="pt-24 pb-16 min-h-screen bg-gray-50">
        <div className="container-kadoor">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {t('booking_details') || 'Détails de la réservation'}
            </h1>
            <Link 
              href="/bookings" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('back_to_bookings') || 'Retour aux réservations'}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Reservation Info Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-primary px-6 py-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {t('reservation_information') || 'Informations de la réservation'}
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('reservation_id') || 'ID Réservation'}</p>
                      <p className="font-mono text-sm text-gray-900 break-all">{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('status') || 'Statut'}</p>
                      <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                        {statusConfig.label}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('start_date') || 'Date de début'}</p>
                      <p className="font-medium text-gray-900">{formatDateTime(booking.startDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('end_date') || 'Date de fin'}</p>
                      <p className="font-medium text-gray-900">{formatDateTime(booking.endDate)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('total_price') || 'Prix total'}</p>
                      <p className="text-xl font-bold text-primary">{formatPrice(booking.totalPrice)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('created_at') || 'Créée le'}</p>
                      <p className="font-medium text-gray-900">{formatDateTime(booking.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Info Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-blue-600 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    {booking.vehicle ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )}
                    {t('reserved_service') || 'Service réservé'}
                  </h2>
                </div>
                <div className="p-6">
                  {booking.vehicle ? (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{booking.vehicle.title}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">{t('type') || 'Type'}</p>
                          <p className="font-medium">{t('vehicle') || 'Véhicule'}</p>
                        </div>
                        {booking.vehicle.make && (
                          <div>
                            <p className="text-sm text-gray-500">{t('brand') || 'Marque'}</p>
                            <p className="font-medium">{booking.vehicle.make}</p>
                          </div>
                        )}
                        {booking.vehicle.model && (
                          <div>
                            <p className="text-sm text-gray-500">{t('model') || 'Modèle'}</p>
                            <p className="font-medium">{booking.vehicle.model}</p>
                          </div>
                        )}
                        {booking.vehicle.pricePerDay && (
                          <div>
                            <p className="text-sm text-gray-500">{t('price_per_day') || 'Prix par jour'}</p>
                            <p className="font-medium">{formatPrice(booking.vehicle.pricePerDay)}</p>
                          </div>
                        )}
                      </div>
                      <Link 
                        href={`/vehicle-details/${booking.vehicle.id || booking.vehicleId}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t('view_service') || 'Voir le service'}
                      </Link>
                    </>
                  ) : booking.apartment ? (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">{booking.apartment.title}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-500">{t('type') || 'Type'}</p>
                          <p className="font-medium">{t('apartment') || 'Appartement'}</p>
                        </div>
                        {booking.apartment.pricePerNight && (
                          <div>
                            <p className="text-sm text-gray-500">{t('price_per_day') || 'Prix par nuit'}</p>
                            <p className="font-medium">{formatPrice(booking.apartment.pricePerNight)}</p>
                          </div>
                        )}
                        {booking.apartment.bedrooms && (
                          <div>
                            <p className="text-sm text-gray-500">{t('bedrooms') || 'Chambres'}</p>
                            <p className="font-medium">{booking.apartment.bedrooms}</p>
                          </div>
                        )}
                        {booking.apartment.bathrooms && (
                          <div>
                            <p className="text-sm text-gray-500">{t('bathrooms') || 'Salles de bain'}</p>
                            <p className="font-medium">{booking.apartment.bathrooms}</p>
                          </div>
                        )}
                      </div>
                      <Link 
                        href={`/apartment-details/${booking.apartment.id || booking.apartmentId}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {t('view_service') || 'Voir le service'}
                      </Link>
                    </>
                  ) : (
                    <p className="text-gray-500">{t('service_not_found') || 'Service non trouvé'}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-28">
                <div className="bg-gray-800 px-6 py-4">
                  <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('actions') || 'Actions'}
                  </h2>
                </div>
                <div className="p-6 space-y-3">
                  {booking.status === 'PENDING' && (
                    <button 
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                      onClick={() => {
                        if (confirm(t('confirm_cancel') || 'Êtes-vous sûr de vouloir annuler cette réservation ?')) {
                          alert(t('cancel_not_implemented') || 'Fonctionnalité d\'annulation à venir');
                        }
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {t('cancel_booking') || 'Annuler la réservation'}
                    </button>
                  )}
                  <Link 
                    href={booking.vehicle ? `/vehicle-details/${booking.vehicle.id || booking.vehicleId}` : `/apartment-details/${booking.apartment?.id || booking.apartmentId}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    {t('view_service') || 'Voir le service'}
                  </Link>
                  <Link 
                    href="/bookings"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {t('back_to_bookings') || 'Retour aux réservations'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterTailwind />
    </>
  );
};

export default BookingDetails;
