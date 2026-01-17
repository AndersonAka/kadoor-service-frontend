'use client';

import { useTranslations } from 'next-intl';
import { formatPrice } from '@/utils/currency';

const BookingConfirmation = ({ reservation, itemType, onClose }) => {
  const t = useTranslations('Booking');

  const handleDownloadDocument = async (type) => {
    try {
      // TODO: Implémenter le téléchargement des documents PDF
      const response = await fetch(`/api/documents/${type}/${reservation.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}-${reservation.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Erreur lors du téléchargement du document');
    }
  };

  const item = reservation[itemType] || reservation.vehicle || reservation.apartment;

  return (
    <div className="booking-confirmation">
      <div className="text-center mb-4">
        <div className="mb-3">
          <i className="flaticon-check text-success" style={{ fontSize: '4rem' }}></i>
        </div>
        <h4 className="text-success">{t('booking_confirmed')}</h4>
        <p className="text-muted">{t('payment_success')}</p>
      </div>

      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{t('booking_details')}</h5>
          <p>
            <strong>{t('booking_number')}:</strong> {reservation.id}
          </p>
          <p>
            <strong>{itemType === 'vehicle' ? 'Véhicule' : 'Appartement'}:</strong>{' '}
            {item?.title || item?.name}
          </p>
          <p>
            <strong>{t('start_date')}:</strong>{' '}
            {new Date(reservation.startDate).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            <strong>{t('end_date')}:</strong>{' '}
            {new Date(reservation.endDate).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <p>
            <strong>{t('total_price')}:</strong> {formatPrice(reservation.totalPrice)}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <h6>{t('download_invoice')}</h6>
        <div className="d-flex gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => handleDownloadDocument('invoice')}
          >
            <i className="flaticon-download me-2"></i>
            {t('download_invoice')}
          </button>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => handleDownloadDocument('contract')}
          >
            <i className="flaticon-download me-2"></i>
            {t('download_contract')}
          </button>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={() => handleDownloadDocument('receipt')}
          >
            <i className="flaticon-download me-2"></i>
            {t('download_receipt')}
          </button>
        </div>
      </div>

      <div className="alert alert-info">
        <i className="flaticon-email me-2"></i>
        Un email de confirmation a été envoyé à votre adresse email.
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-thm" onClick={onClose}>
          {t('close')}
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
