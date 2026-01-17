
import "photoswipe/dist/photoswipe.css";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/home-10/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import gifts from "@/data/gifts";
import GiftDetailsContent from "@/components/listing-details-v1/GiftDetailsContent";
import Sidebar from "@/components/listing-details-v1/Sidebar";
import ListingTwo from "@/components/listing-single/ListingTwo";
import { formatPrice } from "@/utils/currency";

const ListingDynamicDetailsV2 = async props => {
    const params = await props.params;

    const id = params.id;
    const property = gifts?.find((item) => item.id == id) || gifts[0]


    return (
        <>
            {/* <!-- Main Header Nav --> */}
            <Header />

            {/* <!--  Mobile Menu --> */}
            <MobileMenu />

            {/* <!-- Modal --> */}
            <PopupSignInUp />

            {/* <!-- Listing Single Property --> */}

            <ListingTwo property={property} />


            {/* <!-- Agent Single Grid View --> */}
            <section className="our-agent-single bgc-f7 pb30-991">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-8">
                            <div className="listing_single_description2 mt30-767 mb30-767">
                                <div className="single_property_title">
                                    <h2>{property?.title}</h2>
                                    <p>{property?.location}</p>
                                </div>
                                <div className="single_property_social_share style2 static-title">
                                    <div className="price">
                                        <h2>
                                            {formatPrice(property.price)}
                                            <small></small>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            {/* End .listing_single_description2 */}

                            <GiftDetailsContent item={property} />
                        </div>
                        {/* End details content .col-lg-8 */}

                        <div className="col-lg-4 col-xl-4">
                            <Sidebar />
                        </div>
                        {/* End sidebar content .col-lg-4 */}
                    </div>
                    {/* End .row */}
                </div>
            </section>

            {/* <!-- Our Footer --> */}
            <section className="footer_one bgc-dark8">
                <div className="container">
                    <div className="row">
                        <Footer />
                    </div>
                </div>
            </section>

            {/* <!-- Our Footer Bottom Area --> */}
            <section className="footer_middle_area pt40 pb40 bgc-dark8 border-top-dark">
                <div className="container">
                    <CopyrightFooter />
                </div>
            </section>
        </>
    );
};

export default ListingDynamicDetailsV2;
