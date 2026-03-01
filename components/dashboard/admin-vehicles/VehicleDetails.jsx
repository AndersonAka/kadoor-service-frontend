'use client'

import { useEffect, useState } from 'react';
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
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
  const [images, setImages] = useState([]);
  const [newImageUrl, setNewImageUrl] = useState('');
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
      setImages(data.images || []);
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

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages(prev => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleMoveImage = (index, direction) => {
    const newImages = [...images];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < newImages.length) {
      [newImages[index], newImages[newIndex]] = [newImages[newIndex], newImages[index]];
      setImages(newImages);
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
      await adminService.updateVehicle(params.id, { ...formData, images });
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

            {/* Images Section */}
            <div className="md:col-span-2 border-t pt-6 mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-4">{t('images') || "Images"}</label>
              
              {/* Current Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-video relative rounded-lg overflow-hidden border border-gray-200">
                        <Image
                          src={img}
                          alt={`Image ${index + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImage(index, 'up')}
                            className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                            title={t('move_up') || "Déplacer vers le haut"}
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        )}
                        {index < images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => handleMoveImage(index, 'down')}
                            className="p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100"
                            title={t('move_down') || "Déplacer vers le bas"}
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="p-1.5 bg-red-500 rounded-full shadow-md hover:bg-red-600"
                          title={t('remove_image') || "Supprimer l'image"}
                        >
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-white text-xs rounded">
                          {t('main_image') || "Principale"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Add New Image */}
              <div className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  placeholder={t('image_url_placeholder') || "URL de l'image (https://...)"}
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {t('add_image') || "Ajouter"}
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">{t('image_hint') || "La première image sera utilisée comme image principale"}</p>
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
