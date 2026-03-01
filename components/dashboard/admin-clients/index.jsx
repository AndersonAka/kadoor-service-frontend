'use client'

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const t = useTranslations('Admin');

  useEffect(() => {
    fetchClients();
  }, [page, search]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const query = { page, limit: 10, ...(search && { search }) };
      const data = await adminService.getClients(query);
      if (data.data) {
        setClients(data.data);
        setMeta(data.meta);
      } else if (Array.isArray(data)) {
        setClients(data);
        setMeta(null);
      } else {
        setClients([]);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      const errorMessage = error.message || t('error_loading_clients') || 'Erreur lors du chargement des clients';
      setError(errorMessage);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  const getRoleConfig = (role) => {
    const roleMap = {
      ADMIN: { color: 'bg-red-100 text-red-700', text: 'Admin' },
      MANAGER: { color: 'bg-orange-100 text-orange-700', text: 'Manager' },
      USER: { color: 'bg-blue-100 text-blue-700', text: 'Client' },
    };
    return roleMap[role] || { color: 'bg-gray-100 text-gray-700', text: role };
  };

  return (
    <AdminLayout title={t('clients_management') || "Gestion des Clients"}>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('search_client') || "Rechercher un client..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {meta?.total || clients.length} {t('clients') || "clients"}
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
        ) : clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('no_clients') || "Aucun client"}</h3>
            <p className="text-gray-500">{t('no_clients_description') || "Aucun client trouvé"}</p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('client') || "Client"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('contact') || "Contact"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('reservations') || "Réservations"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('role') || "Rôle"}</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('actions') || "Actions"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {clients.map((client) => {
                    const roleConfig = getRoleConfig(client.role);
                    return (
                      <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-primary font-semibold text-sm">
                                {client.firstName?.charAt(0)}{client.lastName?.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{client.firstName} {client.lastName}</p>
                              <p className="text-sm text-gray-500">{client.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{client.phone || '-'}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {client._count?.bookings || 0} {t('bookings') || 'résa.'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${roleConfig.color}`}>
                            {roleConfig.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end">
                            <Link 
                              href={{ pathname: '/admin/clients/[id]', params: { id: client.id } }} 
                              className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              title={t('view_profile') || "Voir profil"}
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

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {clients.map((client) => {
                const roleConfig = getRoleConfig(client.role);
                return (
                  <div key={client.id} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold">
                          {client.firstName?.charAt(0)}{client.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{client.firstName} {client.lastName}</p>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${roleConfig.color}`}>
                            {roleConfig.text}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">{client.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-500">{client.phone || 'Pas de téléphone'}</span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                          {client._count?.bookings || 0} résa.
                        </span>
                      </div>
                      <Link 
                        href={{ pathname: '/admin/clients/[id]', params: { id: client.id } }} 
                        className="px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        {t('view_profile') || "Voir"}
                      </Link>
                    </div>
                  </div>
                );
              })}
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

export default AdminClients;
