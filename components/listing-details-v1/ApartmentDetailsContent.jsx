'use client';

import { useTranslations } from 'next-intl';
import HouseRules from "./HouseRules";
import { useCurrency } from "@/context/CurrencyContext";
import { useTranslatedText, useTranslatedArray } from "@/hooks/useAutoTranslate";

const ApartmentDetailsContent = ({ item }) => {
    const t = useTranslations('Property');
    const { formatPrice } = useCurrency();
    
    const translatedDescription = useTranslatedText(item?.description || '', 'fr');
    const translatedFeatures = useTranslatedArray(item?.features || [], 'fr');
    const translatedCity = useTranslatedText(item?.city || '', 'fr');
    const translatedAddress = useTranslatedText(item?.address || '', 'fr');

    const quickInfo = [
        { label: item?.type || t('apartment') || 'Appartement', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5' },
        { label: `${item?.bedrooms || 0} ${t('bedrooms') || 'Chambres'}`, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { label: `${item?.bathrooms || 0} ${t('bathrooms') || 'Sdb'}`, icon: 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z' },
        { label: `${item?.area ? Math.round(item.area) : 0} m²`, icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4' },
    ];

    const specs = [
        { label: t('type') || 'Type', value: item?.type || t('apartment') || 'Appartement' },
        { label: t('price') || 'Prix', value: `${formatPrice(item?.pricePerNight ? Math.round(item.pricePerNight * 30) : (item?.price || 0))} / ${t('month') || 'mois'}` },
        { label: t('area') || 'Superficie', value: `${item?.area ? Math.round(item.area) : 0} m²` },
        { label: t('bedrooms') || 'Chambres', value: item?.bedrooms || 0 },
        { label: t('bathrooms') || 'Salles de bain', value: item?.bathrooms || 0 },
        { label: t('status') || 'Statut', value: item?.isAvailable ? (t('available') || 'Disponible') : (t('unavailable') || 'Indisponible') },
    ];

    return (
        <div className="space-y-8">
            {/* Quick Info Pills */}
            <div className="bg-white p-6 shadow-sm">
                <div className="flex flex-wrap gap-4">
                    {quickInfo.map((info, i) => (
                        <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700">
                            <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={info.icon} />
                            </svg>
                            {info.label}
                        </span>
                    ))}
                </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('description')}</h3>
                <p className="text-gray-600 leading-relaxed">
                    {translatedDescription || t('no_description')}
                </p>
            </div>

            {/* Property Details */}
            <div className="bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('property_details') || 'Détails de la propriété'}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {specs.map((spec, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg p-4">
                            <span className="block text-xs text-gray-400 mb-1">{spec.label}</span>
                            <span className="font-semibold text-gray-900">{spec.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features */}
            {translatedFeatures && translatedFeatures.length > 0 && (
                <div className="bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t('amenities')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {translatedFeatures.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2 text-gray-700">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {item?.house_rules && (
                <HouseRules rules={item.house_rules} />
            )}
        </div>
    );
};

export default ApartmentDetailsContent;
