import HeaderTailwind from "@/components/common/header/HeaderTailwind";
import FooterTailwind from "@/components/common/footer/FooterTailwind";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import gifts from "@/data/gifts";
import GiftDetailsContent from "@/components/listing-details-v1/GiftDetailsContent";
import { formatPrice } from "@/utils/currency";

const ListingDynamicDetailsV2 = async props => {
    const params = await props.params;
    const id = params.id;
    const property = gifts?.find((item) => item.id == id) || gifts[0];

    return (
        <>
            <HeaderTailwind />
            <PopupSignInUp />

            {/* Hero */}
            <section className="pt-28 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20">
                <div className="container-kadoor">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{property?.title}</h1>
                        <p className="text-gray-300 text-lg mb-4">{property?.location}</p>
                        <span className="text-3xl font-bold text-primary">{formatPrice(property.price)}</span>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-gray-50">
                <div className="container-kadoor">
                    <div className="max-w-4xl mx-auto">
                        <GiftDetailsContent item={property} />
                    </div>
                </div>
            </section>

            <FooterTailwind />
        </>
    );
};

export default ListingDynamicDetailsV2;
