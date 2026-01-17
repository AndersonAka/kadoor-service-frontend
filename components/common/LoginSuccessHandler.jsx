'use client';

import { useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import { useTranslations } from 'next-intl';

/**
 * Composant qui gère l'affichage de la notification de connexion réussie
 * Vérifie le sessionStorage pour les flags de connexion
 */
const LoginSuccessHandler = () => {
  const toast = useToast();
  const t = useTranslations('Auth');

  useEffect(() => {
    // Vérifier si une notification de connexion doit être affichée
    const showLoginSuccess = sessionStorage.getItem('showLoginSuccess');
    
    if (showLoginSuccess === 'true') {
      const userName = sessionStorage.getItem('loginUserName') || '';
      
      // Nettoyer le sessionStorage
      sessionStorage.removeItem('showLoginSuccess');
      sessionStorage.removeItem('loginUserName');
      
      // Afficher la notification
      const message = userName 
        ? `${t('welcome_back') || 'Bienvenue'}, ${userName} !`
        : t('login_success') || 'Connexion réussie !';
      
      toast.success(message, 5000);
    }
  }, [toast, t]);

  return null; // Ce composant ne rend rien
};

export default LoginSuccessHandler;
