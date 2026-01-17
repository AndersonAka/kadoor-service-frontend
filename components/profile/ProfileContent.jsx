'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { api } from "@/utils/api";

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

  return (
    <div className="row">
      <div className="col-lg-4 col-xl-4">
        <div className="profile-card text-center mb30">
          <div className="profile-avatar mb20">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={`${user.firstName} ${user.lastName}`}
                width={150}
                height={150}
                className="rounded-circle"
                style={{ objectFit: 'cover', border: '4px solid #d4af37' }}
              />
            ) : (
              <div
                className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
                style={{
                  width: '150px',
                  height: '150px',
                  background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
                  color: '#fff',
                  fontSize: '48px',
                  fontWeight: '600'
                }}
              >
                {(user.firstName?.charAt(0) || '') + (user.lastName?.charAt(0) || '') || user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <h3 className="mb10">{user.firstName} {user.lastName}</h3>
          <p className="text-muted mb20">{user.email}</p>
          {user.role && (
            <span
              className="badge"
              style={{
                backgroundColor: user.role === 'ADMIN' ? '#b91c1c' : user.role === 'MANAGER' ? '#2563eb' : '#059669',
                color: '#fff',
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }}
            >
              {user.role}
            </span>
          )}
        </div>
      </div>

      <div className="col-lg-8 col-xl-8">
        <div className="profile-form-wrapper">
          <div className="d-flex justify-content-between align-items-center mb30">
            <h4>{t('profile_information') || 'Informations du profil'}</h4>
            {!isEditing && (
              <button
                className="btn btn-thm"
                onClick={() => setIsEditing(true)}
              >
                <i className="fa fa-edit me-2"></i>
                {t('edit') || 'Modifier'}
              </button>
            )}
          </div>

          {message.text && (
            <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb20">
                <div className="form-group">
                  <label>{t('first_name') || 'Prénom'}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6 mb20">
                <div className="form-group">
                  <label>{t('last_name') || 'Nom'}</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    required
                  />
                </div>
              </div>

              <div className="col-md-6 mb20">
                <div className="form-group">
                  <label>{t('email') || 'Email'}</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={true}
                    required
                  />
                  <small className="text-muted">{t('email_not_editable') || 'L\'email ne peut pas être modifié'}</small>
                </div>
              </div>

              <div className="col-md-6 mb20">
                <div className="form-group">
                  <label>{t('phone') || 'Téléphone'}</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="d-flex gap-2 mt30">
                <button
                  type="submit"
                  className="btn btn-thm"
                  disabled={loading}
                >
                  {loading ? t('saving') || 'Enregistrement...' : t('save') || 'Enregistrer'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      firstName: user.firstName || '',
                      lastName: user.lastName || '',
                      email: user.email || '',
                      phone: user.phone || '',
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
      </div>
    </div>
  );
};

export default ProfileContent;
