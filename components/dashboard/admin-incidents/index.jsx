'use client'

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import Image from 'next/image';

const AdminIncidents = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const t = useTranslations('Admin');

  useEffect(() => {
    fetchIncidents();
  }, [statusFilter]);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      const query = statusFilter ? { status: statusFilter } : {};
      const data = await adminService.getIncidents(query);
      setIncidents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    if (!confirm(t('confirm_status_change') || 'Êtes-vous sûr de vouloir changer le statut ?')) {
      return;
    }

    try {
      await adminService.updateIncidentStatus(id, newStatus);
      alert(t('status_update_success') || 'Statut mis à jour avec succès');
      fetchIncidents();
      setSelectedIncident(null);
    } catch (error) {
      alert(t('status_update_error') || 'Erreur lors de la mise à jour du statut');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusConfig = (status) => {
    const statusMap = {
      PENDING: { color: 'bg-yellow-100 text-yellow-700', text: t('status_pending') || 'En attente' },
      IN_PROGRESS: { color: 'bg-blue-100 text-blue-700', text: t('status_in_progress') || 'En cours' },
      RESOLVED: { color: 'bg-green-100 text-green-700', text: t('status_resolved') || 'Résolu' },
      CLOSED: { color: 'bg-gray-100 text-gray-700', text: t('status_closed') || 'Fermé' },
    };
    return statusMap[status] || { color: 'bg-gray-100 text-gray-700', text: status };
  };

  const getTypeConfig = (type) => {
    const typeMap = {
      ACCIDENT: { color: 'bg-red-100 text-red-700', icon: '🚗', text: t('incident_type_accident') || 'Accident' },
      BREAKDOWN: { color: 'bg-orange-100 text-orange-700', icon: '🔧', text: t('incident_type_breakdown') || 'Panne' },
      THEFT: { color: 'bg-purple-100 text-purple-700', icon: '🔒', text: t('incident_type_theft') || 'Vol' },
      DAMAGE: { color: 'bg-amber-100 text-amber-700', icon: '⚠️', text: t('incident_type_damage') || 'Dégât' },
      OTHER: { color: 'bg-gray-100 text-gray-700', icon: '📝', text: t('incident_type_other') || 'Autre' },
    };
    return typeMap[type] || { color: 'bg-gray-100 text-gray-700', icon: '📝', text: type };
  };

  const getTypeLabel = (type) => {
    const typeMap = {
      ACCIDENT: t('incident_type_accident') || 'Accident',
      BREAKDOWN: t('incident_type_breakdown') || 'Panne',
      THEFT: t('incident_type_theft') || 'Vol',
      DAMAGE: t('incident_type_damage') || 'Dégât',
      OTHER: t('incident_type_other') || 'Autre',
    };
    return typeMap[type] || type;
  };

  const handleViewDetails = async (id) => {
    try {
      const incident = await adminService.getIncident(id);
      setSelectedIncident(incident);
    } catch (error) {
      alert(t('error_loading_details') || 'Erreur lors du chargement des détails');
    }
  };

  return (
    <AdminLayout title={t('incidents_management') || "Gestion des Incidents"}>
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
            <option value="IN_PROGRESS">{t('status_in_progress') || "En cours"}</option>
            <option value="RESOLVED">{t('status_resolved') || "Résolu"}</option>
            <option value="CLOSED">{t('status_closed') || "Fermé"}</option>
          </select>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
            {incidents.length} {t('incidents') || "incidents"}
          </span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : incidents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{t('no_incidents') || "Aucun incident"}</h3>
            <p className="text-gray-500">
              {statusFilter 
                ? t('no_incidents_filter') || "Aucun incident ne correspond à ce filtre."
                : t('no_incidents_description') || "Aucun incident déclaré pour le moment."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('type') || "Type"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('incident') || "Incident"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('reporter') || "Déclarant"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('date') || "Date"}</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('status') || "Statut"}</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('actions') || "Actions"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {incidents.map((incident) => {
                    const typeConfig = getTypeConfig(incident.type);
                    const statusConfig = getStatusConfig(incident.status);
                    return (
                      <tr key={incident.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${typeConfig.color}`}>
                            <span>{typeConfig.icon}</span>
                            {typeConfig.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{incident.title}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-900">{incident.firstName} {incident.lastName}</p>
                          <p className="text-sm text-gray-500">{incident.email}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(incident.date || incident.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.color}`}>
                            {statusConfig.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleViewDetails(incident.id)}
                              className="p-2 text-gray-500 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                              title={t('view_details') || "Voir les détails"}
                            >
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            {incident.status !== 'CLOSED' && (
                              <select
                                value={incident.status}
                                onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                                className="px-2 py-1 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                              >
                                <option value="PENDING">{t('status_pending') || "En attente"}</option>
                                <option value="IN_PROGRESS">{t('status_in_progress') || "En cours"}</option>
                                <option value="RESOLVED">{t('status_resolved') || "Résolu"}</option>
                                <option value="CLOSED">{t('status_closed') || "Fermé"}</option>
                              </select>
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
              {incidents.map((incident) => {
                const typeConfig = getTypeConfig(incident.type);
                const statusConfig = getStatusConfig(incident.status);
                return (
                  <div key={incident.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig.color}`}>
                        <span>{typeConfig.icon}</span>
                        {typeConfig.text}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.color}`}>
                        {statusConfig.text}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{incident.title}</p>
                    <p className="text-sm text-gray-500 mb-2">{incident.firstName} {incident.lastName}</p>
                    <p className="text-xs text-gray-400 mb-3">{formatDate(incident.date || incident.createdAt)}</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(incident.id)}
                        className="flex-1 text-center px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        {t('view_details') || "Détails"}
                      </button>
                      {incident.status !== 'CLOSED' && (
                        <select
                          value={incident.status}
                          onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                          className="px-2 py-2 text-sm bg-white border border-gray-300 rounded-lg"
                        >
                          <option value="PENDING">En attente</option>
                          <option value="IN_PROGRESS">En cours</option>
                          <option value="RESOLVED">Résolu</option>
                          <option value="CLOSED">Fermé</option>
                        </select>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Modal pour les détails */}
      {selectedIncident && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" onClick={() => setSelectedIncident(null)}>
          <div className="absolute inset-0 bg-black/60" />
          <div 
            className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">{t('incident_details') || "Détails de l'incident"}</h3>
              <button
                onClick={() => setSelectedIncident(null)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getTypeConfig(selectedIncident.type).color}`}>
                  {getTypeConfig(selectedIncident.type).icon} {getTypeConfig(selectedIncident.type).text}
                </span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusConfig(selectedIncident.status).color}`}>
                  {getStatusConfig(selectedIncident.status).text}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('title') || "Titre"}</p>
                <p className="font-semibold text-gray-900">{selectedIncident.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('description') || "Description"}</p>
                <p className="text-gray-700">{selectedIncident.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('reporter') || "Déclarant"}</p>
                  <p className="font-medium text-gray-900">{selectedIncident.firstName} {selectedIncident.lastName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('email') || "Email"}</p>
                  <p className="text-gray-700">{selectedIncident.email}</p>
                </div>
              </div>
              {selectedIncident.phone && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('phone') || "Téléphone"}</p>
                  <p className="text-gray-700">{selectedIncident.phone}</p>
                </div>
              )}
              {selectedIncident.location && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('location') || "Localisation"}</p>
                  <p className="text-gray-700">{selectedIncident.location}</p>
                </div>
              )}
              {(selectedIncident.vehicle || selectedIncident.apartment) && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('related_service') || "Service concerné"}</p>
                  <p className="text-gray-700">
                    {selectedIncident.vehicle?.title || selectedIncident.apartment?.title}
                  </p>
                </div>
              )}
              {selectedIncident.images && selectedIncident.images.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">{t('images') || "Images"}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedIncident.images.map((image, index) => (
                      <div key={index} className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={image}
                          alt={`Incident ${index + 1}`}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('created_at') || "Créé le"}</p>
                  <p className="text-gray-700">{formatDate(selectedIncident.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">{t('updated_at') || "Mis à jour le"}</p>
                  <p className="text-gray-700">{formatDate(selectedIncident.updatedAt)}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              {selectedIncident.status !== 'CLOSED' && (
                <select
                  value={selectedIncident.status}
                  onChange={(e) => handleStatusChange(selectedIncident.id, e.target.value)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="PENDING">{t('status_pending') || "En attente"}</option>
                  <option value="IN_PROGRESS">{t('status_in_progress') || "En cours"}</option>
                  <option value="RESOLVED">{t('status_resolved') || "Résolu"}</option>
                  <option value="CLOSED">{t('status_closed') || "Fermé"}</option>
                </select>
              )}
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('close') || "Fermer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminIncidents;
