'use client'

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import AdminLayout from '@/components/admin/AdminLayout';
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const AdminClientDetails = () => {
  const params = useParams();
  const [client, setClient] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [error, setError] = useState(null);
  const t = useTranslations('Admin');

  useEffect(() => {
    if (params.id) {
      fetchClient();
      fetchBookings();
    }
  }, [params.id]);

  const fetchClient = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getClient(params.id);
      setClient(data);
    } catch (error) {
      console.error('Error fetching client:', error);
      setError(t('error_loading_client') || 'Erreur lors du chargement du client');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      setBookingsLoading(true);
      const data = await adminService.getClientBookings(params.id);
      if (data.data) {
        setBookings(data.data);
      } else if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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

  const getRoleConfig = (role) => {
    const roleMap = {
      ADMIN: { color: 'bg-red-100 text-red-700' },
      MANAGER: { color: 'bg-orange-100 text-orange-700' },
      USER: { color: 'bg-blue-100 text-blue-700' },
    };
    return roleMap[role] || { color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <AdminLayout title={t('client_details') || "Détails du client"}>
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/admin/clients" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('back_to_list') || "Retour à la liste"}
        </Link>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Not Found State */}
      {!loading && !client && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('client_not_found') || "Client non trouvé"}</h3>
          <Link href="/admin/clients" className="text-primary hover:underline">
            {t('back_to_list') || "Retour à la liste"}
          </Link>
        </div>
      )}

      {/* Client Details */}
      {!loading && client && (
        <div className="space-y-6">
          {/* Client Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
              {client.firstName?.charAt(0)}{client.lastName?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{client.firstName} {client.lastName}</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleConfig(client.role).color}`}>
                {client.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-primary/5 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {t('client_information') || "Informations du client"}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('email') || "Email"}</p>
                  <a href={`mailto:${client.email}`} className="text-primary hover:underline">
                    {client.email}
                  </a>
                </div>
                {client.phone && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t('phone') || "Téléphone"}</p>
                    <a href={`tel:${client.phone}`} className="text-primary hover:underline">
                      {client.phone}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('created_at') || "Date d'inscription"}</p>
                  <p className="text-gray-700">{formatDate(client.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-green-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  {t('statistics') || "Statistiques"}
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-600 mb-1">
                    {client._count?.bookings || bookings.length || 0}
                  </p>
                  <p className="text-gray-500">{t('total_reservations') || "Total réservations"}</p>
                </div>
                {bookings.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">{bookings.filter(b => b.status === 'PENDING').length}</p>
                      <p className="text-sm text-gray-500">{t('status_pending') || "En attente"}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{bookings.filter(b => b.status === 'CONFIRMED').length}</p>
                      <p className="text-sm text-gray-500">{t('status_confirmed') || "Confirmées"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Booking History */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('booking_history') || "Historique des réservations"}
              </h3>
            </div>
            
            {bookingsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-500">{t('no_reservations') || "Aucune réservation"}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('service') || "Service"}</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('period') || "Période"}</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('amount') || "Montant"}</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{t('status') || "Statut"}</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">{t('actions') || "Actions"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => {
                      const statusConfig = getStatusConfig(booking.status);
                      return (
                        <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${booking.vehicle ? 'bg-blue-100' : 'bg-purple-100'}`}>
                                {booking.vehicle ? (
                                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                  </svg>
                                )}
                              </div>
                              <span className="font-medium text-gray-900">
                                {booking.vehicle?.title || booking.apartment?.title || 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-green-600">
                              {booking.totalPrice?.toLocaleString('fr-FR')} FCFA
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                              {statusConfig.text}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end">
                              <Link 
                                href={`/admin/reservations/${booking.id}`}
                                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminClientDetails;
