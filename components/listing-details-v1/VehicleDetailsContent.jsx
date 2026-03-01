'use client';

import { useTranslations } from 'next-intl';
import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import VehicleItem from "./VehicleItem";
import VehicleDetails from "./VehicleDetails";
import { useTranslatedText, useTranslatedArray } from "@/hooks/useAutoTranslate";

const VehicleDetailsContent = ({ item }) => {
    const t = useTranslations('VehicleDetails');
    const tProperty = useTranslations('Property');
    
    const translatedTitle = useTranslatedText(item?.title || '', 'fr');
    const translatedDescription = useTranslatedText(item?.description || '', 'fr');
    const translatedFeatures = useTranslatedArray(item?.features || [], 'fr');
    const translatedLocation = useTranslatedText(item?.location || '', 'fr');

    return (
        <div className="space-y-8">
            {/* Quick Info */}
            <div className="bg-white p-6 shadow-sm">
                <VehicleItem item={item} />
            </div>

            {/* Description */}
            <div className="bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('description')}</h3>
                {translatedDescription ? (
                    <p className="text-gray-600 leading-relaxed">{translatedDescription}</p>
                ) : (
                    <PropertyDescriptions />
                )}
            </div>

            {/* Specifications */}
            <div className="bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('vehicle_specifications')}</h3>
                <VehicleDetails item={item} />
            </div>

            {/* Features */}
            {translatedFeatures && translatedFeatures.length > 0 && (
                <div className="bg-white p-6 shadow-sm">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{tProperty('amenities')}</h3>
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
        </div>
    );
};

export default VehicleDetailsContent;
