'use client'

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import Image from 'next/image';

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const t = useTranslations('Admin');

  useEffect(() => {
    fetchVehicles();
  }, [page]);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getVehicles({ page, limit: 10 });
      if (data.data) {
        setVehicles(data.data);
        setMeta(data.meta);
      } else if (Array.isArray(data)) {
        setVehicles(data);
        setMeta(null);
      } else {
        setVehicles([]);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      setError(t('error_loading_vehicles') || 'Erreur lors du chargement des véhicules');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('confirm_delete_vehicle') || 'Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      return;
    }

    try {
      await adminService.deleteVehicle(id);
      alert(t('delete_success') || 'Véhicule supprimé avec succès');
      fetchVehicles();
    } catch (error) {
      alert(t('delete_error') || 'Erreur lors de la suppression');
    }
  };

  return (
    <AdminLayout title={t('vehicles_management') || "Gestion des Véhicules"}>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <p className="text-gray-500 text-sm">
            {meta ? `${meta.total} ${t('vehicles_count') || 'véhicule(s)'}` : ''}
          </p>
        </div>
        <Link 
          href="/admin/vehicles/new" 
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('add_vehicle') || "Ajouter un véhicule"}
        </Link>
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
        ) : vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('no_vehicles') || "Aucun véhicule"}</h3>
            <p className="text-gray-500 mb-4">{t('no_vehicles_description') || "Commencez par ajouter votre premier véhicule"}</p>
            <Link 
              href="/admin/vehicles/new" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {t('add_vehicle') || "Ajouter un véhicule"}
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('vehicle') || "Véhicule"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('type') || "Type"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('price_per_day') || "Prix/jour"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('location') || "Localisation"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('status') || "Statut"}</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('actions') || "Actions"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            {vehicle.images?.[0] ? (
                              <Image 
                                src={vehicle.images[0]} 
                                alt={vehicle.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{vehicle.title}</p>
                            <p className="text-sm text-gray-500">{vehicle.brand} {vehicle.model}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {vehicle.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-gray-900">{vehicle.pricePerDay?.toLocaleString('fr-FR')}</span>
                        <span className="text-gray-500 text-sm"> FCFA</span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{vehicle.location || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          vehicle.isAvailable 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {vehicle.isAvailable ? (t('available') || 'Disponible') : (t('unavailable') || 'Indisponible')}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link 
                            href={{ pathname: '/admin/vehicles/[id]', params: { id: vehicle.id } }} 
                            className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                            title={t('edit') || "Modifier"}
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Link>
                          <button
                            onClick={() => handleDelete(vehicle.id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title={t('delete') || "Supprimer"}
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {vehicle.images?.[0] ? (
                        <Image 
                          src={vehicle.images[0]} 
                          alt={vehicle.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 truncate">{vehicle.title}</h3>
                          <p className="text-sm text-gray-500">{vehicle.brand} {vehicle.model}</p>
                        </div>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          vehicle.isAvailable 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {vehicle.isAvailable ? '✓' : '✗'}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3 text-sm">
                        <span className="font-semibold text-primary">{vehicle.pricePerDay?.toLocaleString('fr-FR')} FCFA/j</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{vehicle.location || '-'}</span>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <Link 
                          href={{ pathname: '/admin/vehicles/[id]', params: { id: vehicle.id } }} 
                          className="flex-1 text-center px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                        >
                          {t('edit') || "Modifier"}
                        </Link>
                        <button
                          onClick={() => handleDelete(vehicle.id)}
                          className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          {t('delete') || "Supprimer"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {meta && meta.totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-500">
                  {t('page') || "Page"} {meta.page} {t('of') || "sur"} {meta.totalPages}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('previous') || "Précédent"}
                  </button>
                  <button
                    onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                    disabled={page === meta.totalPages}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('next') || "Suivant"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminVehicles;
