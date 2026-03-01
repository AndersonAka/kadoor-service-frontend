'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CurrencyContext = createContext(undefined);

// Default rates (fallback if API fails)
const DEFAULT_RATES = {
  XOF: 1,
  EUR: 0.00152,  // 1 XOF = 0.00152 EUR (approx 655.96 XOF = 1 EUR)
  USD: 0.00166,  // 1 XOF = 0.00166 USD (approx 602.41 XOF = 1 USD)
};

const CURRENCIES = {
  XOF: { code: 'XOF', symbol: 'FCFA', name: 'Franc CFA' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  USD: { code: 'USD', symbol: '$', name: 'Dollar US' },
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState({ ...CURRENCIES.XOF, rate: 1 });
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [ratesLoading, setRatesLoading] = useState(true);

  // Fetch real exchange rates from free API (Frankfurter API)
  const fetchExchangeRates = useCallback(async () => {
    try {
      // Frankfurter API - free, no API key required
      // We fetch EUR rates and calculate XOF rates (XOF is pegged to EUR at 655.957)
      const response = await fetch('https://api.frankfurter.app/latest?from=EUR&to=USD');
      
      if (!response.ok) throw new Error('Failed to fetch rates');
      
      const data = await response.json();
      
      // XOF is pegged to EUR at fixed rate: 1 EUR = 655.957 XOF
      const EUR_TO_XOF = 655.957;
      const EUR_TO_USD = data.rates.USD || 1.09;
      
      // Calculate rates FROM XOF
      const newRates = {
        XOF: 1,
        EUR: 1 / EUR_TO_XOF,  // XOF to EUR
        USD: EUR_TO_USD / EUR_TO_XOF,  // XOF to USD
      };
      
      setRates(newRates);
      console.log('[CurrencyContext] Exchange rates updated:', newRates);
      
      // Cache rates in localStorage with timestamp
      localStorage.setItem('exchangeRates', JSON.stringify({
        rates: newRates,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.error('[CurrencyContext] Error fetching exchange rates:', error);
      
      // Try to load cached rates
      const cached = localStorage.getItem('exchangeRates');
      if (cached) {
        try {
          const { rates: cachedRates } = JSON.parse(cached);
          setRates(cachedRates);
          console.log('[CurrencyContext] Using cached rates');
        } catch (e) {
          console.log('[CurrencyContext] Using default rates');
        }
      }
    } finally {
      setRatesLoading(false);
    }
  }, []);

  // Load saved currency and fetch rates on mount
  useEffect(() => {
    const saved = localStorage.getItem('currency');
    if (saved && CURRENCIES[saved]) {
      setCurrency({ ...CURRENCIES[saved], rate: rates[saved] });
    }
    
    // Check if we have recent cached rates (less than 1 hour old)
    const cached = localStorage.getItem('exchangeRates');
    if (cached) {
      try {
        const { rates: cachedRates, timestamp } = JSON.parse(cached);
        const oneHour = 60 * 60 * 1000;
        if (Date.now() - timestamp < oneHour) {
          setRates(cachedRates);
          setRatesLoading(false);
          console.log('[CurrencyContext] Using cached rates (< 1 hour old)');
          return;
        }
      } catch (e) {
        // Invalid cache, continue to fetch
      }
    }
    
    fetchExchangeRates();
  }, []);

  // Update currency rate when rates change
  useEffect(() => {
    setCurrency(prev => ({ ...prev, rate: rates[prev.code] }));
  }, [rates]);

  const changeCurrency = (currencyCode) => {
    if (CURRENCIES[currencyCode]) {
      setCurrency({ ...CURRENCIES[currencyCode], rate: rates[currencyCode] });
      localStorage.setItem('currency', currencyCode);
    }
  };

  const convertPrice = (priceInXOF) => {
    if (!priceInXOF || isNaN(priceInXOF)) return 0;
    return Math.round(priceInXOF * (rates[currency.code] || 1));
  };

  const formatPrice = (priceInXOF) => {
    const converted = convertPrice(priceInXOF);
    if (currency.code === 'XOF') {
      return `${converted.toLocaleString('fr-FR')} ${currency.symbol}`;
    }
    return `${currency.symbol}${converted.toLocaleString('fr-FR')}`;
  };

  // Refresh rates manually
  const refreshRates = () => {
    setRatesLoading(true);
    fetchExchangeRates();
  };

  return (
    <CurrencyContext.Provider value={{
      currency,
      currencies: CURRENCIES,
      changeCurrency,
      convertPrice,
      formatPrice,
      refreshRates,
      ratesLoading,
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;
