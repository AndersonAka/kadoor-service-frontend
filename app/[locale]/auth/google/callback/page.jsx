'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { api } from '@/utils/api';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('Auth');
  const { setUserFromToken } = useAuth();
  const toast = useToast();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      const token = searchParams.get('token');
      const errorParam = searchParams.get('error');

      if (errorParam) {
        setError(t('google_auth_failed') || 'Échec de l\'authentification Google');
        setLoading(false);
        return;
      }

      if (token) {
        try {
          // Stocker le token
          localStorage.setItem('token', token);
          
          // Récupérer le profil utilisateur
          const profile = await api.getProfile(token);
          
          if (profile) {
            // Stocker un flag pour afficher la notification après redirection
            sessionStorage.setItem('showLoginSuccess', 'true');
            sessionStorage.setItem('loginUserName', profile.firstName || profile.email);
            
            // Toujours rediriger vers la page d'accueil
            router.push('/');
          } else {
            throw new Error('Unable to get user profile');
          }
        } catch (err) {
          console.error('[GoogleCallback] Error:', err);
          setError(t('google_auth_failed') || 'Échec de l\'authentification Google');
          localStorage.removeItem('token');
        }
      } else {
        setError(t('no_token_received') || 'Aucun token reçu');
      }
      
      setLoading(false);
    };

    handleCallback();
  }, [searchParams, router, t]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>{t('processing_google_login') || 'Connexion avec Google en cours...'}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <div className="alert alert-danger mb-3">
            <i className="fa fa-exclamation-circle me-2"></i>
            {error}
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => router.push('/login')}
          >
            {t('back_to_login') || 'Retour à la connexion'}
          </button>
        </div>
      </div>
    );
  }

  return null;
}
