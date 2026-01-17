'use client'

import { useEffect, useState } from 'react';
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
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
                    <h2 className="breadcrumb_title">{t('clients_management') || "Gestion des Clients"}</h2>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="text"
                        placeholder={t('search_client') || "Rechercher un client..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        style={{ width: '300px', display: 'inline-block' }}
                      />
                      <span className="badge bg-primary">
                        {clients.length} {t('clients') || "clients"}
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
                              <th scope="col">{t('name') || "Nom"}</th>
                              <th scope="col">{t('email') || "Email"}</th>
                              <th scope="col">{t('phone') || "Téléphone"}</th>
                              <th scope="col">{t('reservations') || "Réservations"}</th>
                              <th scope="col">{t('role') || "Rôle"}</th>
                              <th scope="col">{t('actions') || "Actions"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {loading ? (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">{t('loading') || "Chargement..."}</span>
                                  </div>
                                </td>
                              </tr>
                            ) : clients.length === 0 ? (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  <i className="fa fa-users" style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}></i>
                                  <p>{t('no_clients') || "Aucun client"}</p>
                                </td>
                              </tr>
                            ) : (
                              clients.map((client) => (
                                <tr key={client.id}>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <i className="fa fa-user me-2 text-thm"></i>
                                      {client.firstName} {client.lastName}
                                    </div>
                                  </td>
                                  <td>{client.email}</td>
                                  <td>{client.phone || '-'}</td>
                                  <td>
                                    <span className="badge bg-info">
                                      {client._count?.bookings || 0}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={`badge ${client.role === 'ADMIN' ? 'bg-danger' : client.role === 'MANAGER' ? 'bg-warning' : 'bg-primary'}`}>
                                      {client.role}
                                    </span>
                                  </td>
                                  <td>
                                    <Link 
                                      href={{ 
                                        pathname: '/admin/clients/[id]', 
                                        params: { id: client.id } 
                                      }} 
                                      className="btn btn-sm btn-primary"
                                    >
                                      <i className="fa fa-eye me-1"></i>
                                      {t('view_profile') || "Voir profil"}
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>

                      {meta && meta.totalPages > 1 && (
                        <div className="mbp_pagination">
                          <ul className="page_navigation">
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                              >
                                {t('previous') || "Précédent"}
                              </button>
                            </li>
                            <li className="page-item">
                              <span className="page-link">
                                {t('page') || "Page"} {meta.page} {t('of') || "sur"} {meta.totalPages}
                              </span>
                            </li>
                            <li className="page-item">
                              <button
                                className="page-link"
                                onClick={() => setPage(p => Math.min(meta.totalPages, p + 1))}
                                disabled={page === meta.totalPages}
                              >
                                {t('next') || "Suivant"}
                              </button>
                            </li>
                          </ul>
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

export default AdminClients;
