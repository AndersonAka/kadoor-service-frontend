/**
 * Formate un montant en FCFA
 * @param {number} amount - Le montant à formater
 * @param {Object} options - Options de formatage
 * @param {boolean} options.showCurrency - Afficher la devise (défaut: true)
 * @param {boolean} options.useSpace - Utiliser un espace entre le montant et la devise (défaut: true)
 * @returns {string} Le montant formaté en FCFA
 */
export const formatPrice = (amount, options = {}) => {
  const { showCurrency = true, useSpace = true } = options;
  
  if (amount === null || amount === undefined || isNaN(amount)) {
    return showCurrency ? (useSpace ? '0 FCFA' : '0FCFA') : '0';
  }

  // Formater le nombre avec des espaces comme séparateurs de milliers
  const formattedAmount = Math.round(Number(amount))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  if (!showCurrency) {
    return formattedAmount;
  }

  return useSpace ? `${formattedAmount} FCFA` : `${formattedAmount}FCFA`;
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
