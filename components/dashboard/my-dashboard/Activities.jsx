'use client'

import { useEffect, useState } from 'react';
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const Activities = () => {
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('Admin');

  useEffect(() => {
    const fetchRecentBookings = async () => {
      try {
        const data = await adminService.getDashboardStats();
        if (data && data.recentBookings) {
          setRecentBookings(data.recentBookings.slice(0, 5)); // Limiter à 5
        } else {
          // Essayer de récupérer depuis les réservations
          const reservations = await adminService.getReservations({ limit: 5 });
          if (Array.isArray(reservations)) {
            setRecentBookings(reservations);
          } else if (reservations.data) {
            setRecentBookings(reservations.data);
          }
        }
      } catch (error) {
        console.error('Error loading recent bookings:', error);
        setRecentBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentBookings();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('loading') || "Chargement..."}</span>
        </div>
      </div>
    );
  }

  if (recentBookings.length === 0) {
    return (
      <div className="text-center p-4">
        <i className="fa fa-calendar-times-o" style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}></i>
        <p>{t('no_recent_reservations') || "Aucune réservation récente"}</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { class: 'warning', text: t('status_pending') || 'En attente' },
      CONFIRMED: { class: 'success', text: t('status_confirmed') || 'Confirmée' },
      CANCELLED: { class: 'danger', text: t('status_cancelled') || 'Annulée' },
      COMPLETED: { class: 'info', text: t('status_completed') || 'Terminée' },
    };
    const config = statusMap[status] || { class: 'secondary', text: status };
    return (
      <span className={`badge bg-${config.class}`}>
        {config.text}
      </span>
    );
  };

  return (
    <div className="recent_job_activity">
      <ul className="activity_list">
        {recentBookings.map((booking) => (
          <li key={booking.id}>
            <div className="activity_content">
              <div className="activity_icon">
                <i className="flaticon-calendar"></i>
              </div>
              <div className="activity_text">
                <h4>
                  {booking.vehicle
                    ? booking.vehicle.title
                    : booking.apartment
                    ? booking.apartment.title
                    : t('reservation') || 'Réservation'}
                </h4>
                <p>
                  {booking.user?.firstName || ''} {booking.user?.lastName || ''} -{' '}
                  {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                </p>
                <div className="mt-2">{getStatusBadge(booking.status)}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Link href="/admin/reservations" className="btn btn-thm">
        {t('view_all_reservations') || "Voir toutes les réservations"}
      </Link>
    </div>
  );
};

export default Activities;
