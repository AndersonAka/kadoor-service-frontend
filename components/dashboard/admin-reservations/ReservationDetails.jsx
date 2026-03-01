'use client'

import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import AdminLayout from '@/components/admin/AdminLayout';
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { QRCodeSVG } from 'qrcode.react';

const AdminReservationDetails = () => {
  const params = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const t = useTranslations('Admin');

  useEffect(() => {
    if (params.id) {
      fetchReservation();
    }
  }, [params.id]);

  const fetchReservation = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getReservation(params.id);
      setReservation(data);
    } catch (error) {
      console.error('Error fetching reservation:', error);
      setError(t('error_loading_reservation') || 'Erreur lors du chargement de la réservation');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!confirm(t('confirm_status_change') || 'Êtes-vous sûr de vouloir changer le statut ?')) {
      return;
    }

    try {
      await adminService.updateReservationStatus(params.id, newStatus);
      alert(t('status_update_success') || 'Statut mis à jour avec succès');
      fetchReservation();
    } catch (error) {
      alert(t('status_update_error') || 'Erreur lors de la mise à jour du statut');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
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

  const statusConfig = reservation ? getStatusConfig(reservation.status) : null;

  return (
    <AdminLayout title={t('reservation_details') || "Détails de la réservation"}>
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/admin/reservations" 
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
      {!loading && !reservation && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('reservation_not_found') || "Réservation non trouvée"}</h3>
          <Link href="/admin/reservations" className="text-primary hover:underline">
            {t('back_to_list') || "Retour à la liste"}
          </Link>
        </div>
      )}

      {/* Reservation Details */}
      {!loading && reservation && (
        <div className="space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-4">
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.color}`}>
              {statusConfig.text}
            </span>
            <span className="text-gray-500 text-sm">
              Réservation #{reservation.id?.slice(-8)}
            </span>
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
                  <p className="text-sm text-gray-500 mb-1">{t('name') || "Nom"}</p>
                  <p className="font-medium text-gray-900">{reservation.user?.firstName} {reservation.user?.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('email') || "Email"}</p>
                  <a href={`mailto:${reservation.user?.email}`} className="text-primary hover:underline">
                    {reservation.user?.email}
                  </a>
                </div>
                {reservation.user?.phone && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t('phone') || "Téléphone"}</p>
                    <a href={`tel:${reservation.user.phone}`} className="text-primary hover:underline">
                      {reservation.user.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Reservation Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-green-50 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t('reservation_information') || "Informations de la réservation"}
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* QR Code */}
                  <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg">
                    <QRCodeSVG
                      value={JSON.stringify({
                        ref: reservation.id?.slice(-8),
                        id: reservation.id,
                        type: reservation.vehicle ? 'vehicle' : 'apartment',
                        item: reservation.vehicle?.title || reservation.apartment?.title,
                        start: reservation.startDate,
                        end: reservation.endDate,
                        total: reservation.totalPrice,
                      })}
                      size={120}
                      bgColor="#f9fafb"
                      fgColor="#1a1a2e"
                      level="M"
                    />
                    <p className="mt-2 text-xs text-gray-500 text-center">Scanner pour vérifier</p>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('period') || "Période"}</p>
                      <p className="font-medium text-gray-900">
                        {formatDate(reservation.startDate)} → {formatDate(reservation.endDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('amount') || "Montant"}</p>
                      <p className="text-2xl font-bold text-green-600">
                        {reservation.totalPrice?.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('created_at') || "Date de création"}</p>
                      <p className="text-gray-700">{formatDate(reservation.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('service_details') || "Détails du service"}
              </h3>
            </div>
            <div className="p-6">
              {reservation.vehicle ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('vehicle') || "Véhicule"}</p>
                      <p className="font-medium text-gray-900">{reservation.vehicle.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('type') || "Type"}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {reservation.vehicle.type}
                      </span>
                    </div>
                    {reservation.vehicle.pricePerDay && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{t('price_per_day') || "Prix/jour"}</p>
                        <p className="font-medium text-gray-900">{reservation.vehicle.pricePerDay.toLocaleString('fr-FR')} FCFA</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : reservation.apartment ? (
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('apartment') || "Appartement"}</p>
                      <p className="font-medium text-gray-900">{reservation.apartment.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{t('city') || "Ville"}</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                        {reservation.apartment.city}
                      </span>
                    </div>
                    {reservation.apartment.pricePerNight && (
                      <div>
                        <p className="text-sm text-gray-500 mb-1">{t('price_per_night') || "Prix/nuit"}</p>
                        <p className="font-medium text-gray-900">{reservation.apartment.pricePerNight.toLocaleString('fr-FR')} FCFA</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {t('no_service_info') || "Aucune information sur le service"}
                </p>
              )}
            </div>
          </div>

          {/* Change Status */}
          {reservation.status !== 'CANCELLED' && reservation.status !== 'COMPLETED' && (
            <div className="bg-white rounded-xl shadow-sm border border-yellow-200 overflow-hidden">
              <div className="px-6 py-4 bg-yellow-50 border-b border-yellow-200">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {t('change_status') || "Changer le statut"}
                </h3>
              </div>
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">
                    {t('select_new_status') || "Sélectionner un nouveau statut"}
                  </label>
                  <select
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    value={reservation.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                  >
                    <option value="PENDING">{t('status_pending') || "En attente"}</option>
                    <option value="CONFIRMED">{t('status_confirmed') || "Confirmée"}</option>
                    <option value="CANCELLED">{t('status_cancelled') || "Annulée"}</option>
                    <option value="COMPLETED">{t('status_completed') || "Terminée"}</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminReservationDetails;
