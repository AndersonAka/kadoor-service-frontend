'use client';

import { useState, useEffect, useMemo } from 'react';
import { useLocale } from 'next-intl';

// Cache local pour éviter les traductions répétées
const translationCache = new Map();

/**
 * Génère une clé de cache basée sur le texte et les langues
 */
const getCacheKey = (text, sourceLang, targetLang) => {
  return `${sourceLang}_${targetLang}_${text}`;
};

/**
 * Traduit un texte en utilisant LibreTranslate (API publique gratuite)
 * @param {string} text - Texte à traduire
 * @param {string} sourceLang - Langue source (ex: 'fr')
 * @param {string} targetLang - Langue cible (ex: 'en')
 * @returns {Promise<string>} - Texte traduit
 */
const translateText = async (text, sourceLang, targetLang) => {
  if (!text || text.trim() === '') return text;
  
  // Si les langues sont identiques, pas besoin de traduire
  if (sourceLang === targetLang) return text;
  
  // Vérifier le cache
  const cacheKey = getCacheKey(text, sourceLang, targetLang);
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }
  
  try {
    // Utiliser l'API publique LibreTranslate (gratuite avec limites)
    const response = await fetch('https://libretranslate.com/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text',
      }),
    });
    
    if (!response.ok) {
      console.warn('[useAutoTranslate] Translation API error, returning original text');
      return text;
    }
    
    const data = await response.json();
    const translated = data.translatedText || text;
    
    // Mettre en cache
    translationCache.set(cacheKey, translated);
    
    // Limiter la taille du cache à 100 entrées
    if (translationCache.size > 100) {
      const firstKey = translationCache.keys().next().value;
      translationCache.delete(firstKey);
    }
    
    return translated;
  } catch (error) {
    console.error('[useAutoTranslate] Translation error:', error);
    // En cas d'erreur, retourner le texte original
    return text;
  }
};

/**
 * Hook pour traduire automatiquement un texte basé sur la locale actuelle
 * @param {string} text - Texte à traduire
 * @param {string} sourceLang - Langue source (défaut: 'fr')
 * @returns {string} - Texte traduit ou original
 */
export const useAutoTranslate = (text, sourceLang = 'fr') => {
  const locale = useLocale();
  const [translated, setTranslated] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);
  
  useEffect(() => {
    // Si la locale est la même que la langue source, pas besoin de traduire
    if (locale === sourceLang || !text || text.trim() === '') {
      setTranslated(text);
      return;
    }
    
    // Vérifier le cache d'abord
    const cacheKey = getCacheKey(text, sourceLang, locale);
    if (translationCache.has(cacheKey)) {
      setTranslated(translationCache.get(cacheKey));
      return;
    }
    
    // Traduire
    setIsTranslating(true);
    translateText(text, sourceLang, locale)
      .then((result) => {
        setTranslated(result);
        setIsTranslating(false);
      })
      .catch((error) => {
        console.error('[useAutoTranslate] Error:', error);
        setTranslated(text); // Fallback sur le texte original
        setIsTranslating(false);
      });
  }, [text, locale, sourceLang]);
  
  return { translated, isTranslating };
};

/**
 * Hook simplifié qui retourne directement le texte traduit
 */
export const useTranslatedText = (text, sourceLang = 'fr') => {
  const { translated } = useAutoTranslate(text, sourceLang);
  return translated;
};

/**
 * Traduit un tableau de textes
 */
export const useTranslatedArray = (texts, sourceLang = 'fr') => {
  const locale = useLocale();
  const [translated, setTranslated] = useState(texts);
  
  useEffect(() => {
    if (locale === sourceLang || !texts || texts.length === 0) {
      setTranslated(texts);
      return;
    }
    
    // Traduire tous les textes en parallèle
    Promise.all(
      texts.map((text) => translateText(text, sourceLang, locale))
    ).then(setTranslated).catch(() => setTranslated(texts));
  }, [texts, locale, sourceLang]);
  
  return translated;
};
