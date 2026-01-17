'use client'

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/i18n/routing';
import BookingModal from './BookingModal';

const BookingButton = ({ itemId, itemType = 'apartment', itemData, className = '' }) => {
  const t = useTranslations('Booking');
  const { user } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingClick = () => {
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!user) {
      router.push('/login');
      return;
    }

    // Ouvrir le modal de réservation
    setShowBookingModal(true);
  };

  return (
    <>
      <button
        type="button"
        className={`btn btn-thm w-100 ${className}`}
        onClick={handleBookingClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            {t('processing')}
          </>
        ) : (
          <>
            <i className="flaticon-calendar me-2"></i>
            {t('book_now')}
          </>
        )}
      </button>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        itemId={itemId}
        itemType={itemType}
        itemData={itemData}
      />
    </>
  );
};

export default BookingButton;
