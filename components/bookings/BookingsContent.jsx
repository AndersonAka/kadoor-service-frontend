'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { api } from "@/utils/api";
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

        // Utiliser l'endpoint avec le userId de l'utilisateur connecté
        const userId = user.id || user.userId;
        if (!userId) {
          throw new Error('ID utilisateur non disponible');
        }

        const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
        const url = `${API_BASE}/reservations?userId=${userId}`;
        console.log('[BookingsContent] Fetching bookings from:', url);
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        console.log('[BookingsContent] Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('[BookingsContent] Error response:', errorText);
          throw new Error(`Erreur ${response.status}: ${errorText || response.statusText || 'Erreur lors de la récupération des réservations'}`);
        }

        const data = await response.json();
        console.log('[BookingsContent] Bookings data received:', data);
        
        // Le backend retourne un tableau directement
        const bookingsList = Array.isArray(data) ? data : (data.data || []);
        
        // Filtrer par sécurité côté client aussi (au cas où)
        const userBookings = bookingsList.filter(booking => 
          booking.userId === userId || 
          booking.user?.id === userId
        );
        
        console.log('[BookingsContent] Filtered bookings count:', userBookings.length);
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
      'PENDING': { class: 'warning', text: t('status_pending') || 'En attente' },
      'CONFIRMED': { class: 'success', text: t('status_confirmed') || 'Confirmée' },
      'CANCELLED': { class: 'danger', text: t('status_cancelled') || 'Annulée' },
      'COMPLETED': { class: 'info', text: t('status_completed') || 'Terminée' },
    };

    const config = statusConfig[status] || { class: 'secondary', text: status };
    return (
      <span className={`badge bg-${config.class}`}>
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="bookings-wrapper">
      <div className="d-flex justify-content-between align-items-center mb30">
        <h4>{t('my_bookings') || 'Mes Réservations'}</h4>
        <Link href="/vehicles" className="btn btn-thm">
          <i className="fa fa-plus me-2"></i>
          {t('new_booking') || 'Nouvelle réservation'}
        </Link>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-5">
          <i className="fa fa-calendar-times-o" style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }}></i>
          <h5 className="mb-3">{t('no_bookings') || 'Aucune réservation'}</h5>
          <p className="text-muted mb-4">
            {t('no_bookings_description') || 'Vous n\'avez pas encore de réservations.'}
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <Link href="/vehicles" className="btn btn-thm">
              <i className="fa fa-car me-2"></i>
              {t('browse_vehicles') || 'Parcourir les véhicules'}
            </Link>
            <Link href="/apartments" className="btn btn-thm-outline">
              <i className="fa fa-home me-2"></i>
              {t('browse_apartments') || 'Parcourir les appartements'}
            </Link>
          </div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th><i className="fa fa-calendar me-2"></i>{t('service') || 'Service'}</th>
                <th><i className="fa fa-tag me-2"></i>{t('category') || 'Catégorie'}</th>
                <th><i className="fa fa-calendar me-2"></i>{t('start_date') || 'Date de début'}</th>
                <th><i className="fa fa-calendar-check-o me-2"></i>{t('end_date') || 'Date de fin'}</th>
                <th><i className="fa fa-money me-2"></i>{t('total_price') || 'Prix total'}</th>
                <th><i className="fa fa-info-circle me-2"></i>{t('status') || 'Statut'}</th>
                <th><i className="fa fa-cog me-2"></i>{t('actions') || 'Actions'}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.vehicle?.title || booking.apartment?.title || 'N/A'}</strong>
                  </td>
                  <td>
                    {booking.vehicle ? (
                      <span className="badge bg-primary">
                        <i className="fa fa-car me-1"></i>
                        {t('vehicle') || 'Véhicule'}
                      </span>
                    ) : booking.apartment ? (
                      <span className="badge bg-info">
                        <i className="fa fa-home me-1"></i>
                        {t('apartment') || 'Appartement'}
                      </span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td>{formatDate(booking.startDate)}</td>
                  <td>{formatDate(booking.endDate)}</td>
                  <td>
                    <strong>{booking.totalPrice?.toLocaleString('fr-FR')} FCFA</strong>
                  </td>
                  <td>{getStatusBadge(booking.status)}</td>
                  <td>
                    <Link 
                      href={`/bookings/${booking.id}`}
                      className="btn btn-sm btn-thm-outline"
                    >
                      <i className="fa fa-eye me-1"></i>
                      {t('view_details') || 'Voir les détails'}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingsContent;
