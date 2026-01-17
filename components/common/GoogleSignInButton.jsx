'use client';

import { useEffect, useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';

const GOOGLE_CLIENT_ID = '947200564166-i38e59euhhs5kb8bvjfdk6ukl1g5di8h.apps.googleusercontent.com';

const GoogleSignInButton = ({ onSuccess, onError, mode = 'signin' }) => {
  const t = useTranslations('Auth');
  const { loginWithGoogle } = useAuth();
  const buttonRef = useRef(null);
  const [buttonId] = useState(() => `google-signin-button-${Math.random().toString(36).substr(2, 9)}`);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleCredentialResponse = useCallback(async (response) => {
    console.log('[GoogleSignInButton] Credential response received');
    try {
      const result = await loginWithGoogle(response.credential);
      if (result.success) {
        console.log('[GoogleSignInButton] Google login successful');
        // Appeler onSuccess avant la redirection (si la redirection n'est pas immédiate)
        // Note: Si loginWithGoogle utilise window.location.href, cette ligne peut ne pas s'exécuter
        // mais c'est OK car la page va se recharger
        setTimeout(() => {
          onSuccess?.();
        }, 100);
      } else {
        console.error('[GoogleSignInButton] Google login failed:', result.error);
        onError?.(result.error);
      }
    } catch (error) {
      console.error('[GoogleSignInButton] Error during Google login:', error);
      onError?.(error.message);
    }
  }, [loginWithGoogle, onSuccess, onError]);

  useEffect(() => {
    // Charger le script Google Identity Services
    const loadGoogleScript = () => {
      if (window.google?.accounts?.id) {
        initializeGoogle();
        return;
      }

      if (document.getElementById('google-identity-script')) {
        // Script déjà chargé, attendre qu'il soit prêt
        const checkGoogle = setInterval(() => {
          if (window.google?.accounts?.id) {
            clearInterval(checkGoogle);
            initializeGoogle();
          }
        }, 100);
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-identity-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        // Attendre un peu pour que Google soit complètement initialisé
        setTimeout(initializeGoogle, 100);
      };
      document.body.appendChild(script);
    };

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id || !buttonRef.current || isInitialized) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Nettoyer le conteneur avant de rendre le bouton
        if (buttonRef.current) {
          buttonRef.current.innerHTML = '';
          
          window.google.accounts.id.renderButton(buttonRef.current, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            width: '100%',
            text: mode === 'signup' ? 'signup_with' : 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'center',
          });
          
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('[GoogleSignInButton] Error initializing Google button:', error);
      }
    };

    // Attendre que le DOM soit prêt
    if (buttonRef.current) {
      loadGoogleScript();
    } else {
      // Si le ref n'est pas encore disponible, réessayer après un court délai
      const timer = setTimeout(() => {
        loadGoogleScript();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [handleCredentialResponse, mode, isInitialized]);

  return (
    <div className="google-signin-container">
      <div ref={buttonRef} id={buttonId} className="w-100"></div>
      <style jsx>{`
        .google-signin-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        #${buttonId} {
          width: 100%;
          min-height: 40px;
        }
        #${buttonId} > div {
          width: 100% !important;
        }
      `}</style>
    </div>
  );
};

export default GoogleSignInButton;
