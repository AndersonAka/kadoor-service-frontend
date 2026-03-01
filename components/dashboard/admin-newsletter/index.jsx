'use client'

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";

const AdminNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const t = useTranslations('Admin');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getNewsletterSubscribers();
      setSubscribers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching newsletter subscribers:', error);
      setSubscribers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async (email) => {
    if (!confirm(t('confirm_unsubscribe') || `Êtes-vous sûr de vouloir désabonner ${email} ?`)) {
      return;
    }

    try {
      await adminService.unsubscribeNewsletter(email);
      alert(t('unsubscribe_success') || 'Désabonnement réussi');
      fetchSubscribers();
    } catch (error) {
      alert(t('unsubscribe_error') || 'Erreur lors du désabonnement');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title={t('newsletter_management') || "Gestion de la Newsletter"}>
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder={t('search_subscribers') || "Rechercher un abonné..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {filteredSubscribers.length} {t('subscribers') || "abonnés"}
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('no_subscribers') || "Aucun abonné"}</h3>
            <p className="text-gray-500">
              {search 
                ? t('no_subscribers_search') || "Aucun abonné ne correspond à votre recherche."
                : t('no_subscribers_description') || "Aucun abonné à la newsletter pour le moment."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('email') || "Email"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('subscription_date') || "Date d'abonnement"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('status') || "Statut"}</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('actions') || "Actions"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSubscribers.map((subscriber) => (
                    <tr key={subscriber.id || subscriber.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="font-medium text-gray-900">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{formatDate(subscriber.createdAt)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          subscriber.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {subscriber.isActive 
                            ? (t('active') || "Actif") 
                            : (t('inactive') || "Inactif")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          {subscriber.isActive && (
                            <button
                              onClick={() => handleUnsubscribe(subscriber.email)}
                              className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title={t('unsubscribe') || "Désabonner"}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <div key={subscriber.id || subscriber.email} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 truncate max-w-[200px]">{subscriber.email}</p>
                        <p className="text-sm text-gray-500">{formatDate(subscriber.createdAt)}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      subscriber.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {subscriber.isActive ? '✓' : '✗'}
                    </span>
                  </div>
                  {subscriber.isActive && (
                    <button
                      onClick={() => handleUnsubscribe(subscriber.email)}
                      className="w-full mt-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      {t('unsubscribe') || "Désabonner"}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminNewsletter;
