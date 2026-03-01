'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
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
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!apartment) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <h4 className="text-xl font-semibold text-gray-900 mb-4">{t('apartment_not_found') || "Appartement non trouvé"}</h4>
          <Link href="/admin/apartments" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
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
        <h1 className="text-2xl font-bold text-gray-900">{t('edit_apartment') || "Modifier l'appartement"}</h1>
        <Link href="/admin/apartments" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
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
                <option value="Studio">Studio</option>
                <option value="T1">T1</option>
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T4+">T4+</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('city') || "Ville"} *</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('address') || "Adresse"}</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('price_per_night') || "Prix/nuit (FCFA)"} *</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="pricePerNight"
                value={formData.pricePerNight}
                onChange={handleChange}
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('bedrooms') || "Chambres"}</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('bathrooms') || "Salles de bain"}</label>
              <input
                type="number"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                min="0"
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
              <Link href="/admin/apartments" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                {t('cancel') || "Annuler"}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminApartmentDetails;
