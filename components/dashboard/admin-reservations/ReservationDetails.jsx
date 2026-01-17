'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const AdminReservationDetails = () => {
  const params = useParams();
  const router = useRouter();
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

  if (loading) {
    return (
      <>
        <Header />
        <MobileMenu />
        <div className="dashboard_sidebar_menu">
          <div className="offcanvas offcanvas-dashboard offcanvas-start" tabIndex="-1" id="DashboardOffcanvasMenu" data-bs-scroll="true">
            <SidebarMenu />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{t('loading') || "Chargement..."}</span>
          </div>
        </div>
      </>
    );
  }

  if (!reservation) {
    return (
      <>
        <Header />
        <MobileMenu />
        <div className="dashboard_sidebar_menu">
          <div className="offcanvas offcanvas-dashboard offcanvas-start" tabIndex="-1" id="DashboardOffcanvasMenu" data-bs-scroll="true">
            <SidebarMenu />
          </div>
        </div>
        <div className="text-center py-5">
          <h4>{t('reservation_not_found') || "Réservation non trouvée"}</h4>
          <Link href="/admin/reservations" className="btn btn-thm">{t('back_to_list') || "Retour à la liste"}</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div className="offcanvas offcanvas-dashboard offcanvas-start" tabIndex="-1" id="DashboardOffcanvasMenu" data-bs-scroll="true">
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
                      <button className="dropbtn" data-bs-toggle="offcanvas" data-bs-target="#DashboardOffcanvasMenu" aria-controls="DashboardOffcanvasMenu">
                        <i className="fa fa-bars pr10"></i> {t('navigation') || "Navigation"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">{t('reservation_details') || "Détails de la réservation"}</h2>
                    <Link href="/admin/reservations" className="btn btn-thm-outline">
                      <i className="fa fa-arrow-left me-2"></i>
                      {t('back_to_list') || "Retour à la liste"}
                    </Link>
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
                    <div className="row">
                      {/* Informations du client */}
                      <div className="col-lg-6 mb-3">
                        <div className="card shadow-sm">
                          <div className="card-header bg-primary text-white">
                            <h5 className="mb-0">
                              <i className="fa fa-user me-2"></i>
                              {t('client_information') || "Informations du client"}
                            </h5>
                          </div>
                          <div className="card-body">
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-id-card text-primary me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('name') || "Nom"}:</strong>
                              </div>
                              <p className="ms-4 mb-0">{reservation.user?.firstName} {reservation.user?.lastName}</p>
                            </div>
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-envelope text-primary me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('email') || "Email"}:</strong>
                              </div>
                              <p className="ms-4 mb-0">
                                <a href={`mailto:${reservation.user?.email}`} className="text-decoration-none">
                                  {reservation.user?.email}
                                </a>
                              </p>
                            </div>
                            {reservation.user?.phone && (
                              <div className="mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fa fa-phone text-primary me-2" style={{ width: '20px' }}></i>
                                  <strong className="me-2">{t('phone') || "Téléphone"}:</strong>
                                </div>
                                <p className="ms-4 mb-0">
                                  <a href={`tel:${reservation.user.phone}`} className="text-decoration-none">
                                    {reservation.user.phone}
                                  </a>
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Informations de la réservation */}
                      <div className="col-lg-6 mb-3">
                        <div className="card shadow-sm">
                          <div className="card-header bg-success text-white">
                            <h5 className="mb-0">
                              <i className="fa fa-calendar-check-o me-2"></i>
                              {t('reservation_information') || "Informations de la réservation"}
                            </h5>
                          </div>
                          <div className="card-body">
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-info-circle text-success me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('status') || "Statut"}:</strong>
                              </div>
                              <div className="ms-4">{getStatusBadge(reservation.status)}</div>
                            </div>
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-calendar text-success me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('period') || "Période"}:</strong>
                              </div>
                              <p className="ms-4 mb-0">
                                <i className="fa fa-arrow-right me-1"></i>
                                {formatDate(reservation.startDate)} → {formatDate(reservation.endDate)}
                              </p>
                            </div>
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-money text-success me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('amount') || "Montant"}:</strong>
                              </div>
                              <p className="ms-4 mb-0">
                                <span className="h5 text-success mb-0">
                                  {reservation.totalPrice?.toLocaleString('fr-FR')} FCFA
                                </span>
                              </p>
                            </div>
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-clock-o text-success me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('created_at') || "Date de création"}:</strong>
                              </div>
                              <p className="ms-4 mb-0">{formatDate(reservation.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Détails du service */}
                      <div className="col-lg-12 mb-3">
                        <div className="card shadow-sm">
                          <div className="card-header bg-info text-white">
                            <h5 className="mb-0">
                              <i className="fa fa-info-circle me-2"></i>
                              {t('service_details') || "Détails du service"}
                            </h5>
                          </div>
                          <div className="card-body">
                            {reservation.vehicle ? (
                              <div>
                                <h6 className="mb-3">
                                  <i className="fa fa-car text-info me-2"></i>
                                  {t('vehicle') || "Véhicule"}
                                </h6>
                                <div className="row">
                                  <div className="col-md-6 mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                      <i className="fa fa-tag text-info me-2" style={{ width: '20px' }}></i>
                                      <strong className="me-2">{t('title') || "Titre"}:</strong>
                                    </div>
                                    <p className="ms-4 mb-0">{reservation.vehicle.title}</p>
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                      <i className="fa fa-cog text-info me-2" style={{ width: '20px' }}></i>
                                      <strong className="me-2">{t('type') || "Type"}:</strong>
                                    </div>
                                    <p className="ms-4 mb-0">
                                      <span className="badge bg-secondary">{reservation.vehicle.type}</span>
                                    </p>
                                  </div>
                                  {reservation.vehicle.pricePerDay && (
                                    <div className="col-md-6 mb-3">
                                      <div className="d-flex align-items-center mb-2">
                                        <i className="fa fa-money text-info me-2" style={{ width: '20px' }}></i>
                                        <strong className="me-2">{t('price_per_day') || "Prix/jour"}:</strong>
                                      </div>
                                      <p className="ms-4 mb-0">{reservation.vehicle.pricePerDay.toLocaleString('fr-FR')} FCFA</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : reservation.apartment ? (
                              <div>
                                <h6 className="mb-3">
                                  <i className="fa fa-home text-info me-2"></i>
                                  {t('apartment') || "Appartement"}
                                </h6>
                                <div className="row">
                                  <div className="col-md-6 mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                      <i className="fa fa-tag text-info me-2" style={{ width: '20px' }}></i>
                                      <strong className="me-2">{t('title') || "Titre"}:</strong>
                                    </div>
                                    <p className="ms-4 mb-0">{reservation.apartment.title}</p>
                                  </div>
                                  <div className="col-md-6 mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                      <i className="fa fa-map-marker text-info me-2" style={{ width: '20px' }}></i>
                                      <strong className="me-2">{t('city') || "Ville"}:</strong>
                                    </div>
                                    <p className="ms-4 mb-0">
                                      <span className="badge bg-secondary">{reservation.apartment.city}</span>
                                    </p>
                                  </div>
                                  {reservation.apartment.pricePerNight && (
                                    <div className="col-md-6 mb-3">
                                      <div className="d-flex align-items-center mb-2">
                                        <i className="fa fa-money text-info me-2" style={{ width: '20px' }}></i>
                                        <strong className="me-2">{t('price_per_night') || "Prix/nuit"}:</strong>
                                      </div>
                                      <p className="ms-4 mb-0">{reservation.apartment.pricePerNight.toLocaleString('fr-FR')} FCFA</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <p className="text-muted">
                                <i className="fa fa-exclamation-triangle me-2"></i>
                                {t('no_service_info') || "Aucune information sur le service"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Changer le statut */}
                      {reservation.status !== 'CANCELLED' && reservation.status !== 'COMPLETED' && (
                        <div className="col-lg-12 mb-3">
                          <div className="card shadow-sm border-warning">
                            <div className="card-header bg-warning text-dark">
                              <h5 className="mb-0">
                                <i className="fa fa-edit me-2"></i>
                                {t('change_status') || "Changer le statut"}
                              </h5>
                            </div>
                            <div className="card-body">
                              <div className="row align-items-center">
                                <div className="col-md-6 mb-2 mb-md-0">
                                  <label className="form-label">
                                    <i className="fa fa-filter me-2"></i>
                                    {t('select_new_status') || "Sélectionner un nouveau statut"}
                                  </label>
                                </div>
                                <div className="col-md-6">
                                  <select
                                    className="form-select"
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
                          </div>
                        </div>
                      )}
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

export default AdminReservationDetails;
