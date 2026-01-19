'use client'

import { useState } from 'react';
import { useRouter } from "@/i18n/routing";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";

const VehicleForm = ({ vehicle = null }) => {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: vehicle?.title || '',
    description: vehicle?.description || '',
    type: vehicle?.type || '',
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    year: vehicle?.year || '',
    fuel: vehicle?.fuel || '',
    transmission: vehicle?.transmission || '',
    seats: vehicle?.seats || '',
    location: vehicle?.location || '',
    pricePerDay: vehicle?.pricePerDay || '',
    isAvailable: vehicle?.isAvailable !== undefined ? vehicle.isAvailable : true,
    features: vehicle?.features || [],
  });
  const t = useTranslations('Admin');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const features = prev.features || [];
      if (checked) {
        return { ...prev, features: [...features, value] };
      } else {
        return { ...prev, features: features.filter(f => f !== value) };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      
      const data = {
        ...formData,
        pricePerDay: parseFloat(formData.pricePerDay),
        year: formData.year ? parseInt(formData.year) : undefined,
        seats: formData.seats ? parseInt(formData.seats) : undefined,
      };

      if (vehicle) {
        await adminService.updateVehicle(vehicle.id, data);
        alert(t('vehicle_update_success') || 'Véhicule mis à jour avec succès');
      } else {
        await adminService.createVehicle(data);
        alert(t('vehicle_create_success') || 'Véhicule créé avec succès');
      }
      
      router.push('/admin/vehicles');
    } catch (error) {
      console.error('Error saving vehicle:', error);
      setError(error.message || (vehicle ? t('vehicle_update_error') : t('vehicle_create_error')) || 'Erreur lors de l\'enregistrement');
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
            <label>{t('type') || "Type"} *</label>
            <select className="form-control" name="type" value={formData.type} onChange={handleChange} required>
              <option value="">{t('select_type') || "Sélectionner un type"}</option>
              <option value="Berline">Berline</option>
              <option value="SUV">SUV</option>
              <option value="Utilitaire">Utilitaire</option>
              <option value="Luxe">Luxe</option>
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
            <label>{t('make') || "Marque"}</label>
            <input
              type="text"
              className="form-control"
              name="make"
              value={formData.make}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label>{t('model') || "Modèle"}</label>
            <input
              type="text"
              className="form-control"
              name="model"
              value={formData.model}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('year') || "Année"}</label>
            <input
              type="number"
              className="form-control"
              name="year"
              value={formData.year}
              onChange={handleChange}
              min="1900"
              max={new Date().getFullYear() + 1}
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('fuel') || "Carburant"}</label>
            <select className="form-control" name="fuel" value={formData.fuel} onChange={handleChange}>
              <option value="">{t('select') || "Sélectionner"}</option>
              <option value="Essence">Essence</option>
              <option value="Diesel">Diesel</option>
              <option value="Électrique">Électrique</option>
              <option value="Hybride">Hybride</option>
            </select>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('transmission') || "Transmission"}</label>
            <select className="form-control" name="transmission" value={formData.transmission} onChange={handleChange}>
              <option value="">{t('select') || "Sélectionner"}</option>
              <option value="Manuelle">Manuelle</option>
              <option value="Automatique">Automatique</option>
            </select>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('seats') || "Places"}</label>
            <input
              type="number"
              className="form-control"
              name="seats"
              value={formData.seats}
              onChange={handleChange}
              min="1"
              max="50"
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('location') || "Localisation"}</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="my_profile_setting_input form-group">
            <label>{t('price_per_day') || "Prix/jour (FCFA)"} *</label>
            <input
              type="number"
              className="form-control"
              name="pricePerDay"
              value={formData.pricePerDay}
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
                  {vehicle ? (t('update') || "Mettre à jour") : (t('create') || "Créer")}
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-thm-outline ms-2"
              onClick={() => router.push('/admin/vehicles')}
            >
              {t('cancel') || "Annuler"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VehicleForm;
