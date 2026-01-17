'use client';

import { useTranslations } from 'next-intl';
import { useTranslatedText } from '@/hooks/useAutoTranslate';

const VehicleDetails = ({ item }) => {
    const t = useTranslations('Vehicles');
    
    // Traduire les valeurs dynamiques
    const translatedMake = useTranslatedText(item?.make || '', 'fr');
    const translatedModel = useTranslatedText(item?.model || '', 'fr');
    const translatedTransmission = useTranslatedText(item?.transmission || '', 'fr');
    const translatedFuel = useTranslatedText(item?.fuel || '', 'fr');

    return (
        <>
            <div className="col-md-6 col-lg-6 col-xl-4">
                <ul className="list-inline-item">
                    <li>
                        <p>
                            {t('make')} : <span>{translatedMake}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('model')} : <span>{translatedModel}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('year')} : <span>{item?.year}</span>
                        </p>
                    </li>
                </ul>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-4">
                <ul className="list-inline-item">
                    <li>
                        <p>
                            {t('transmission')} : <span>{translatedTransmission}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('fuel')} : <span>{translatedFuel}</span>
                        </p>
                    </li>
                    <li>
                        <p>
                            {t('seats')} : <span>{item?.seats}</span>
                        </p>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default VehicleDetails;
