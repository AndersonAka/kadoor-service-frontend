'use client'

import { useEffect, useState } from 'react';
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email?.toLowerCase().includes(search.toLowerCase())
  );

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
                    <h2 className="breadcrumb_title">{t('newsletter_management') || "Gestion de la Newsletter"}</h2>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="text"
                        placeholder={t('search_subscribers') || "Rechercher un abonné..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control"
                        style={{ width: '300px', display: 'inline-block' }}
                      />
                      <span className="badge bg-primary">
                        {filteredSubscribers.length} {t('subscribers') || "abonnés"}
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
                    ) : filteredSubscribers.length === 0 ? (
                      <div className="text-center py-5">
                        <i className="fa fa-envelope-o" style={{ fontSize: '64px', color: '#ccc', marginBottom: '20px' }}></i>
                        <h5 className="mb-3">{t('no_subscribers') || "Aucun abonné"}</h5>
                        <p className="text-muted">
                          {search 
                            ? t('no_subscribers_search') || "Aucun abonné ne correspond à votre recherche."
                            : t('no_subscribers_description') || "Aucun abonné à la newsletter pour le moment."}
                        </p>
                      </div>
                    ) : (
                      <div className="table-responsive mt0">
                        <table className="table">
                          <thead className="thead-light">
                            <tr>
                              <th scope="col">{t('email') || "Email"}</th>
                              <th scope="col">{t('subscription_date') || "Date d'abonnement"}</th>
                              <th scope="col">{t('status') || "Statut"}</th>
                              <th scope="col">{t('actions') || "Actions"}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredSubscribers.map((subscriber) => (
                              <tr key={subscriber.id || subscriber.email}>
                                <td>
                                  <div className="d-flex align-items-center">
                                    <i className="fa fa-envelope me-2 text-thm"></i>
                                    {subscriber.email}
                                  </div>
                                </td>
                                <td>{formatDate(subscriber.createdAt)}</td>
                                <td>
                                  <span className={`badge ${subscriber.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                    {subscriber.isActive 
                                      ? (t('active') || "Actif") 
                                      : (t('inactive') || "Inactif")}
                                  </span>
                                </td>
                                <td>
                                  {subscriber.isActive && (
                                    <button
                                      className="btn btn-sm btn-danger"
                                      onClick={() => handleUnsubscribe(subscriber.email)}
                                      title={t('unsubscribe') || "Désabonner"}
                                    >
                                      <i className="fa fa-times me-1"></i>
                                      {t('unsubscribe') || "Désabonner"}
                                    </button>
                                  )}
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
    </>
  );
};

export default AdminNewsletter;
