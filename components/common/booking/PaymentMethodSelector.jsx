'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

const PaymentMethodSelector = ({ selectedMethod, onSelectMethod }) => {
  const t = useTranslations('Booking');

  const paymentMethods = [
    {
      id: 'visa_mastercard',
      name: t('payment_methods.visa_mastercard'),
      logo: '/assets/images/logo-mobile-money/visa.png',
      type: 'card',
    },
    {
      id: 'wave',
      name: t('payment_methods.wave'),
      logo: '/assets/images/logo-mobile-money/wave.png',
      type: 'mobile_money',
    },
    {
      id: 'orange_money',
      name: t('payment_methods.orange_money'),
      logo: '/assets/images/logo-mobile-money/orange.png',
      type: 'mobile_money',
    },
    {
      id: 'mtn_money',
      name: t('payment_methods.mtn_money'),
      logo: '/assets/images/logo-mobile-money/mtn-mobile-money-logo.jpg',
      type: 'mobile_money',
    },
    {
      id: 'flooz',
      name: t('payment_methods.flooz'),
      logo: '/assets/images/logo-mobile-money/Moov_Money_Flooz.png',
      type: 'mobile_money',
    },
  ];

  return (
    <div className="payment-methods">
      <h5 className="mb-3">{t('select_payment_method')}</h5>
      <div className="row g-3">
        {paymentMethods.map((method) => (
          <div key={method.id} className="col-12 col-md-6">
            <div
              className={`payment-method-card p-3 border rounded cursor-pointer ${
                selectedMethod === method.id ? 'border-primary bg-light' : 'border-secondary'
              }`}
              onClick={() => onSelectMethod(method.id)}
              style={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div className="d-flex align-items-center">
                <div className="form-check me-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id={`payment-${method.id}`}
                    checked={selectedMethod === method.id}
                    onChange={() => onSelectMethod(method.id)}
                  />
                </div>
                <div className="payment-logo me-3" style={{ width: '60px', height: '40px', position: 'relative' }}>
                  <Image
                    src={method.logo}
                    alt={method.name}
                    fill
                    style={{ objectFit: 'contain' }}
                    className="img-fluid"
                  />
                </div>
                <div className="flex-grow-1">
                  <label
                    htmlFor={`payment-${method.id}`}
                    className="form-check-label mb-0 fw-semibold"
                    style={{ cursor: 'pointer' }}
                  >
                    {method.name}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
