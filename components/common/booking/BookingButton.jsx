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
    if (!user) {
      router.push('/login');
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleBookingClick}
        disabled={isLoading}
        className={`w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 ${className}`}
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            {t('processing')}
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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
