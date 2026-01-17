'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const AdminApartmentDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const t = useTranslations('Admin');

  useEffect(() => {
    if (params.id) {
      fetchApartment();
    }
  }, [params.id]);

  const fetchApartment = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getApartment(params.id);
      setApartment(data);
      setFormData({
        title: data.title || '',
        type: data.type || '',
        city: data.city || '',
        address: data.address || '',
        pricePerNight: data.pricePerNight || '',
        bedrooms: data.bedrooms || '',
        bathrooms: data.bathrooms || '',
        area: data.area || '',
        description: data.description || '',
        isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
      });
    } catch (error) {
      console.error('Error fetching apartment:', error);
      setError(t('error_loading_apartment') || 'Erreur lors du chargement de l\'appartement');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      await adminService.updateApartment(params.id, formData);
      alert(t('apartment_update_success') || 'Appartement mis à jour avec succès');
      router.push('/admin/apartments');
    } catch (error) {
      setError(t('apartment_update_error') || 'Erreur lors de la mise à jour de l\'appartement');
    } finally {
      setSaving(false);
    }
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

  if (!apartment) {
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
          <h4>{t('apartment_not_found') || "Appartement non trouvé"}</h4>
          <Link href="/admin/apartments" className="btn btn-thm">{t('back_to_list') || "Retour à la liste"}</Link>
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
                    <h2 className="breadcrumb_title">{t('edit_apartment') || "Modifier l'appartement"}</h2>
                    <Link href="/admin/apartments" className="btn btn-thm-outline">
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
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label>{t('title') || "Titre"} *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label>{t('type') || "Type"} *</label>
                            <select className="form-control" name="type" value={formData.type} onChange={handleChange} required>
                              <option value="">{t('select_type') || "Sélectionner un type"}</option>
                              <option value="Studio">Studio</option>
                              <option value="T1">T1</option>
                              <option value="T2">T2</option>
                              <option value="T3">T3</option>
                              <option value="T4+">T4+</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label>{t('city') || "Ville"} *</label>
                            <input
                              type="text"
                              className="form-control"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label>{t('address') || "Adresse"}</label>
                            <input
                              type="text"
                              className="form-control"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label>{t('price_per_night') || "Prix/nuit (FCFA)"} *</label>
                            <input
                              type="number"
                              className="form-control"
                              name="pricePerNight"
                              value={formData.pricePerNight}
                              onChange={handleChange}
                              required
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label>{t('bedrooms') || "Chambres"}</label>
                            <input
                              type="number"
                              className="form-control"
                              name="bedrooms"
                              value={formData.bedrooms}
                              onChange={handleChange}
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label>{t('bathrooms') || "Salles de bain"}</label>
                            <input
                              type="number"
                              className="form-control"
                              name="bathrooms"
                              value={formData.bathrooms}
                              onChange={handleChange}
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="my_profile_setting_input form-group">
                            <label>
                              <input
                                type="checkbox"
                                name="isAvailable"
                                checked={formData.isAvailable}
                                onChange={handleChange}
                                className="me-2"
                              />
                              {t('available') || "Disponible"}
                            </label>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="my_profile_setting_input form-group">
                            <label>{t('description') || "Description"}</label>
                            <textarea
                              className="form-control"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              rows="5"
                            />
                          </div>
                        </div>

                        <div className="col-xl-12">
                          <div className="my_profile_setting_input">
                            <button type="submit" className="btn btn-thm" disabled={saving}>
                              {saving ? (
                                <>
                                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                  {t('saving') || "Enregistrement..."}
                                </>
                              ) : (
                                <>
                                  <i className="fa fa-save me-2"></i>
                                  {t('save_changes') || "Enregistrer les modifications"}
                                </>
                              )}
                            </button>
                            <Link href="/admin/apartments" className="btn btn-secondary ms-2">
                              {t('cancel') || "Annuler"}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </form>
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

export default AdminApartmentDetails;
