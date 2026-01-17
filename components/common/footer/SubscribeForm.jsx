'use client'

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const SubscribeForm = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const t = useTranslations('Footer');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(t('invalid_email') || 'Email invalide');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(t('subscribe_success') || 'Abonnement réussi !');
        setEmail('');
        // Réinitialiser le message après 3 secondes
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 3000);
      } else {
        setStatus('error');
        setMessage(data.message || t('subscribe_error') || 'Erreur lors de l\'abonnement');
      }
    } catch (error) {
      setStatus('error');
      setMessage(t('subscribe_error') || 'Erreur lors de l\'abonnement');
    }
  };

  return (
    <form className="footer_mailchimp_form" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center">
        <div className="col-auto flex-grow-1">
          <input
            type="email"
            className="form-control mb-2"
            id="inlineFormInput"
            placeholder={t('email_placeholder') || 'Votre email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === 'loading'}
            required
          />
        </div>

        <div className="col-auto ms-2">
          <button 
            type="submit" 
            className="btn btn-primary mb-2"
            disabled={status === 'loading'}
            style={{
              borderRadius: '50%',
              height: '50px',
              width: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: status === 'loading' ? '#ccc' : 'var(--color-primary, #354765)',
              border: 'none',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'loading' ? (
              <i className="fa fa-spinner fa-spin"></i>
            ) : (
              <i className="fa fa-angle-right"></i>
            )}
          </button>
        </div>
      </div>
      
      {message && (
        <div 
          className={`mt-2 ${status === 'success' ? 'text-success' : 'text-danger'}`}
          style={{ fontSize: '12px' }}
        >
          {message}
        </div>
      )}
    </form>
  );
};

export default SubscribeForm;
