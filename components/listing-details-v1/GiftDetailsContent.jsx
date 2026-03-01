'use client';

import PropertyDescriptions from "../common/listing-details/PropertyDescriptions";
import PropertyDetails from "../common/listing-details/PropertyDetails";
import GiftPersonalization from "./GiftPersonalization";

const GiftDetailsContent = ({ item }) => {
    return (
        <div className="space-y-8">
            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Description du cadeau</h3>
                <PropertyDescriptions />
            </div>

            {/* Characteristics */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques</h3>
                <PropertyDetails />
            </div>

            <GiftPersonalization />

            {/* Delivery Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Informations de livraison</h3>
                <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item?.location}
                    </li>
                    <li className="flex items-center gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Délais estimé : 24h - 48h
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default GiftDetailsContent;
