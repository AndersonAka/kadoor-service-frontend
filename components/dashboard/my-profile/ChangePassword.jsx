'use client';

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";

const ChangePassword = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const t = useTranslations('Admin');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: t('passwords_not_match') || 'Les mots de passe ne correspondent pas' });
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage({ type: 'error', text: t('password_too_short') || 'Le mot de passe doit contenir au moins 6 caractères' });
      return;
    }

    try {
      setLoading(true);
      setMessage(null);
      await adminService.changePassword(user.id, formData.oldPassword, formData.newPassword);
      setMessage({ type: 'success', text: t('password_change_success') || 'Mot de passe modifié avec succès' });
      setFormData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || t('password_change_error') || 'Erreur lors du changement de mot de passe' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div className={`p-4 rounded-lg mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="space-y-6">
        <div className="max-w-md">
          <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-2">
            {t('old_password') || "Ancien mot de passe"}
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              {t('new_password') || "Nouveau mot de passe"}
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              {t('confirm_new_password') || "Confirmer le nouveau mot de passe"}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {t('updating') || "Mise à jour..."}
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                {t('update_password') || "Mettre à jour le mot de passe"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
