'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Image from "next/image";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const ProfileContent = () => {
  const { user, setUser, logout } = useAuth();
  const t = useTranslations('Profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
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
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
        }),
      });

      if (!response.ok) throw new Error('Failed to update profile');
      
      const updatedUser = await response.json();
      setUser(updatedUser);
      setMessage({ type: 'success', text: t('profile_updated') || 'Profil mis à jour avec succès !' });
      setIsEditing(false);
    } catch (error) {
      setMessage({ type: 'error', text: t('profile_update_error') || 'Erreur lors de la mise à jour du profil' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage({ type: 'error', text: t('passwords_not_match') || 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: t('password_too_short') || 'Le mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage({ type: '', text: '' });

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to change password');
      }
      
      setPasswordMessage({ type: 'success', text: t('password_changed') || 'Mot de passe modifié avec succès !' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setShowPasswordForm(false), 2000);
    } catch (error) {
      setPasswordMessage({ type: 'error', text: error.message || t('password_change_error') || 'Erreur lors du changement de mot de passe' });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/deactivate-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to deactivate account');
      
      logout();
    } catch (error) {
      console.error('Error deactivating account:', error);
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (!user) {
    return null;
  }

  const inputClass = "w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-gray-700 disabled:bg-gray-100 disabled:text-gray-500";

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Profile Card */}
      <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
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
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {user.firstName || user.lastName ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : t('no_name') || 'Nom non défini'}
          </h3>
          <p className="text-gray-500 mb-4">{user.email}</p>
          {user.role && (
            <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold text-white ${
              user.role === 'ADMIN' ? 'bg-red-600' : user.role === 'MANAGER' ? 'bg-blue-600' : 'bg-green-600'
            }`}>
              {user.role}
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-3">
          <button
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span className="font-medium">{t('change_password') || 'Changer le mot de passe'}</span>
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span className="font-medium">{t('delete_account') || 'Supprimer le compte'}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Profile Form */}
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
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} disabled={!isEditing} className={inputClass} placeholder={t('first_name_placeholder') || 'Entrez votre prénom'} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('last_name') || 'Nom'}</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} disabled={!isEditing} className={inputClass} placeholder={t('last_name_placeholder') || 'Entrez votre nom'} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('email') || 'Email'}</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={true} required className={inputClass} />
                <p className="text-xs text-gray-400 mt-1">{t('email_not_editable') || "L'email ne peut pas être modifié"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('phone') || 'Téléphone'}</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} className={inputClass} placeholder={t('phone_placeholder') || '+225 00 00 00 00'} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t('address') || 'Adresse'}</label>
                <input type="text" name="address" value={formData.address} onChange={handleInputChange} disabled={!isEditing} className={inputClass} placeholder={t('address_placeholder') || 'Votre lieu de résidence (optionnel)'} />
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
                    setFormData({ 
                      firstName: user.firstName || '', 
                      lastName: user.lastName || '', 
                      email: user.email || '', 
                      phone: user.phone || '',
                      address: user.address || '',
                    });
                    setMessage({ type: '', text: '' });
                  }}
                >
                  {t('cancel') || 'Annuler'}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Password Change Form */}
        {showPasswordForm && (
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6">{t('change_password') || 'Changer le mot de passe'}</h4>
            
            {passwordMessage.text && (
              <div className={`mb-6 p-4 rounded-lg text-sm ${
                passwordMessage.type === 'success' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'
              }`}>
                {passwordMessage.text}
              </div>
            )}

            <form onSubmit={handlePasswordChange}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('current_password') || 'Mot de passe actuel'}</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('new_password') || 'Nouveau mot de passe'}</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    required
                    minLength={6}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('confirm_password') || 'Confirmer le nouveau mot de passe'}</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    minLength={6}
                    className={inputClass}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" disabled={passwordLoading} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50">
                  {passwordLoading ? t('saving') || 'Enregistrement...' : t('change_password') || 'Changer le mot de passe'}
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordMessage({ type: '', text: '' });
                  }}
                >
                  {t('cancel') || 'Annuler'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Delete Account Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('delete_account_title') || 'Supprimer votre compte ?'}</h3>
              <p className="text-gray-600">{t('delete_account_description') || 'Votre compte sera désactivé. Vous pourrez le réactiver en vous reconnectant avec les mêmes identifiants.'}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                {t('cancel') || 'Annuler'}
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleteLoading}
                className="flex-1 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {deleteLoading ? t('deleting') || 'Suppression...' : t('confirm_delete') || 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
