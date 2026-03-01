'use client';

import { useTranslations } from 'next-intl';
import { useTranslatedText } from '@/hooks/useAutoTranslate';

const VehicleDetails = ({ item }) => {
    const t = useTranslations('Vehicles');
    
    const translatedMake = useTranslatedText(item?.make || '', 'fr');
    const translatedModel = useTranslatedText(item?.model || '', 'fr');
    const translatedTransmission = useTranslatedText(item?.transmission || '', 'fr');
    const translatedFuel = useTranslatedText(item?.fuel || '', 'fr');

    const specs = [
        { label: t('make'), value: translatedMake },
        { label: t('model'), value: translatedModel },
        { label: t('year'), value: item?.year },
        { label: t('transmission'), value: translatedTransmission },
        { label: t('fuel'), value: translatedFuel },
        { label: t('seats'), value: item?.seats },
    ].filter(s => s.value);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {specs.map((spec, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                    <span className="block text-xs text-gray-400 mb-1">{spec.label}</span>
                    <span className="font-semibold text-gray-900">{spec.value}</span>
                </div>
            ))}
        </div>
    );
};

export default VehicleDetails;
