'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { incidentService } from '@/services/incidentService';
import { useAuth } from '@/context/AuthContext';

const IncidentForm = () => {
  const t = useTranslations('ContactPage');
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    location: '',
    date: '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    vehicleId: '',
    apartmentId: '',
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [incidentId, setIncidentId] = useState('');

  const incidentTypes = [
    { value: 'ACCIDENT', label: t('types.ACCIDENT') },
    { value: 'PANNE', label: t('types.PANNE') },
    { value: 'SINISTRE', label: t('types.SINISTRE') },
    { value: 'VOL', label: t('types.VOL') },
    { value: 'DOMMAGE', label: t('types.DOMMAGE') },
    { value: 'AUTRES', label: t('types.AUTRES') },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    // Pour l'instant, on stocke juste les noms de fichiers
    // En production, il faudrait uploader les images et récupérer les URLs
    setFormData((prev) => ({
      ...prev,
      images: files.map((f) => f.name),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    // Validation
    if (!formData.type) {
      setSubmitError(t('errors.type_required'));
      setIsSubmitting(false);
      return;
    }
    if (!formData.title) {
      setSubmitError(t('errors.title_required'));
      setIsSubmitting(false);
      return;
    }
    if (!formData.description) {
      setSubmitError(t('errors.description_required'));
      setIsSubmitting(false);
      return;
    }
    if (!formData.firstName) {
      setSubmitError(t('errors.first_name_required'));
      setIsSubmitting(false);
      return;
    }
    if (!formData.lastName) {
      setSubmitError(t('errors.last_name_required'));
      setIsSubmitting(false);
      return;
    }
    if (!formData.email) {
      setSubmitError(t('errors.email_required'));
      setIsSubmitting(false);
      return;
    }

    try {
      const incidentData = {
        type: formData.type,
        title: formData.title,
        description: formData.description,
        location: formData.location || undefined,
        date: formData.date || undefined,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        vehicleId: formData.vehicleId || undefined,
        apartmentId: formData.apartmentId || undefined,
        images: formData.images || [],
      };

      const result = await incidentService.createIncident(incidentData);
      setIncidentId(result.id);
      setSubmitSuccess(true);
      
      // Réinitialiser le formulaire
      setFormData({
        type: '',
        title: '',
        description: '',
        location: '',
        date: '',
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        phone: user?.phone || '',
        vehicleId: '',
        apartmentId: '',
        images: [],
      });
    } catch (error) {
      setSubmitError(error.message || t('errors.submission_failed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div 
        className="alert alert-success border-0"
        style={{
          background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(40, 167, 69, 0.05) 100%)',
          borderLeft: '4px solid #28a745',
          borderRadius: '8px',
          padding: '2rem'
        }}
      >
        <div className="text-center">
          <i className="flaticon-check text-success mb-3" style={{ fontSize: '3rem' }}></i>
          <h4 className="text-success mb-3">{t('success_title')}</h4>
          <p className="mb-3">{t('success_message')}</p>
          {incidentId && (
            <div className="alert alert-info d-inline-block">
              <strong>{t('incident_reference')}:</strong> {incidentId}
            </div>
          )}
          <button
            type="button"
            className="btn btn-thm mt-3"
            onClick={() => {
              setSubmitSuccess(false);
              setIncidentId('');
            }}
            style={{
              background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
              border: 'none',
              borderRadius: '8px',
            }}
          >
            Déclarer un autre incident
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contact_form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-12 mb-3">
          <label htmlFor="type" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-warning me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('incident_type')} <span className="text-danger ms-1">*</span>
          </label>
          <select
            id="type"
            name="type"
            className="form-control"
            value={formData.type}
            onChange={handleChange}
            required
            style={{ borderColor: formData.type ? '#28a745' : '#ddd' }}
          >
            <option value="">{t('incident_type_placeholder')}</option>
            {incidentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="title" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-edit me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('title_label')} <span className="text-danger ms-1">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('title_placeholder')}
            required
          />
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="description" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-file me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('description_label')} <span className="text-danger ms-1">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="6"
            value={formData.description}
            onChange={handleChange}
            placeholder={t('description_placeholder')}
            required
          ></textarea>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="location" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-placeholder me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('location_label')}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="form-control"
            value={formData.location}
            onChange={handleChange}
            placeholder={t('location_placeholder')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="date" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-calendar me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('date_label')}
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="firstName" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-user me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('first_name')} <span className="text-danger ms-1">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            placeholder={t('first_name_placeholder')}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="lastName" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-user me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('last_name')} <span className="text-danger ms-1">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-control"
            value={formData.lastName}
            onChange={handleChange}
            placeholder={t('last_name_placeholder')}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-email me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('email')} <span className="text-danger ms-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder={t('email_placeholder')}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="phone" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-phone-call me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t('phone_placeholder')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="vehicleId" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-car me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('vehicle_concerned')}
          </label>
          <input
            type="text"
            id="vehicleId"
            name="vehicleId"
            className="form-control"
            value={formData.vehicleId}
            onChange={handleChange}
            placeholder={t('vehicle_concerned_placeholder')}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="apartmentId" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-home me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('apartment_concerned')}
          </label>
          <input
            type="text"
            id="apartmentId"
            name="apartmentId"
            className="form-control"
            value={formData.apartmentId}
            onChange={handleChange}
            placeholder={t('apartment_concerned_placeholder')}
          />
        </div>

        <div className="col-md-12 mb-3">
          <label htmlFor="images" className="form-label fw-semibold d-flex align-items-center">
            <i className="flaticon-image me-2 text-thm" style={{ color: '#b91c1c' }}></i>
            {t('images_label')}
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="form-control"
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
          <small className="form-text text-muted">{t('images_help')}</small>
        </div>

        {submitError && (
          <div className="col-md-12 mb-3">
            <div 
              className="alert alert-danger border-0 d-flex align-items-center"
              style={{
                background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(220, 53, 69, 0.05) 100%)',
                borderLeft: '4px solid #dc3545',
                borderRadius: '8px'
              }}
            >
              <i className="flaticon-close me-3" style={{ fontSize: '1.2rem' }}></i>
              <span>{submitError}</span>
            </div>
          </div>
        )}

        <div className="col-md-12">
          <div className="form-group mb0">
            <button
              type="submit"
              className="btn btn-lg btn-thm w-100"
              disabled={isSubmitting}
              style={{
                background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
                border: 'none',
                borderRadius: '8px',
                padding: '0.75rem 2rem',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(185, 28, 28, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(185, 28, 28, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(185, 28, 28, 0.3)';
              }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  {t('submitting')}
                </>
              ) : (
                <>
                  <i className="flaticon-send me-2"></i>
                  {t('submit')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default IncidentForm;
