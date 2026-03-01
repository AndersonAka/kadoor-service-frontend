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
          setRecentBookings(data.recentBookings.slice(0, 5));
        } else {
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const getStatusConfig = (status) => {
    const statusMap = {
      PENDING: { color: 'bg-yellow-100 text-yellow-700', text: t('status_pending') || 'En attente' },
      CONFIRMED: { color: 'bg-green-100 text-green-700', text: t('status_confirmed') || 'Confirmée' },
      CANCELLED: { color: 'bg-red-100 text-red-700', text: t('status_cancelled') || 'Annulée' },
      COMPLETED: { color: 'bg-blue-100 text-blue-700', text: t('status_completed') || 'Terminée' },
    };
    return statusMap[status] || { color: 'bg-gray-100 text-gray-700', text: status };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (recentBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-sm">{t('no_recent_reservations') || "Aucune réservation récente"}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentBookings.map((booking) => {
        const statusConfig = getStatusConfig(booking.status);
        return (
          <div key={booking.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              {booking.vehicle ? (
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">
                {booking.vehicle?.title || booking.apartment?.title || t('reservation')}
              </p>
              <p className="text-xs text-gray-500">
                {booking.user?.firstName} {booking.user?.lastName}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-400">
                  {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                </span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${statusConfig.color}`}>
                  {statusConfig.text}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      
      <Link 
        href="/admin/reservations" 
        className="block w-full text-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
      >
        {t('view_all_reservations') || "Voir toutes les réservations"}
      </Link>
    </div>
  );
};

export default Activities;
