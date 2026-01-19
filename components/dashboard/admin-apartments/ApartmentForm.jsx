'use client'

import { useState } from 'react';
import { useRouter } from "@/i18n/routing";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";

const ApartmentForm = ({ apartment = null }) => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: apartment?.title || '',
    description: apartment?.description || '',
    type: apartment?.type || '',
    address: apartment?.address || '',
    city: apartment?.city || '',
    pricePerNight: apartment?.pricePerNight || '',
    bedrooms: apartment?.bedrooms || '',
    bathrooms: apartment?.bathrooms || '',
    area: apartment?.area || '',
    isAvailable: apartment?.isAvailable !== undefined ? apartment.isAvailable : true,
    features: apartment?.features || [],
  });
  const t = useTranslations('Admin');

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
      
      const data = {
        ...formData,
        pricePerNight: parseFloat(formData.pricePerNight),
        bedrooms: parseInt(formData.bedrooms) || 0,
        bathrooms: parseInt(formData.bathrooms) || 0,
        area: parseFloat(formData.area) || 0,
      };

      if (apartment) {
        await adminService.updateApartment(apartment.id, data);
        alert(t('apartment_update_success') || 'Appartement mis à jour avec succès');
      } else {
        await adminService.createApartment(data);
        alert(t('apartment_create_success') || 'Appartement créé avec succès');
      }
      
      router.push('/admin/apartments');
    } catch (error) {
      console.error('Error saving apartment:', error);
      setError(error.message || (apartment ? t('apartment_update_error') : t('apartment_create_error')) || 'Erreur lors de l\'enregistrement');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="col-lg-12 mb-3">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      )}

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
            <label>{t('type') || "Type"}</label>
            <select className="form-control" name="type" value={formData.type} onChange={handleChange}>
              <option value="">{t('select_type') || "Sélectionner un type"}</option>
              <option value="Studio">Studio</option>
              <option value="Appartement">Appartement</option>
              <option value="Villa">Villa</option>
              <option value="Maison">Maison</option>
            </select>
          </div>
        </div>

        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <label>{t('description') || "Description"} *</label>
            <textarea
              className="form-control"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label>{t('address') || "Adresse"} *</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
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

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('bedrooms') || "Chambres"} *</label>
            <input
              type="number"
              className="form-control"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('bathrooms') || "Salles de bain"} *</label>
            <input
              type="number"
              className="form-control"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              min="0"
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('area') || "Superficie (m²)"}</label>
            <input
              type="number"
              className="form-control"
              name="area"
              value={formData.area}
              onChange={handleChange}
              min="0"
              step="0.01"
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

        <div className="col-lg-12">
          <div className="my_profile_setting_input form-group">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isAvailable"
                id="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="isAvailable">
                {t('available') || "Disponible"}
              </label>
            </div>
          </div>
        </div>

        <div className="col-lg-12">
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
                  {apartment ? (t('update') || "Mettre à jour") : (t('create') || "Créer")}
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-thm-outline ms-2"
              onClick={() => router.push('/admin/apartments')}
            >
              {t('cancel') || "Annuler"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ApartmentForm;
