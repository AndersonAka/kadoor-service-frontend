'use client';

import Image from 'next/image';

/**
 * Composant de chargement de page avec animation du logo cadeau
 */
const PageLoader = ({ fullScreen = true, size = 'large' }) => {
  const sizeConfig = {
    small: { width: 60, height: 60 },
    medium: { width: 100, height: 100 },
    large: { width: 150, height: 150 },
  };

  const { width, height } = sizeConfig[size] || sizeConfig.large;

  const containerStyle = fullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        zIndex: 99999,
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      };

  return (
    <div style={containerStyle}>
      <div className="loader-container">
        <Image
          src="/assets/images/logo_cadeau.png"
          alt="Chargement..."
          width={width}
          height={height}
          className="loader-image"
          priority
        />
        <div className="loader-text">Chargement...</div>
      </div>
      
      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        
        :global(.loader-image) {
          animation: pulse 1.5s ease-in-out infinite, bounce 1s ease-in-out infinite;
        }
        
        .loader-text {
          color: #b91c1c;
          font-weight: 600;
          font-size: 1.1rem;
          animation: fadeInOut 1.5s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
