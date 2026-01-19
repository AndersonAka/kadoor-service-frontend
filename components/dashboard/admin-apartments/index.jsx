'use client'

import { useEffect, useState } from 'react';
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const AdminApartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const t = useTranslations('Admin');

  useEffect(() => {
    fetchApartments();
  }, [page]);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getApartments({ page, limit: 10 });
      if (data.data) {
        setApartments(data.data);
        setMeta(data.meta);
      } else if (Array.isArray(data)) {
        setApartments(data);
        setMeta(null);
      } else {
        setApartments([]);
      }
    } catch (error) {
      console.error('Error fetching apartments:', error);
      setError(t('error_loading_apartments') || 'Erreur lors du chargement des appartements');
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm(t('confirm_delete_apartment') || 'Êtes-vous sûr de vouloir supprimer cet appartement ?')) {
      return;
    }

    try {
      await adminService.deleteApartment(id);
      alert(t('delete_success') || 'Appartement supprimé avec succès');
      fetchApartments();
    } catch (error) {
      alert(t('delete_error') || 'Erreur lors de la suppression');
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
                    <h2 className="breadcrumb_title">{t('apartments_management') || "Gestion des Appartements"}</h2>
                    <Link href="/admin/apartments/new" className="btn btn-thm">
                      <i className="flaticon-plus"></i> {t('add_apartment') || "Ajouter un appartement"}
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
                    <div className="property_table">
                      <div className="table-responsive mt0">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">{t('title') || "Titre"}</th>
                              <th scope="col">{t('city') || "Ville"}</th>
                              <th scope="col">{t('bedrooms') || "Chambres"}</th>
                              <th scope="col">{t('price_per_night') || "Prix/nuit"}</th>
                              <th scope="col">{t('available') || "Disponible"}</th>
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
                            ) : apartments.length === 0 ? (
                              <tr>
                                <td colSpan="6" className="text-center">
                                  <i className="fa fa-home" style={{ fontSize: '48px', color: '#ccc', marginBottom: '10px' }}></i>
                                  <p>{t('no_apartments') || "Aucun appartement"}</p>
                                </td>
                              </tr>
                            ) : (
                              apartments.map((apartment) => (
                                <tr key={apartment.id}>
                                  <td>{apartment.title}</td>
                                  <td>{apartment.city}</td>
                                  <td>{apartment.bedrooms}</td>
                                  <td>{apartment.pricePerNight?.toLocaleString('fr-FR')} FCFA</td>
                                  <td>
                                    <span className={`badge ${apartment.isAvailable ? 'bg-success' : 'bg-danger'}`}>
                                      {apartment.isAvailable ? (t('yes') || 'Oui') : (t('no') || 'Non')}
                                    </span>
                                  </td>
                                  <td>
                                    <Link 
                                      href={{ 
                                        pathname: '/admin/apartments/[id]', 
                                        params: { id: apartment.id } 
                                      }} 
                                      className="btn btn-sm btn-primary"
                                    >
                                      <i className="fa fa-edit me-1"></i>
                                      {t('edit') || "Modifier"}
                                    </Link>
                                    <button
                                      onClick={() => handleDelete(apartment.id)}
                                      className="btn btn-sm btn-danger ms-2"
                                    >
                                      <i className="fa fa-trash me-1"></i>
                                      {t('delete') || "Supprimer"}
                                    </button>
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

export default AdminApartments;
