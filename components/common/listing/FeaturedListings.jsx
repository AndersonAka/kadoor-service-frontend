'use client';

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { formatPrice } from "@/utils/currency";
import { useTranslations } from "next-intl";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

const FeaturedListings = ({ currentItemId, currentItemType }) => {
  const [recentItems, setRecentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations('Property');

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
      <div className="text-center py-3">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (recentItems.length === 0) {
    return (
      <p className="text-muted text-center py-3">
        {t('no_recently_viewed') || 'Aucun élément récemment consulté'}
      </p>
    );
  }

  return (
    <>
      {recentItems.map((item) => {
        const detailUrl = item.type === 'vehicle' 
          ? `/vehicle-details/${item.id}`
          : `/apartment-details/${item.id}`;

        return (
          <div className="media d-flex mb-3" key={item.id}>
            <Link href={detailUrl}>
              <Image
                width={102}
                height={80}
                className="align-self-start me-3 w-100 h-100 cover"
                src={item.image}
                alt={item.title}
                style={{ objectFit: 'cover', borderRadius: '4px' }}
              />
            </Link>

            <div className="media-body">
              <h5 className="mt-0 post_title">
                <Link href={detailUrl} className="text-decoration-none">
                  {item.title}
                </Link>
              </h5>
              <Link href={detailUrl} className="text-decoration-none">
                <strong className="text-primary">
                  {formatPrice(item.price)} 
                  <small> /{item.type === 'vehicle' ? (t('day') || 'jour') : (t('month') || 'mois')}</small>
                </strong>
              </Link>

              <ul className="mb0 mt-2">
                {item.details.map((detail, i) => (
                  <li key={i} className="list-inline-item">
                    <small className="text-muted">
                      {detail.name}: {detail.value} &nbsp;
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeaturedListings;
