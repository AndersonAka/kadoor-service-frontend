'use client'

import { useEffect, useState } from 'react';
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
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
                        <i className="fa fa-bars pr10"></i> Navigation
                      </button>
                    </div>
                  </div>
                </div>

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
                    <h2 className="breadcrumb_title">{t('reservations_management') || "Gestion des Réservations"}</h2>
                    <div className="d-flex align-items-center gap-3">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="form-select"
                        style={{ width: 'auto', display: 'inline-block' }}
                      >
                        <option value="">{t('all_statuses') || "Tous les statuts"}</option>
                        <option value="PENDING">{t('status_pending') || "En attente"}</option>
                        <option value="CONFIRMED">{t('status_confirmed') || "Confirmée"}</option>
                        <option value="CANCELLED">{t('status_cancelled') || "Annulée"}</option>
                        <option value="COMPLETED">{t('status_completed') || "Terminée"}</option>
                      </select>
                      <span className="badge bg-primary">
                        {reservations.length} {t('reservations') || "réservations"}
                      </span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="col-lg-12 mb-3">
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  </div>
                )}

                <div className="col-lg-12">
                  <div className="my_dashboard_review mb40">
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">{t('client') || "Client"}</th>
                              <th scope="col">{t('service_category') || "Catégorie"}</th>
                              <th scope="col">{t('service') || "Service"}</th>
                              <th scope="col">{t('period') || "Période"}</th>
                              <th scope="col">{t('amount') || "Montant"}</th>
                              <th scope="col">{t('status') || "Statut"}</th>
                              <th scope="col">{t('actions') || "Actions"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="7" className="text-center">
                                  <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">{t('loading') || "Chargement..."}</span>
                                  </div>
                                </td>
                              </tr>
                            ) : reservations.length === 0 ? (
                              <tr>
                                <td colSpan="7" className="text-center">
                                  <i className="fa fa-calendar-times-o" style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}></i>
                                  <p>{t('no_reservations') || "Aucune réservation"}</p>
                                </td>
                              </tr>
                            ) : (
                              reservations.map((reservation) => (
                                <tr key={reservation.id}>
                                  <td>
                                    <div>
                                      <strong>{reservation.user?.firstName} {reservation.user?.lastName}</strong>
                                      <br />
                                      <small className="text-muted">{reservation.user?.email}</small>
                                    </div>
                                  </td>
                                  <td>
                                    {reservation.vehicle ? (
                                      <span className="badge bg-info">
                                        <i className="fa fa-car me-1"></i>
                                        {t('vehicle') || "Véhicule"}
                                      </span>
                                    ) : reservation.apartment ? (
                                      <span className="badge bg-success">
                                        <i className="fa fa-home me-1"></i>
                                        {t('apartment') || "Appartement"}
                                      </span>
                                    ) : (
                                      <span className="badge bg-secondary">N/A</span>
                                    )}
                                  </td>
                                  <td>
                                    {reservation.vehicle ? (
                                      <span>
                                        <i className="fa fa-car me-2"></i>
                                        {reservation.vehicle.title}
                                      </span>
                                    ) : reservation.apartment ? (
                                      <span>
                                        <i className="fa fa-home me-2"></i>
                                        {reservation.apartment.title}
                                      </span>
                                    ) : (
                                      'N/A'
                                    )}
                                  </td>
                                  <td>
                                    {formatDate(reservation.startDate)} → {formatDate(reservation.endDate)}
                                  </td>
                                  <td>{reservation.totalPrice?.toLocaleString('fr-FR')} FCFA</td>
                                  <td>{getStatusBadge(reservation.status)}</td>
                                  <td>
                                    <div className="d-flex gap-2">
                                      <Link 
                                        href={{ 
                                          pathname: '/admin/reservations/[id]', 
                                          params: { id: reservation.id } 
                                        }} 
                                        className="btn btn-sm btn-primary"
                                      >
                                        <i className="fa fa-eye me-1"></i>
                                        {t('view_details') || "Détails"}
                                      </Link>
                                      {reservation.status === 'PENDING' && (
                                        <>
                                          <button
                                            onClick={() => handleStatusChange(reservation.id, 'CONFIRMED')}
                                            className="btn btn-sm btn-success"
                                            title={t('confirm') || "Confirmer"}
                                          >
                                            <i className="fa fa-check"></i>
                                          </button>
                                          <button
                                            onClick={() => handleStatusChange(reservation.id, 'CANCELLED')}
                                            className="btn btn-sm btn-danger"
                                            title={t('cancel') || "Annuler"}
                                          >
                                            <i className="fa fa-times"></i>
                                          </button>
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminReservations;
