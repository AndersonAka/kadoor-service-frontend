'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/i18n/routing';
import FeaturedListings from "../common/listing/FeaturedListings";
import BookingModal from "../common/booking/BookingModal";
import AvailabilityCalendar from "./VehicleAvailabilityCalendar";

const Sidebar = ({ itemId, itemType = 'apartment', itemData }) => {
  const t = useTranslations('Booking');
  const { user } = useAuth();
  const router = useRouter();
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [prefilledDates, setPrefilledDates] = useState(null);

  const handleBookClick = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setShowBookingModal(true);
  };

  const handleCalendarDateSelect = (dates) => {
    setPrefilledDates(dates);
    if (!user) {
      router.push('/login');
      return;
    }
    setShowBookingModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Booking Button */}
      <div className="bg-white shadow-sm p-6">
        <button
          type="button"
          onClick={handleBookClick}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 text-white font-semibold transition-colors hover:opacity-90"
          style={{ backgroundColor: '#c21c21ff' }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {t('book_now')}
        </button>
      </div>

      {/* Availability Calendar */}
      <AvailabilityCalendar
        itemId={itemId}
        itemType={itemType}
        onDateSelect={handleCalendarDateSelect}
      />

      {/* Recently Viewed */}
      <div className="bg-white shadow-sm p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Vus récemment</h4>
        <FeaturedListings currentItemId={itemId} currentItemType={itemType} />
      </div>

      <BookingModal
        isOpen={showBookingModal}
        onClose={() => { setShowBookingModal(false); setPrefilledDates(null); }}
        itemId={itemId}
        itemType={itemType}
        itemData={itemData}
        prefilledDates={prefilledDates}
      />
    </div>
  );
};

export default Sidebar;
