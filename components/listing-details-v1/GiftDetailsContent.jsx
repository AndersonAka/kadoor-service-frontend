'use client';

import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import PropertyDetails from "../common/listing-details/PropertyDetails";
import GiftPersonalization from "./GiftPersonalization";

const GiftDetailsContent = ({ item }) => {
    return (
        <>
            <div className="listing_single_description">
                <h4 className="mb30">Description du cadeau</h4>
                <PropertyDescriptions />
            </div>
            {/* End .listing_single_description */}

            <div className="additional_details">
                <div className="row">
                    <div className="col-lg-12">
                        <h4 className="mb15">Caractéristiques</h4>
                    </div>
                    <PropertyDetails />
                </div>
            </div>
            {/* End .additional_details */}

            <GiftPersonalization />

            <div className="application_statics mt30">
                <h4 className="mb30">Informations de livraison</h4>
                <div className="iba_container">
                    <div className="iba_item d-flex align-items-center mb10">
                        <span className="flaticon-tick text-primary me-2"></span>
                        <span>{item?.location}</span>
                    </div>
                    <div className="iba_item d-flex align-items-center">
                        <span className="flaticon-tick text-primary me-2"></span>
                        <span>Délais estimé : 24h - 48h</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GiftDetailsContent;
