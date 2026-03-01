'use client';

import { useTranslations } from 'next-intl';

const ListingDetailsV2 = ({ item, type = 'apartment' }) => {
  const t = useTranslations('Listing');
  
  if (!item) {
    return (
      <div className="container-kadoor py-20 text-center">
        <p className="text-gray-500">{t('loading') || 'Chargement...'}</p>
      </div>
    );
  }

  return (
    <div className="container-kadoor py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h1>
        <p className="text-gray-600">{item.description}</p>
      </div>
    </div>
  );
};

export default ListingDetailsV2;
