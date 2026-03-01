const CURRENCIES = {
  EUR: { symbol: '€', position: 'after', locale: 'fr-FR' },
  USD: { symbol: '$', position: 'before', locale: 'en-US' },
  FCFA: { symbol: 'FCFA', position: 'after', locale: 'fr-FR' },
};

const DEFAULT_CURRENCY = 'FCFA';

/**
 * Formate un montant avec devise
 * @param {number} amount - Le montant à formater
 * @param {Object} options - Options de formatage
 * @param {boolean} options.showCurrency - Afficher la devise (défaut: true)
 * @param {string} options.currency - Code devise: 'EUR', 'USD', 'FCFA' (défaut: EUR)
 * @returns {string} Le montant formaté
 */
export const formatPrice = (amount, options = {}) => {
  const { showCurrency = true, currency = DEFAULT_CURRENCY } = options;
  
  if (amount === null || amount === undefined || isNaN(amount)) {
    return showCurrency ? `0 ${CURRENCIES[currency]?.symbol || '€'}` : '0';
  }

  const numAmount = Math.round(Number(amount));
  const curr = CURRENCIES[currency] || CURRENCIES.EUR;

  // Formater le nombre avec des espaces comme séparateurs de milliers
  const formattedAmount = numAmount
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  if (!showCurrency) {
    return formattedAmount;
  }

  if (curr.position === 'before') {
    return `${curr.symbol}${formattedAmount}`;
  }
  return `${formattedAmount} ${curr.symbol}`;
};

/**
 * Formate un prix avec unité (par jour, par mois, etc.)
 * @param {number} amount - Le montant à formater
 * @param {string} unit - L'unité (jour, mois, etc.)
 * @param {Object} options - Options de formatage
 * @returns {string} Le prix formaté avec unité
 */
export const formatPriceWithUnit = (amount, unit, options = {}) => {
  const formattedPrice = formatPrice(amount, { ...options, showCurrency: true });
  return unit ? `${formattedPrice} / ${unit}` : formattedPrice;
};
