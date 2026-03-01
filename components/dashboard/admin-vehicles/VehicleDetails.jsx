'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const AdminVehicleDetails = () => {
  const params = useParams();
  const router = useRouter();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const t = useTranslations('Admin');

  useEffect(() => {
    if (params.id) {
      fetchVehicle();
    }
  }, [params.id]);

  const fetchVehicle = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getVehicle(params.id);
      setVehicle(data);
      setFormData({
        title: data.title || '',
        type: data.type || '',
        brand: data.brand || '',
        model: data.model || '',
        year: data.year || '',
        pricePerDay: data.pricePerDay || '',
        location: data.location || '',
        description: data.description || '',
        seats: data.seats || '',
        transmission: data.transmission || '',
        fuelType: data.fuelType || '',
        isAvailable: data.isAvailable !== undefined ? data.isAvailable : true,
      });
    } catch (error) {
      console.error('Error fetching vehicle:', error);
      setError(t('error_loading_vehicle') || 'Erreur lors du chargement du véhicule');
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
      await adminService.updateVehicle(params.id, formData);
      alert(t('vehicle_update_success') || 'Véhicule mis à jour avec succès');
      router.push('/admin/vehicles');
    } catch (error) {
      setError(t('vehicle_update_error') || 'Erreur lors de la mise à jour du véhicule');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!vehicle) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('vehicle_not_found') || "Véhicule non trouvé"}</h4>
          <Link href="/admin/vehicles" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            {t('back_to_list') || "Retour à la liste"}
          </Link>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t('edit_vehicle') || "Modifier le véhicule"}</h1>
        <Link href="/admin/vehicles" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('back_to_list') || "Retour à la liste"}
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('title') || "Titre"} *</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('type') || "Type"} *</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">{t('select_type') || "Sélectionner un type"}</option>
                <option value="Berline">Berline</option>
                <option value="SUV">SUV</option>
                <option value="4x4">4x4</option>
                <option value="Citadine">Citadine</option>
                <option value="Utilitaire">Utilitaire</option>
                <option value="Luxe">Luxe</option>
                <option value="Fourgonnette">Fourgonnette</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('brand') || "Marque"}</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('model') || "Modèle"}</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('price_per_day') || "Prix/jour (FCFA)"} *</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('location') || "Localisation"}</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('transmission') || "Transmission"}</label>
              <select
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
              >
                <option value="">Sélectionner</option>
                <option value="Automatique">Automatique</option>
                <option value="Manuelle">Manuelle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('seats') || "Places"}</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="seats"
                value={formData.seats}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700">{t('available') || "Disponible"}</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('description') || "Description"}</label>
              <textarea
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
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
                    {t('save_changes') || "Enregistrer"}
                  </>
                )}
              </button>
              <Link href="/admin/vehicles" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                {t('cancel') || "Annuler"}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminVehicleDetails;
