'use client';

import { useTranslations } from 'next-intl';
import { useTranslatedText } from '@/hooks/useAutoTranslate';

const VehicleItem = ({ item }) => {
    const t = useTranslations('Vehicles');
    const tDetails = useTranslations('VehicleDetails');
    
    const translatedTransmission = useTranslatedText(item?.transmission || '', 'fr');
    const translatedFuel = useTranslatedText(item?.fuel || '', 'fr');

    return (
        <div className="flex flex-wrap gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
                {translatedTransmission}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {translatedFuel}
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700">
                <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {item?.seats} {tDetails('places')}
            </span>
        </div>
    );
};

export default VehicleItem;
