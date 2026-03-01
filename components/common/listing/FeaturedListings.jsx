'use client';

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useCurrency } from "@/context/CurrencyContext";
import { useTranslations } from "next-intl";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

const FeaturedListings = ({ currentItemId, currentItemType }) => {
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('Property');
  const { formatPrice } = useCurrency();

  useEffect(() => {
    loadRecentlyViewed();
  }, [currentItemId, currentItemType]);

  const loadRecentlyViewed = async () => {
    try {
      setLoading(true);
      
      // Récupérer les IDs depuis localStorage
      const storageKey = 'recentlyViewed';
      const stored = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null;
      
      if (!stored) {
        setRecentItems([]);
        setLoading(false);
        return;
      }

      let viewedItems = [];
      try {
        viewedItems = JSON.parse(stored);
      } catch (e) {
        console.error('Error parsing recently viewed:', e);
        setRecentItems([]);
        setLoading(false);
        return;
      }

      // Filtrer l'élément actuel et limiter à 3
      const filteredItems = viewedItems
        .filter(item => !(item.id === currentItemId && item.type === currentItemType))
        .slice(0, 3);

      if (filteredItems.length === 0) {
        setRecentItems([]);
        setLoading(false);
        return;
      }

      // Récupérer les données réelles depuis l'API
      const itemsData = await Promise.all(
        filteredItems.map(async (item) => {
          try {
            const endpoint = item.type === 'vehicle' 
              ? `${API_BASE}/vehicles/${item.id}`
              : `${API_BASE}/apartments/${item.id}`;
            
            const response = await fetch(endpoint);
            if (!response.ok) return null;
            
            const data = await response.json();
            return {
              ...data,
              type: item.type,
              viewDate: item.viewDate,
            };
          } catch (error) {
            console.error(`Error fetching ${item.type} ${item.id}:`, error);
            return null;
          }
        })
      );

      // Filtrer les nulls et formater les données
      const formattedItems = itemsData
        .filter(item => item !== null)
        .map(item => {
          if (item.type === 'vehicle') {
            return {
              id: item.id,
              title: item.title,
              price: item.pricePerDay,
              image: item.images && item.images.length > 0 ? item.images[0] : '/assets/images/services/mercedes.png',
              type: item.type,
              details: [
                { name: t('type') || 'Type', value: item.type || '-' },
                { name: t('seats') || 'Places', value: item.seats || '-' },
                { name: t('transmission') || 'Transmission', value: item.transmission || '-' },
              ],
            };
          } else {
            return {
              id: item.id,
              title: item.title,
              price: item.pricePerNight ? item.pricePerNight * 30 : 0, // Prix mensuel
              image: item.images && item.images.length > 0 ? item.images[0] : '/assets/images/services/apartment_luxury.png',
              type: item.type,
              details: [
                { name: t('bedrooms') || 'Chambres', value: item.bedrooms || 0 },
                { name: t('bathrooms') || 'Salles de bain', value: item.bathrooms || 0 },
                { name: t('area') || 'Superficie', value: item.area ? `${Math.round(item.area)} m²` : '-' },
              ],
            };
          }
        });

      setRecentItems(formattedItems);
    } catch (error) {
      console.error('Error loading recently viewed:', error);
      setRecentItems([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (recentItems.length === 0) {
    return (
      <p className="text-gray-400 text-center py-4 text-sm">
        {t('no_recently_viewed') || 'Aucun élément récemment consulté'}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {recentItems.map((item) => {
        const detailUrl = item.type === 'vehicle' 
          ? `/vehicle-details/${item.id}`
          : `/apartment-details/${item.id}`;

        return (
          <Link href={detailUrl} key={item.id} className="flex gap-3 group">
            <div className="relative w-20 h-16 flex-shrink-0 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-medium text-gray-900 truncate group-hover:text-primary transition-colors">
                {item.title}
              </h5>
              <p className="text-primary font-semibold text-sm">
                {formatPrice(item.price)}
                <span className="text-xs text-gray-400 font-normal">
                  {' '}/{item.type === 'vehicle' ? (t('day') || 'jour') : (t('month') || 'mois')}
                </span>
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {item.details.slice(0, 2).map((detail, i) => (
                  <span key={i} className="text-xs text-gray-400">
                    {detail.name}: {detail.value}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FeaturedListings;
