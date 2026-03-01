'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

const ProfileContent = () => {
  const { user } = useAuth();
  const t = useTranslations('Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      // TODO: Implémenter l'API de mise à jour du profil
      // await api.updateProfile(token, formData);
      
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors de la mise à jour du profil' });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-700 disabled:bg-gray-100 disabled:text-gray-500";

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Profile Card */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <div className="mb-6">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                width={150}
                height={150}
                className="rounded-full mx-auto object-cover border-4 border-primary/20"
              />
            ) : (
              <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center bg-gradient-to-br from-primary to-primary/60 text-white text-4xl font-semibold">
                {(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '') || user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{user.firstName} {user.lastName}</h3>
          <p className="text-gray-500 mb-4">{user.email}</p>
          {user.role && (
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white ${
              user.role === 'ADMIN' ? 'bg-red-600' : user.role === 'MANAGER' ? 'bg-blue-600' : 'bg-green-600'
            }`}>
              {user.role}
            </span>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-xl font-bold text-gray-900">{t('profile_information') || 'Informations du profil'}</h4>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                {t('edit') || 'Modifier'}
              </button>
            )}
          </div>

          {message.text && (
            <div className={`mb-6 p-4 rounded-lg text-sm ${
              message.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('first_name') || 'Prénom'}</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={!isEditing} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('last_name') || 'Nom'}</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={!isEditing} required className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('email') || 'Email'}</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={true} required className={inputClass} />
                <p className="text-xs text-gray-400 mt-1">{t('email_not_editable') || "L'email ne peut pas être modifié"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone') || 'Téléphone'}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} className={inputClass} />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-8">
                <button type="submit" disabled={loading} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {loading ? t('saving') || 'Enregistrement...' : t('save') || 'Enregistrer'}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ firstName: user.firstName || '', lastName: user.lastName || '', email: user.email || '', phone: user.phone || '' });
                    setMessage({ type: '', text: '' });
                  }}
                >
                  {t('cancel') || 'Annuler'}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
