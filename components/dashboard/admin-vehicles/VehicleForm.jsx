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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      
      const data = {
        ...formData,
        pricePerDay: parseFloat(formData.pricePerDay),
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

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className={labelClass}>{t('title') || "Titre"} *</label>
          <input
            type="text"
            className={inputClass}
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Ex: Toyota Corolla 2023"
          />
        </div>

        {/* Type */}
        <div>
          <label className={labelClass}>{t('type') || "Type"} *</label>
          <select 
            className={inputClass} 
            name="type" 
            value={formData.type} 
            onChange={handleChange} 
            required
          >
            <option value="">{t('select_type') || "Sélectionner un type"}</option>
            <option value="Berline">Berline</option>
            <option value="SUV">SUV</option>
            <option value="Utilitaire">Utilitaire</option>
            <option value="Fourgonnette">Fourgonnette</option>
            <option value="Luxe">Luxe</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>{t('description') || "Description"} *</label>
        <textarea
          className={inputClass}
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Description du véhicule..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Make */}
        <div>
          <label className={labelClass}>{t('make') || "Marque"}</label>
          <input
            type="text"
            className={inputClass}
            name="make"
            value={formData.make}
            onChange={handleChange}
            placeholder="Ex: Toyota"
          />
        </div>

        {/* Model */}
        <div>
          <label className={labelClass}>{t('model') || "Modèle"}</label>
          <input
            type="text"
            className={inputClass}
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="Ex: Corolla"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fuel */}
        <div>
          <label className={labelClass}>{t('fuel') || "Carburant"}</label>
          <select className={inputClass} name="fuel" value={formData.fuel} onChange={handleChange}>
            <option value="">{t('select') || "Sélectionner"}</option>
            <option value="Essence">Essence</option>
            <option value="Diesel">Diesel</option>
            <option value="Électrique">Électrique</option>
            <option value="Hybride">Hybride</option>
          </select>
        </div>

        {/* Transmission */}
        <div>
          <label className={labelClass}>{t('transmission') || "Transmission"}</label>
          <select className={inputClass} name="transmission" value={formData.transmission} onChange={handleChange}>
            <option value="">{t('select') || "Sélectionner"}</option>
            <option value="Manuelle">Manuelle</option>
            <option value="Automatique">Automatique</option>
          </select>
        </div>

        {/* Seats */}
        <div>
          <label className={labelClass}>{t('seats') || "Places"}</label>
          <input
            type="number"
            className={inputClass}
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            min="1"
            max="50"
            placeholder="Ex: 5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Location */}
        <div>
          <label className={labelClass}>{t('location') || "Localisation"}</label>
          <input
            type="text"
            className={inputClass}
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ex: Abidjan, Cocody"
          />
        </div>

        {/* Price per day */}
        <div>
          <label className={labelClass}>{t('price_per_day') || "Prix/jour (FCFA)"} *</label>
          <input
            type="number"
            className={inputClass}
            name="pricePerDay"
            value={formData.pricePerDay}
            onChange={handleChange}
            required
            min="0"
            placeholder="Ex: 25000"
          />
        </div>
      </div>

      {/* Available checkbox */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isAvailable"
          id="isAvailable"
          checked={formData.isAvailable}
          onChange={handleChange}
          className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="isAvailable" className="text-sm font-medium text-gray-700">
          {t('available') || "Disponible à la location"}
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
        <button 
          type="submit" 
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          disabled={saving}
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              {t('saving') || "Enregistrement..."}
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {vehicle ? (t('update') || "Mettre à jour") : (t('create') || "Créer")}
            </>
          )}
        </button>
        <button
          type="button"
          className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          onClick={() => router.push('/admin/vehicles')}
        >
          {t('cancel') || "Annuler"}
        </button>
      </div>
    </form>
  );
};

export default VehicleForm;
