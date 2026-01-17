'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PaymentMethodSelector from './PaymentMethodSelector';

const PaymentForm = ({ totalPrice, onPaymentSuccess, onPaymentError }) => {
  const t = useTranslations('Booking');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Champs pour carte bancaire
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  // Champs pour mobile money
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleProcessPayment = async () => {
    if (!selectedMethod) {
      alert(t('errors.payment_required'));
      return;
    }

    // Validation selon la méthode
    if (selectedMethod === 'visa_mastercard') {
      if (!cardNumber || !cardholderName || !expiryDate || !cvv) {
        alert(t('errors.invalid_card'));
        return;
      }
    } else {
      if (!phoneNumber) {
        alert(t('errors.invalid_phone'));
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Simulation du paiement (sera remplacé par CINETPAY plus tard)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simuler un succès de paiement (90% de chance)
      const success = Math.random() > 0.1;
      
      if (success) {
        onPaymentSuccess({
          method: selectedMethod,
          transactionId: `TXN-${Date.now()}`,
          amount: totalPrice,
        });
      } else {
        onPaymentError(new Error(t('payment_failed')));
      }
    } catch (error) {
      onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="payment-form">
      <PaymentMethodSelector
        selectedMethod={selectedMethod}
        onSelectMethod={setSelectedMethod}
      />

      {selectedMethod && (
        <div className="mt-4">
          {selectedMethod === 'visa_mastercard' ? (
            <div className="card-payment-form">
              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label">
                  {t('card_number')}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  placeholder={t('card_number_placeholder')}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="cardholderName" className="form-label">
                  {t('cardholder_name')}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardholderName"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expiryDate" className="form-label">
                    {t('expiry_date')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryDate"
                    placeholder={t('expiry_date_placeholder')}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                    maxLength={5}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label">
                    {t('cvv')}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder={t('cvv_placeholder')}
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="mobile-money-form">
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  {t('phone_number')}
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  placeholder={t('phone_number_placeholder')}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <small className="form-text text-muted">
                  {t('phone_number_placeholder')}
                </small>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div>
              <strong>{t('total_price')}:</strong>
              <span className="ms-2 text-primary fw-bold fs-5">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'XOF',
                  minimumFractionDigits: 0,
                }).format(totalPrice)}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-thm"
              onClick={handleProcessPayment}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  {t('processing_payment')}
                </>
              ) : (
                t('process_payment')
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
