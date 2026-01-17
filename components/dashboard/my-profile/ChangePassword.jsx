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
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`} role="alert">
          {message.text}
        </div>
      )}

      <div className="row">
        <div className="col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="oldPassword">{t('old_password') || "Ancien mot de passe"}</label>
            <input
              type="password"
              className="form-control"
              id="oldPassword"
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>
      {/* End .row */}

      <div className="row">
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="newPassword">{t('new_password') || "Nouveau mot de passe"}</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="confirmPassword">
              {t('confirm_new_password') || "Confirmer le nouveau mot de passe"}
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-xl-12">
          <div className="my_profile_setting_input">
            <button type="submit" className="btn btn-thm" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  {t('updating') || "Mise à jour..."}
                </>
              ) : (
                <>
                  <i className="fa fa-key me-2"></i>
                  {t('update_password') || "Mettre à jour le mot de passe"}
                </>
              )}
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default ChangePassword;
