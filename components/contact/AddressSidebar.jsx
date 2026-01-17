'use client';

import { useTranslations } from 'next-intl';
import Social from "../common/footer/Social";

const AddressSidebar = () => {
  const t = useTranslations('ContactPage');

  return (
    <div className="contact_localtion">
      <h4 className="fw-bold" style={{ color: '#b91c1c' }}>
        <i className="flaticon-placeholder me-2"></i>
        {t('contact_info') || 'Informations de contact'}
      </h4>
      <p className="text-muted">
        {t('contact_description') || 'Notre équipe est à votre disposition pour vous assister.'}
      </p>
      <div className="content_list">
        <h5 className="d-flex align-items-center">
          <i className="flaticon-placeholder me-2 text-thm" style={{ color: '#b91c1c' }}></i>
          {t('address') || 'Adresse'}
        </h5>
        <p>
          {t('address_value') || 'Douala, Cameroun'}
        </p>
      </div>
      <div className="content_list">
        <h5 className="d-flex align-items-center">
          <i className="flaticon-phone-call me-2 text-thm" style={{ color: '#b91c1c' }}></i>
          {t('phone')}
        </h5>
        <p>
          <a 
            href={t('whatsapp_link') || 'https://wa.me/2250716673212'} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#25D366', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            <i className="fa fa-whatsapp me-2" style={{ fontSize: '1.2rem' }}></i>
            {t('phone_value') || '+225 0716673212 (WhatsApp)'}
          </a>
        </p>
      </div>
      <div className="content_list">
        <h5 className="d-flex align-items-center">
          <i className="flaticon-email me-2 text-thm" style={{ color: '#b91c1c' }}></i>
          {t('email')}
        </h5>
        <p>
          <a 
            href={`mailto:${t('email_value') || 'kadoorserviceci@gmail.com'}`}
            style={{ 
              color: '#b91c1c', 
              textDecoration: 'none',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            {t('email_value') || 'kadoorserviceci@gmail.com'}
          </a>
        </p>
      </div>
      <div className="content_list">
        <h5 className="d-flex align-items-center">
          <i className="flaticon-clock me-2 text-thm" style={{ color: '#b91c1c' }}></i>
          {t('hours') || 'Horaires'}
        </h5>
        <p>{t('hours_value') || 'Lun - Ven: 8h - 18h'}</p>
      </div>
      <h5 className="mt-4">{t('follow_us') || 'Suivez-nous'}</h5>
      <ul className="contact_form_social_area">
        <Social />
      </ul>
    </div>
  );
};

export default AddressSidebar;
