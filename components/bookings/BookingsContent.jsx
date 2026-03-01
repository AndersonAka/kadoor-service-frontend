'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const BookingsContent = () => {
  const { user } = useAuth();
  const t = useTranslations('Bookings');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        
        if (!token) {
          setError(t('login_required') || 'Vous devez être connecté pour voir vos réservations');
          setLoading(false);
          return;
        }

        const userId = user.id || user.userId;
        if (!userId) {
          throw new Error('ID utilisateur non disponible');
        }

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
        const url = `${API_BASE}/reservations?userId=${userId}`;
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur ${response.status}: ${errorText || response.statusText || 'Erreur lors de la récupération des réservations'}`);
        }

        const data = await response.json();
        const bookingsList = Array.isArray(data) ? data : (data.data || []);
        
        const userBookings = bookingsList.filter(booking => 
          booking.userId === userId || 
          booking.user?.id === userId
        );
        
        setBookings(userBookings);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message || t('error_loading_bookings') || 'Erreur lors du chargement des réservations');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user, t]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'PENDING': { cls: 'bg-yellow-100 text-yellow-800', text: t('status_pending') || 'En attente' },
      'CONFIRMED': { cls: 'bg-green-100 text-green-800', text: t('status_confirmed') || 'Confirmée' },
      'CANCELLED': { cls: 'bg-red-100 text-red-800', text: t('status_cancelled') || 'Annulée' },
      'COMPLETED': { cls: 'bg-blue-100 text-blue-800', text: t('status_completed') || 'Terminée' },
    };
    const config = statusConfig[status] || { cls: 'bg-gray-100 text-gray-800', text: status };
    return <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.cls}`}>{config.text}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">{error}</div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h4 className="text-xl font-bold text-gray-900">{t('my_bookings') || 'Mes Réservations'}</h4>
        <Link href="/vehicles" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('new_booking') || 'Nouvelle réservation'}
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm text-center py-16 px-8">
          <div className="text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('no_bookings') || 'Aucune réservation'}</h3>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {t('no_bookings_description') || "Vous n'avez pas encore de réservations."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/vehicles" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {t('browse_vehicles') || 'Parcourir les véhicules'}
            </Link>
            <Link href="/apartments" className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-xl hover:bg-primary hover:text-white transition-colors font-medium">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
              {t('browse_apartments') || 'Parcourir les appartements'}
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row md:items-center gap-4">
              {/* Service Info */}
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 truncate">
                  {booking.vehicle?.title || booking.apartment?.title || 'N/A'}
                </h4>
                <div className="flex items-center gap-3 mt-1">
                  {booking.vehicle ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      {t('vehicle') || 'Véhicule'}
                    </span>
                  ) : booking.apartment ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg>
                      {t('apartment') || 'Appartement'}
                    </span>
                  ) : null}
                  {getStatusBadge(booking.status)}
                </div>
              </div>

              {/* Dates */}
              <div className="flex gap-6 text-sm text-gray-600">
                <div>
                  <span className="block text-xs text-gray-400">{t('start_date') || 'Début'}</span>
                  <span className="font-medium text-gray-900">{formatDate(booking.startDate)}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-400">{t('end_date') || 'Fin'}</span>
                  <span className="font-medium text-gray-900">{formatDate(booking.endDate)}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <span className="text-lg font-bold text-primary">{booking.totalPrice?.toLocaleString('fr-FR')} FCFA</span>
              </div>

              {/* Action */}
              <Link
                href={`/bookings/${booking.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-primary border border-primary/30 rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                {t('view_details') || 'Détails'}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingsContent;
