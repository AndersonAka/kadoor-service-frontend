'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { formatPrice } from '@/utils/currency';
import { reservationService } from '@/services/reservationService';
import PaymentForm from './PaymentForm';
import BookingConfirmation from './BookingConfirmation';

const BookingModal = ({ isOpen, onClose, itemId, itemType, itemData }) => {
  const t = useTranslations('Booking');
  const [step, setStep] = useState(1); // 1: Dates, 2: Payment, 3: Confirmation
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [additionalDrivers, setAdditionalDrivers] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [availability, setAvailability] = useState(null);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isCreatingReservation, setIsCreatingReservation] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [error, setError] = useState('');

  // Calculer le nombre de jours et le prix
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (end > start) {
        const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        setNumberOfDays(days);
        
        if (itemData) {
          const pricePerDay = itemType === 'vehicle' 
            ? itemData.pricePerDay || itemData.price || 0
            : (itemData.pricePerNight || itemData.price || 0) * 30; // Convertir prix/nuit en prix/mois
          
          setTotalPrice(pricePerDay * days);
        }
      }
    }
  }, [startDate, endDate, itemData, itemType]);

  const handleCheckAvailability = async () => {
    if (!startDate || !endDate) {
      setError(t('errors.dates_required'));
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      setError(t('errors.end_after_start'));
      return;
    }

    if (start < new Date()) {
      setError(t('errors.past_date'));
      return;
    }

    setIsCheckingAvailability(true);
    setError('');

    try {
      // Convertir les dates en format ISO string
      const startISO = new Date(startDate).toISOString();
      const endISO = new Date(endDate).toISOString();
      
      const result = itemType === 'vehicle'
        ? await reservationService.checkVehicleAvailability(itemId, startISO, endISO)
        : await reservationService.checkApartmentAvailability(itemId, startISO, endISO);

      setAvailability(result);
      
      if (result.available) {
        // Passer à l'étape de paiement
        setStep(2);
      }
    } catch (err) {
      setError(t('errors.availability_check_failed'));
      setAvailability({ available: false, reason: err.message });
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handlePaymentSuccess = async (paymentData) => {
    setIsCreatingReservation(true);
    setError('');

    try {
      // Convertir les dates en format ISO string
      const startISO = new Date(startDate).toISOString();
      const endISO = new Date(endDate).toISOString();
      
      const reservationData = {
        [itemType === 'vehicle' ? 'vehicleId' : 'apartmentId']: itemId,
        startDate: startISO,
        endDate: endISO,
      };

      if (itemType === 'apartment') {
        reservationData.numberOfGuests = numberOfGuests;
        reservationData.specialRequests = specialRequests;
      } else {
        reservationData.pickupLocation = pickupLocation;
        reservationData.dropoffLocation = dropoffLocation;
        reservationData.additionalDrivers = additionalDrivers;
        reservationData.specialRequests = specialRequests;
      }

      const result = itemType === 'vehicle'
        ? await reservationService.createVehicleReservation(reservationData)
        : await reservationService.createApartmentReservation(reservationData);

      setReservation(result);
      setStep(3);
    } catch (err) {
      setError(err.message || t('errors.booking_failed'));
    } finally {
      setIsCreatingReservation(false);
    }
  };

  const handlePaymentError = (error) => {
    setError(error.message || t('payment_failed'));
  };

  const handleClose = () => {
    setStep(1);
    setStartDate('');
    setEndDate('');
    setTotalPrice(0);
    setAvailability(null);
    setReservation(null);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  // Indicateur de progression des étapes
  const steps = [
    { number: 1, icon: 'flaticon-calendar', label: t('select_dates') },
    { number: 2, icon: 'flaticon-payment', label: t('payment_method') },
    { number: 3, icon: 'flaticon-check', label: t('confirm') },
  ];

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1055 }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '800px' }}
      >
        <div className="modal-content" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
          {/* Header avec gradient rouge-or */}
          <div 
            className="modal-header border-0"
            style={{
              background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
              color: '#fff',
              padding: '1.5rem'
            }}
          >
            <div className="d-flex align-items-center w-100">
              <i className="flaticon-calendar me-3" style={{ fontSize: '1.5rem', color: '#fff' }}></i>
              <h5 className="modal-title mb-0 fw-bold" style={{ color: '#fff' }}>{t('booking_form')}</h5>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={handleClose}
              aria-label="Close"
            ></button>
          </div>

          {/* Indicateur de progression */}
          <div className="px-4 pt-4 pb-3" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="d-flex justify-content-between align-items-center">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="d-flex align-items-center flex-grow-1">
                  <div className="d-flex flex-column align-items-center flex-grow-1">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mb-2"
                      style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: step <= stepItem.number ? '#b91c1c' : '#e0e0e0',
                        color: step <= stepItem.number ? '#fff' : '#999',
                        border: `3px solid ${step < stepItem.number ? '#d4af37' : step === stepItem.number ? '#b91c1c' : '#e0e0e0'}`,
                        transition: 'all 0.3s ease',
                        boxShadow: step === stepItem.number ? '0 4px 12px rgba(185, 28, 28, 0.3)' : 'none',
                      }}
                    >
                      {step > stepItem.number ? (
                        <i className="flaticon-check" style={{ fontSize: '1.2rem' }}></i>
                      ) : (
                        <i className={stepItem.icon} style={{ fontSize: '1.2rem' }}></i>
                      )}
                    </div>
                    <small 
                      className="text-center fw-semibold"
                      style={{
                        color: step <= stepItem.number ? '#b91c1c' : '#999',
                        fontSize: '0.75rem'
                      }}
                    >
                      {stepItem.label}
                    </small>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="flex-grow-1 mx-2"
                      style={{
                        height: '3px',
                        backgroundColor: step > stepItem.number ? '#d4af37' : '#e0e0e0',
                        marginTop: '-25px',
                        transition: 'all 0.3s ease',
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="modal-body" style={{ padding: '2rem' }}>
            {step === 1 && (
              <div className="booking-step-1">
                <div className="text-center mb-4">
                  <i className="flaticon-calendar text-thm" style={{ fontSize: '3rem', color: '#b91c1c' }}></i>
                  <h5 className="mt-2 mb-0 fw-bold">{t('select_dates')}</h5>
                  <p className="text-muted small mb-0">Choisissez vos dates de réservation</p>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="startDate" className="form-label fw-semibold d-flex align-items-center">
                      <i className="flaticon-calendar me-2 text-thm" style={{ color: '#b91c1c' }}></i>
                      {t('start_date')}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="flaticon-calendar text-thm" style={{ color: '#b91c1c' }}></i>
                      </span>
                      <input
                        type="date"
                        className="form-control border-start-0"
                        id="startDate"
                        value={startDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ borderLeft: 'none' }}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endDate" className="form-label fw-semibold d-flex align-items-center">
                      <i className="flaticon-calendar me-2 text-thm" style={{ color: '#b91c1c' }}></i>
                      {t('end_date')}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="flaticon-calendar text-thm" style={{ color: '#b91c1c' }}></i>
                      </span>
                      <input
                        type="date"
                        className="form-control border-start-0"
                        id="endDate"
                        value={endDate}
                        min={startDate || new Date().toISOString().split('T')[0]}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ borderLeft: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                {itemType === 'apartment' ? (
                  <div className="mb-4">
                    <label htmlFor="numberOfGuests" className="form-label fw-semibold d-flex align-items-center">
                      <i className="flaticon-user me-2 text-thm" style={{ color: '#b91c1c' }}></i>
                      {t('number_of_guests')}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="flaticon-user text-thm" style={{ color: '#b91c1c' }}></i>
                      </span>
                      <input
                        type="number"
                        className="form-control border-start-0"
                        id="numberOfGuests"
                        min="1"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(parseInt(e.target.value) || 1)}
                        style={{ borderLeft: 'none' }}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="row mb-4">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="pickupLocation" className="form-label fw-semibold d-flex align-items-center">
                          <i className="flaticon-placeholder me-2 text-thm" style={{ color: '#b91c1c' }}></i>
                          {t('pickup_location')}
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="flaticon-placeholder text-thm" style={{ color: '#b91c1c' }}></i>
                          </span>
                          <input
                            type="text"
                            className="form-control border-start-0"
                            id="pickupLocation"
                            value={pickupLocation}
                            onChange={(e) => setPickupLocation(e.target.value)}
                            placeholder="Lieu de prise en charge"
                            style={{ borderLeft: 'none' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="dropoffLocation" className="form-label fw-semibold d-flex align-items-center">
                          <i className="flaticon-placeholder me-2 text-thm" style={{ color: '#b91c1c' }}></i>
                          {t('dropoff_location')}
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <i className="flaticon-placeholder text-thm" style={{ color: '#b91c1c' }}></i>
                          </span>
                          <input
                            type="text"
                            className="form-control border-start-0"
                            id="dropoffLocation"
                            value={dropoffLocation}
                            onChange={(e) => setDropoffLocation(e.target.value)}
                            placeholder="Lieu de restitution"
                            style={{ borderLeft: 'none' }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="additionalDrivers" className="form-label fw-semibold d-flex align-items-center">
                        <i className="flaticon-user me-2 text-thm" style={{ color: '#b91c1c' }}></i>
                        {t('additional_drivers')}
                      </label>
                      <div className="input-group">
                        <span className="input-group-text bg-light border-end-0">
                          <i className="flaticon-user text-thm" style={{ color: '#b91c1c' }}></i>
                        </span>
                        <input
                          type="number"
                          className="form-control border-start-0"
                          id="additionalDrivers"
                          min="0"
                          value={additionalDrivers}
                          onChange={(e) => setAdditionalDrivers(parseInt(e.target.value) || 0)}
                          style={{ borderLeft: 'none' }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="mb-4">
                  <label htmlFor="specialRequests" className="form-label fw-semibold d-flex align-items-center">
                    <i className="flaticon-edit me-2 text-thm" style={{ color: '#b91c1c' }}></i>
                    {t('special_requests')}
                  </label>
                  <textarea
                    className="form-control"
                    id="specialRequests"
                    rows="3"
                    placeholder={t('special_requests_placeholder')}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    style={{ borderColor: '#ddd' }}
                  ></textarea>
                </div>

                {numberOfDays > 0 && (
                  <div 
                    className="alert mb-4 border-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                      borderLeft: '4px solid #b91c1c',
                      borderRadius: '8px'
                    }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="d-flex align-items-center mb-2">
                          <i className="flaticon-calendar me-2 text-thm" style={{ color: '#b91c1c', fontSize: '1.2rem' }}></i>
                          <strong className="text-thm" style={{ color: '#b91c1c' }}>{t('number_of_days')}:</strong>
                          <span className="ms-2 fw-bold">{numberOfDays} {numberOfDays > 1 ? 'jours' : 'jour'}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="flaticon-money me-2" style={{ color: '#d4af37', fontSize: '1.2rem' }}></i>
                          <strong className="text-thm" style={{ color: '#b91c1c' }}>{t('total_price')}:</strong>
                          <span className="ms-2 fw-bold fs-5" style={{ color: '#d4af37' }}>{formatPrice(totalPrice)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {availability && (
                  <div 
                    className={`alert mb-4 border-0 d-flex align-items-center ${
                      availability.available ? '' : ''
                    }`}
                    style={{
                      background: availability.available 
                        ? 'linear-gradient(135deg, rgba(40, 167, 69, 0.1) 0%, rgba(40, 167, 69, 0.05) 100%)'
                        : 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(220, 53, 69, 0.05) 100%)',
                      borderLeft: `4px solid ${availability.available ? '#28a745' : '#dc3545'}`,
                      borderRadius: '8px'
                    }}
                  >
                    <i 
                      className={`flaticon-${availability.available ? 'check' : 'close'} me-3`}
                      style={{ 
                        fontSize: '1.5rem',
                        color: availability.available ? '#28a745' : '#dc3545'
                      }}
                    ></i>
                    <div>
                      <strong className={availability.available ? 'text-success' : 'text-danger'}>
                        {availability.available ? t('available') : t('not_available')}
                      </strong>
                      {availability.reason && <div className="mt-1 small">{availability.reason}</div>}
                    </div>
                  </div>
                )}

                {error && (
                  <div 
                    className="alert alert-danger mb-4 border-0 d-flex align-items-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(220, 53, 69, 0.05) 100%)',
                      borderLeft: '4px solid #dc3545',
                      borderRadius: '8px'
                    }}
                  >
                    <i className="flaticon-close me-3" style={{ fontSize: '1.2rem' }}></i>
                    <span>{error}</span>
                  </div>
                )}

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={handleClose}
                    style={{ borderRadius: '8px', padding: '0.6rem 1.5rem' }}
                  >
                    <i className="flaticon-close me-2"></i>
                    {t('cancel')}
                  </button>
                  <button
                    type="button"
                    className="btn btn-thm"
                    onClick={handleCheckAvailability}
                    disabled={isCheckingAvailability}
                    style={{
                      background: 'linear-gradient(135deg, #b91c1c 0%, #d4af37 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.6rem 2rem',
                      fontWeight: '600',
                      boxShadow: '0 4px 15px rgba(185, 28, 28, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(185, 28, 28, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(185, 28, 28, 0.3)';
                    }}
                  >
                    {isCheckingAvailability ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        {t('check_availability')}
                      </>
                    ) : (
                      <>
                        <i className="flaticon-search me-2"></i>
                        {t('check_availability')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="booking-step-2">
                <div className="text-center mb-4">
                  <i className="flaticon-payment text-thm" style={{ fontSize: '3rem', color: '#b91c1c' }}></i>
                  <h5 className="mt-2 mb-0 fw-bold">{t('payment_method')}</h5>
                  <p className="text-muted small mb-0">Sélectionnez votre méthode de paiement</p>
                </div>

                <div className="d-flex justify-content-between align-items-center mb-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setStep(1)}
                    style={{ borderRadius: '8px' }}
                  >
                    <i className="flaticon-left-arrow me-2"></i>
                    {t('previous')}
                  </button>
                  <div className="text-center">
                    <div className="small text-muted mb-1">{t('total_price')}</div>
                    <h4 className="mb-0 fw-bold" style={{ color: '#d4af37' }}>
                      {formatPrice(totalPrice)}
                    </h4>
                  </div>
                  <div style={{ width: '100px' }}></div>
                </div>

                <PaymentForm
                  totalPrice={totalPrice}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                />

                {error && (
                  <div 
                    className="alert alert-danger mt-3 border-0 d-flex align-items-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(220, 53, 69, 0.1) 0%, rgba(220, 53, 69, 0.05) 100%)',
                      borderLeft: '4px solid #dc3545',
                      borderRadius: '8px'
                    }}
                  >
                    <i className="flaticon-close me-3" style={{ fontSize: '1.2rem', color: '#dc3545' }}></i>
                    <span>{error}</span>
                  </div>
                )}

                {isCreatingReservation && (
                  <div 
                    className="alert mt-3 border-0 d-flex align-items-center"
                    style={{
                      background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.1) 0%, rgba(212, 175, 55, 0.1) 100%)',
                      borderLeft: '4px solid #b91c1c',
                      borderRadius: '8px'
                    }}
                  >
                    <span className="spinner-border spinner-border-sm me-3" style={{ color: '#b91c1c' }}></span>
                    <span className="fw-semibold" style={{ color: '#b91c1c' }}>{t('processing')}</span>
                  </div>
                )}
              </div>
            )}

            {step === 3 && reservation && (
              <BookingConfirmation
                reservation={reservation}
                itemType={itemType}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
