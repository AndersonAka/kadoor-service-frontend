'use client';

import { useTranslations } from 'next-intl';
import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import VehicleItem from "./VehicleItem";
import VehicleDetails from "./VehicleDetails";
import VehicleAvailabilityCalendar from "./VehicleAvailabilityCalendar";
import { useTranslatedText, useTranslatedArray } from "@/hooks/useAutoTranslate";

const VehicleDetailsContent = ({ item }) => {
    const t = useTranslations('VehicleDetails');
    const tProperty = useTranslations('Property');
    
    // Traduire le contenu dynamique depuis la base de données
    const translatedTitle = useTranslatedText(item?.title || '', 'fr');
    const translatedDescription = useTranslatedText(item?.description || '', 'fr');
    const translatedFeatures = useTranslatedArray(item?.features || [], 'fr');
    const translatedLocation = useTranslatedText(item?.location || '', 'fr');

    return (
        <>
            <div className="listing_single_description">
                <div className="lsd_list">
                    <VehicleItem item={item} />
                </div>
                {/* End .lsd_list */}

                <h4 className="mb30">{t('description')}</h4>
                {translatedDescription ? (
                    <p className="mb25">{translatedDescription}</p>
                ) : (
                    <PropertyDescriptions />
                )}
            </div>
            {/* End .listing_single_description */}

            <div className="additional_details">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="mb15">{t('vehicle_specifications')}</h4>
                    </div>
                    <VehicleDetails item={item} />
                </div>
            </div>
            {/* End .additional_details */}

            {translatedFeatures && translatedFeatures.length > 0 && (
                <div className="application_statics mt30">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="mb10">{tProperty('amenities')}</h4>
                        </div>
                        {translatedFeatures.map((feature, index) => (
                            <div className="col-sm-6 col-md-6 col-lg-4" key={index}>
                                <ul className="order_list list-inline-item">
                                    <li>
                                        <span className="flaticon-tick"></span>
                                        {feature}
                                    </li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {/* End .feature_area */}

            <VehicleAvailabilityCalendar />
        </>
    );
};

export default VehicleDetailsContent;
