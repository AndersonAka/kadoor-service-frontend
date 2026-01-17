'use client';

import { useTranslations } from 'next-intl';
import HouseRules from "./HouseRules";
import { formatPrice } from "@/utils/currency";
import { useTranslatedText, useTranslatedArray } from "@/hooks/useAutoTranslate";

const ApartmentDetailsContent = ({ item }) => {
    const t = useTranslations('Property');
    
    // Traduire le contenu dynamique depuis la base de données
    const translatedDescription = useTranslatedText(item?.description || '', 'fr');
    const translatedFeatures = useTranslatedArray(item?.features || [], 'fr');
    const translatedCity = useTranslatedText(item?.city || '', 'fr');
    const translatedAddress = useTranslatedText(item?.address || '', 'fr');

    return (
        <>
            <div className="listing_single_description">
                <div className="lsd_list">
                    <ul className="mb0">
                        <li className="list-inline-item">
                            <a href="#">{item?.type || t('apartment') || 'Appartement'}</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">{t('bedrooms') || 'Chambres'}: {item?.bedrooms || 0}</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">{t('bathrooms') || 'Salles de bain'}: {item?.bathrooms || 0}</a>
                        </li>
                        <li className="list-inline-item">
                            <a href="#">{t('area') || 'Superficie'}: {item?.area ? Math.round(item.area) : 0} m²</a>
                        </li>
                    </ul>
                </div>
                {/* End .lsd_list */}

                <h4 className="mb30">{t('description')}</h4>
                <p className="mb25">
                    {translatedDescription || t('no_description')}
                </p>
            </div>
            {/* End .listing_single_description */}

            <div className="additional_details">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="mb15">{t('property_details') || 'Détails de la propriété'}</h4>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-4">
                        <ul className="list-inline-item">
                            <li>
                                <p>
                                    {t('type') || 'Type'} : <span>{item?.type || t('apartment') || 'Appartement'}</span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    {t('price') || 'Prix'} : <span>{formatPrice(item?.pricePerNight ? Math.round(item.pricePerNight * 30) : (item?.price || 0))} / {t('month') || 'mois'}</span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    {t('area') || 'Superficie'} : <span>{item?.area ? Math.round(item.area) : 0} m²</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-4">
                        <ul className="list-inline-item">
                            <li>
                                <p>
                                    {t('bedrooms') || 'Chambres'} : <span>{item?.bedrooms || 0}</span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    {t('bathrooms') || 'Salles de bain'} : <span>{item?.bathrooms || 0}</span>
                                </p>
                            </li>
                            <li>
                                <p>
                                    {t('status') || 'Statut'} : <span>{item?.isAvailable ? (t('available') || 'Disponible') : (t('unavailable') || 'Indisponible')}</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* End .additional_details */}

            {translatedFeatures && translatedFeatures.length > 0 && (
                <div className="application_statics mt30">
                    <div className="row">
                        <div className="col-lg-12">
                            <h4 className="mb10">{t('amenities')}</h4>
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

            {item?.house_rules && (
                <HouseRules rules={item.house_rules} />
            )}
        </>
    );
};

export default ApartmentDetailsContent;
