'use client'

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [error, setError] = useState(null);
  const t = useTranslations('Admin');

  useEffect(() => {
    fetchReservations();
  }, [statusFilter]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const query = statusFilter ? { status: statusFilter } : {};
      const data = await adminService.getReservations(query);
      if (data.data) {
        setReservations(data.data);
      } else if (Array.isArray(data)) {
        setReservations(data);
      } else {
        setReservations([]);
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      const errorMessage = error.message || t('error_loading_reservations') || 'Erreur lors du chargement des réservations';
      setError(errorMessage);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!confirm(t('confirm_status_change') || 'Êtes-vous sûr de vouloir changer le statut ?')) {
      return;
    }

    try {
      await adminService.updateReservationStatus(id, newStatus);
      alert(t('status_update_success') || 'Statut mis à jour avec succès');
      fetchReservations();
    } catch (error) {
      alert(t('status_update_error') || 'Erreur lors de la modification du statut');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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

  return (
    <AdminLayout title={t('reservations_management') || "Gestion des Réservations"}>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">{t('all_statuses') || "Tous les statuts"}</option>
            <option value="PENDING">{t('status_pending') || "En attente"}</option>
            <option value="CONFIRMED">{t('status_confirmed') || "Confirmée"}</option>
            <option value="CANCELLED">{t('status_cancelled') || "Annulée"}</option>
            <option value="COMPLETED">{t('status_completed') || "Terminée"}</option>
          </select>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {reservations.length} {t('reservations') || "réservations"}
          </span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : reservations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('no_reservations') || "Aucune réservation"}</h3>
            <p className="text-gray-500">{t('no_reservations_description') || "Aucune réservation trouvée"}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('client') || "Client"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('service') || "Service"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('period') || "Période"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('amount') || "Montant"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('status') || "Statut"}</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('actions') || "Actions"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {reservations.map((reservation) => {
                    const statusConfig = getStatusConfig(reservation.status);
                    return (
                      <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{reservation.user?.firstName} {reservation.user?.lastName}</p>
                            <p className="text-sm text-gray-500">{reservation.user?.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {reservation.vehicle ? (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                {t('vehicle') || "Véhicule"}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                {t('apartment') || "Appart."}
                              </span>
                            )}
                            <span className="text-gray-900 font-medium truncate max-w-[150px]">
                              {reservation.vehicle?.title || reservation.apartment?.title || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(reservation.startDate)} → {formatDate(reservation.endDate)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{reservation.totalPrice?.toLocaleString('fr-FR')}</span>
                          <span className="text-gray-500 text-sm"> FCFA</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                            {statusConfig.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link 
                              href={{ pathname: '/admin/reservations/[id]', params: { id: reservation.id } }} 
                              className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              title={t('view_details') || "Détails"}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </Link>
                            {reservation.status === 'PENDING' && (
                              <>
                                <button
                                  onClick={() => handleStatusChange(reservation.id, 'CONFIRMED')}
                                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title={t('confirm') || "Confirmer"}
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleStatusChange(reservation.id, 'CANCELLED')}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title={t('cancel') || "Annuler"}
                                >
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {reservations.map((reservation) => {
                const statusConfig = getStatusConfig(reservation.status);
                return (
                  <div key={reservation.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-medium text-gray-900">{reservation.user?.firstName} {reservation.user?.lastName}</p>
                        <p className="text-sm text-gray-500">{reservation.user?.email}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      {reservation.vehicle ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          🚗 {t('vehicle') || "Véhicule"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                          🏠 {t('apartment') || "Appart."}
                        </span>
                      )}
                      <span className="text-gray-700 text-sm truncate">
                        {reservation.vehicle?.title || reservation.apartment?.title}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-500">{formatDate(reservation.startDate)} → {formatDate(reservation.endDate)}</span>
                      <span className="font-semibold text-primary">{reservation.totalPrice?.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link 
                        href={{ pathname: '/admin/reservations/[id]', params: { id: reservation.id } }} 
                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        {t('view_details') || "Détails"}
                      </Link>
                      {reservation.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(reservation.id, 'CONFIRMED')}
                            className="px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                          >
                            ✓
                          </button>
                          <button
                            onClick={() => handleStatusChange(reservation.id, 'CANCELLED')}
                            className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                          >
                            ✗
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminReservations;
