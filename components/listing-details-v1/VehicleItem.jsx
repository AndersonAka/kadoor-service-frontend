'use client';

import { useTranslations } from 'next-intl';
import { useTranslatedText } from '@/hooks/useAutoTranslate';

const VehicleItem = ({ item }) => {
    const t = useTranslations('Vehicles');
    const tDetails = useTranslations('VehicleDetails');
    
    // Traduire les valeurs dynamiques
    const translatedTransmission = useTranslatedText(item?.transmission || '', 'fr');
    const translatedFuel = useTranslatedText(item?.fuel || '', 'fr');

    return (
        <ul className="mb0">
            <li className="list-inline-item">
                <a href="#">
                    <span className="flaticon-settings mr5"></span>
                    {translatedTransmission}
                </a>
            </li>
            <li className="list-inline-item">
                <a href="#">
                    <span className="flaticon-oil mr5"></span>
                    {translatedFuel}
                </a>
            </li>
            <li className="list-inline-item">
                <a href="#">
                    <span className="flaticon-car mr5"></span>
                    {item?.seats} {tDetails('places')}
                </a>
            </li>
        </ul>
    );
};

export default VehicleItem;
