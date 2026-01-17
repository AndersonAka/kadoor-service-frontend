'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const AdminClientDetails = () => {
  const params = useParams();
  const router = useRouter();
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

  if (!client) {
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
          <h4>{t('client_not_found') || "Client non trouvé"}</h4>
          <Link href="/admin/clients" className="btn btn-thm">{t('back_to_list') || "Retour à la liste"}</Link>
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
                    <h2 className="breadcrumb_title">{t('client_details') || "Détails du client"}</h2>
                    <Link href="/admin/clients" className="btn btn-thm-outline">
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
                              <p className="ms-4 mb-0">{client.firstName} {client.lastName}</p>
                            </div>
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-envelope text-primary me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('email') || "Email"}:</strong>
                              </div>
                              <p className="ms-4 mb-0">
                                <a href={`mailto:${client.email}`} className="text-decoration-none">
                                  {client.email}
                                </a>
                              </p>
                            </div>
                            {client.phone && (
                              <div className="mb-3">
                                <div className="d-flex align-items-center mb-2">
                                  <i className="fa fa-phone text-primary me-2" style={{ width: '20px' }}></i>
                                  <strong className="me-2">{t('phone') || "Téléphone"}:</strong>
                                </div>
                                <p className="ms-4 mb-0">
                                  <a href={`tel:${client.phone}`} className="text-decoration-none">
                                    {client.phone}
                                  </a>
                                </p>
                              </div>
                            )}
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-user-circle text-primary me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('role') || "Rôle"}:</strong>
                              </div>
                              <p className="ms-4 mb-0">
                                <span className={`badge ${client.role === 'ADMIN' ? 'bg-danger' : client.role === 'MANAGER' ? 'bg-warning' : 'bg-primary'}`}>
                                  {client.role}
                                </span>
                              </p>
                            </div>
                            <div className="mb-3">
                              <div className="d-flex align-items-center mb-2">
                                <i className="fa fa-clock-o text-primary me-2" style={{ width: '20px' }}></i>
                                <strong className="me-2">{t('created_at') || "Date de création"}:</strong>
                              </div>
                              <p className="ms-4 mb-0">{formatDate(client.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Statistiques */}
                      <div className="col-lg-6 mb-3">
                        <div className="card shadow-sm">
                          <div className="card-header bg-success text-white">
                            <h5 className="mb-0">
                              <i className="fa fa-bar-chart me-2"></i>
                              {t('statistics') || "Statistiques"}
                            </h5>
                          </div>
                          <div className="card-body">
                            <div className="text-center py-3">
                              <div className="mb-3">
                                <i className="fa fa-calendar-check-o fa-3x text-success mb-3"></i>
                              </div>
                              <h3 className="text-success mb-0">
                                {client._count?.bookings || bookings.length || 0}
                              </h3>
                              <p className="text-muted mb-0">
                                <i className="fa fa-info-circle me-1"></i>
                                {t('total_reservations') || "Total réservations"}
                              </p>
                            </div>
                            {bookings.length > 0 && (
                              <div className="mt-3 pt-3 border-top">
                                <div className="row text-center">
                                  <div className="col-6">
                                    <small className="text-muted d-block">{t('status_pending') || "En attente"}</small>
                                    <strong className="text-warning">
                                      {bookings.filter(b => b.status === 'PENDING').length}
                                    </strong>
                                  </div>
                                  <div className="col-6">
                                    <small className="text-muted d-block">{t('status_confirmed') || "Confirmées"}</small>
                                    <strong className="text-success">
                                      {bookings.filter(b => b.status === 'CONFIRMED').length}
                                    </strong>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Historique des réservations */}
                      <div className="col-lg-12">
                        <div className="card shadow-sm">
                          <div className="card-header bg-info text-white">
                            <h5 className="mb-0">
                              <i className="fa fa-history me-2"></i>
                              {t('booking_history') || "Historique des réservations"}
                            </h5>
                          </div>
                          <div className="card-body">
                            {bookingsLoading ? (
                              <div className="text-center py-5">
                                <div className="spinner-border text-primary" role="status">
                                  <span className="visually-hidden">{t('loading') || "Chargement..."}</span>
                                </div>
                                <p className="mt-3 text-muted">{t('loading') || "Chargement..."}</p>
                              </div>
                            ) : bookings.length === 0 ? (
                              <div className="text-center py-5">
                                <i className="fa fa-calendar-times-o fa-3x text-muted mb-3"></i>
                                <p className="text-muted">{t('no_reservations') || "Aucune réservation"}</p>
                              </div>
                            ) : (
                              <div className="table-responsive">
                                <table className="table table-hover">
                                  <thead className="table-light">
                                    <tr>
                                      <th>
                                        <i className="fa fa-cog me-2"></i>
                                        {t('service') || "Service"}
                                      </th>
                                      <th>
                                        <i className="fa fa-calendar me-2"></i>
                                        {t('period') || "Période"}
                                      </th>
                                      <th>
                                        <i className="fa fa-money me-2"></i>
                                        {t('amount') || "Montant"}
                                      </th>
                                      <th>
                                        <i className="fa fa-info-circle me-2"></i>
                                        {t('status') || "Statut"}
                                      </th>
                                      <th>
                                        <i className="fa fa-cogs me-2"></i>
                                        {t('actions') || "Actions"}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {bookings.map((booking) => (
                                      <tr key={booking.id}>
                                        <td>
                                          {booking.vehicle ? (
                                            <span>
                                              <i className="fa fa-car text-info me-2"></i>
                                              {booking.vehicle.title}
                                            </span>
                                          ) : booking.apartment ? (
                                            <span>
                                              <i className="fa fa-home text-success me-2"></i>
                                              {booking.apartment.title}
                                            </span>
                                          ) : (
                                            <span className="text-muted">N/A</span>
                                          )}
                                        </td>
                                        <td>
                                          <small>
                                            <i className="fa fa-arrow-right me-1"></i>
                                            {formatDate(booking.startDate)} → {formatDate(booking.endDate)}
                                          </small>
                                        </td>
                                        <td>
                                          <strong className="text-success">
                                            {booking.totalPrice?.toLocaleString('fr-FR')} FCFA
                                          </strong>
                                        </td>
                                        <td>{getStatusBadge(booking.status)}</td>
                                        <td>
                                          <Link 
                                            href={{ 
                                              pathname: '/admin/reservations/[id]', 
                                              params: { id: booking.id } 
                                            }} 
                                            className="btn btn-sm btn-primary"
                                          >
                                            <i className="fa fa-eye me-1"></i>
                                            {t('view_details') || "Détails"}
                                          </Link>
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminClientDetails;
