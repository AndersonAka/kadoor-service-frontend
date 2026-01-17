'use client'

import { useEffect, useState } from 'react';
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";

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

  const getStatusBadge = (status) => {
    const statusMap = {
      PENDING: { class: 'warning', text: t('status_pending') || 'En attente' },
      IN_PROGRESS: { class: 'info', text: t('status_in_progress') || 'En cours' },
      RESOLVED: { class: 'success', text: t('status_resolved') || 'Résolu' },
      CLOSED: { class: 'secondary', text: t('status_closed') || 'Fermé' },
    };
    const config = statusMap[status] || { class: 'secondary', text: status };
    return (
      <span className={`badge bg-${config.class}`}>
        {config.text}
      </span>
    );
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
    <>
      <Header />
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>

      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> {t('navigation') || "Navigation"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">{t('incidents_management') || "Gestion des Incidents"}</h2>
                    <div className="d-flex align-items-center gap-3">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="form-select"
                        style={{ width: '200px', display: 'inline-block' }}
                      >
                        <option value="">{t('all_statuses') || "Tous les statuts"}</option>
                        <option value="PENDING">{t('status_pending') || "En attente"}</option>
                        <option value="IN_PROGRESS">{t('status_in_progress') || "En cours"}</option>
                        <option value="RESOLVED">{t('status_resolved') || "Résolu"}</option>
                        <option value="CLOSED">{t('status_closed') || "Fermé"}</option>
                      </select>
                      <span className="badge bg-primary">
                        {incidents.length} {t('incidents') || "incidents"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    {loading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">{t('loading') || "Chargement..."}</span>
                        </div>
                      </div>
                    ) : incidents.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="fa fa-exclamation-triangle" style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }}></i>
                        <h5 className="mb-3">{t('no_incidents') || "Aucun incident"}</h5>
                        <p className="text-muted">
                          {statusFilter 
                            ? t('no_incidents_filter') || "Aucun incident ne correspond à ce filtre."
                            : t('no_incidents_description') || "Aucun incident déclaré pour le moment."}
                        </p>
                      </div>
                    ) : (
                      <div className="table-responsive mt0">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">{t('type') || "Type"}</th>
                              <th scope="col">{t('title') || "Titre"}</th>
                              <th scope="col">{t('reporter') || "Déclarant"}</th>
                              <th scope="col">{t('date') || "Date"}</th>
                              <th scope="col">{t('status') || "Statut"}</th>
                              <th scope="col">{t('actions') || "Actions"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {incidents.map((incident) => (
                              <tr key={incident.id}>
                                <td>
                                  <span className="badge bg-info">
                                    {getTypeLabel(incident.type)}
                                  </span>
                                </td>
                                <td>{incident.title}</td>
                                <td>
                                  <div>
                                    <div>{incident.firstName} {incident.lastName}</div>
                                    <small className="text-muted">{incident.email}</small>
                                  </div>
                                </td>
                                <td>{formatDate(incident.date || incident.createdAt)}</td>
                                <td>{getStatusBadge(incident.status)}</td>
                                <td>
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-sm btn-primary"
                                      onClick={() => handleViewDetails(incident.id)}
                                      title={t('view_details') || "Voir les détails"}
                                    >
                                      <i className="fa fa-eye"></i>
                                    </button>
                                    {incident.status !== 'CLOSED' && (
                                      <select
                                        className="form-select form-select-sm"
                                        style={{ width: 'auto' }}
                                        value={incident.status}
                                        onChange={(e) => handleStatusChange(incident.id, e.target.value)}
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
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal pour les détails */}
      {selectedIncident && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t('incident_details') || "Détails de l'incident"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedIncident(null)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>{t('type') || "Type"}:</strong> {getTypeLabel(selectedIncident.type)}
                  </div>
                  <div className="col-md-6">
                    <strong>{t('status') || "Statut"}:</strong> {getStatusBadge(selectedIncident.status)}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <strong>{t('title') || "Titre"}:</strong> {selectedIncident.title}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <strong>{t('description') || "Description"}:</strong>
                    <p>{selectedIncident.description}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>{t('reporter') || "Déclarant"}:</strong> {selectedIncident.firstName} {selectedIncident.lastName}
                  </div>
                  <div className="col-md-6">
                    <strong>{t('email') || "Email"}:</strong> {selectedIncident.email}
                  </div>
                </div>
                {selectedIncident.phone && (
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <strong>{t('phone') || "Téléphone"}:</strong> {selectedIncident.phone}
                    </div>
                  </div>
                )}
                {selectedIncident.location && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <strong>{t('location') || "Localisation"}:</strong> {selectedIncident.location}
                    </div>
                  </div>
                )}
                {selectedIncident.vehicle && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <strong>{t('related_vehicle') || "Véhicule concerné"}:</strong> {selectedIncident.vehicle.title}
                    </div>
                  </div>
                )}
                {selectedIncident.apartment && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <strong>{t('related_apartment') || "Appartement concerné"}:</strong> {selectedIncident.apartment.title}
                    </div>
                  </div>
                )}
                {selectedIncident.images && selectedIncident.images.length > 0 && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <strong>{t('images') || "Images"}:</strong>
                      <div className="d-flex flex-wrap gap-2 mt-2">
                        {selectedIncident.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Incident ${index + 1}`}
                            style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-md-6">
                    <strong>{t('created_at') || "Date de création"}:</strong> {formatDate(selectedIncident.createdAt)}
                  </div>
                  <div className="col-md-6">
                    <strong>{t('updated_at') || "Dernière mise à jour"}:</strong> {formatDate(selectedIncident.updatedAt)}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                {selectedIncident.status !== 'CLOSED' && (
                  <select
                    className="form-select"
                    style={{ width: 'auto', display: 'inline-block' }}
                    value={selectedIncident.status}
                    onChange={(e) => {
                      handleStatusChange(selectedIncident.id, e.target.value);
                    }}
                  >
                    <option value="PENDING">{t('status_pending') || "En attente"}</option>
                    <option value="IN_PROGRESS">{t('status_in_progress') || "En cours"}</option>
                    <option value="RESOLVED">{t('status_resolved') || "Résolu"}</option>
                    <option value="CLOSED">{t('status_closed') || "Fermé"}</option>
                  </select>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedIncident(null)}
                >
                  {t('close') || "Fermer"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour le modal */}
      {selectedIncident && (
        <div className="modal-backdrop fade show" onClick={() => setSelectedIncident(null)}></div>
      )}
    </>
  );
};

export default AdminIncidents;
