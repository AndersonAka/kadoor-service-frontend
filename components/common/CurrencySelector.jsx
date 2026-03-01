'use client'

import { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';

const CurrencySelector = ({ className = '' }) => {
  const { currency, currencies, changeCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    changeCurrency(code);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
      >
        <span className="font-semibold">{currency.code}</span>
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {Object.values(currencies).map((curr) => (
            <button
              key={curr.code}
              onClick={() => handleSelect(curr.code)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center justify-between ${
                currency.code === curr.code ? 'text-primary font-semibold bg-primary/5' : 'text-gray-700'
              }`}
            >
              <span>{curr.code}</span>
              <span className="text-gray-500">{curr.symbol}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencySelector;
