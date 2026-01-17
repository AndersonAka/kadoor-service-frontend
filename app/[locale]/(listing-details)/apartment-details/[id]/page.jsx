
import "photoswipe/dist/photoswipe.css";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import ApartmentDetailsContent from "@/components/listing-details-v1/ApartmentDetailsContent";
import Sidebar from "@/components/listing-details-v1/Sidebar";
import ListingOne from "@/components/listing-single/ListingOne";
import CommentsSection from "@/components/common/CommentsSection";
import RecentlyViewedTracker from "@/components/common/listing/RecentlyViewedTracker";
import { serverApi } from "@/utils/serverApi";
import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';
import apartmentsMock from "@/data/apartments";

// Fonction pour vérifier si un ID est un UUID
const isUUID = (id) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

const ListingDynamicDetailsV2 = async props => {
  const params = await props.params;
  const id = params.id;
  const t = await getTranslations('Property');

  let apartment = null;
  let isMockData = false;

  // Si l'ID est un nombre (données mock), utiliser les données mock
  if (!isUUID(id) && !isNaN(Number(id))) {
    const mockId = Number(id);
    apartment = apartmentsMock.find(apt => apt.id === mockId);
    isMockData = true;
  } else {
    // Sinon, utiliser l'API (UUID)
    apartment = await serverApi.getApartmentById(id);
  }

  if (!apartment) {
    notFound();
  }

  // Adapter le format selon la source (mock ou API)
  const property = isMockData ? {
    ...apartment,
    id: apartment.id.toString(),
    img: apartment.img || "/assets/images/services/apartment_luxury.png",
    imgList: apartment.imgList || [apartment.img] || [],
    price: apartment.price ? Number(apartment.price) : 75000,
    pricePerNight: apartment.price ? Number(apartment.price) / 30 : 2500,
    location: apartment.location || "Cameroun",
    address: apartment.location?.split(',')[0] || "",
    city: apartment.location?.split(',')[1]?.trim() || "",
    bedrooms: apartment.itemDetails?.find(d => d.name === "Chambres")?.number ? Number(apartment.itemDetails.find(d => d.name === "Chambres").number) : 1,
    bathrooms: apartment.itemDetails?.find(d => d.name === "Douches")?.number ? Number(apartment.itemDetails.find(d => d.name === "Douches").number) : 1,
    area: apartment.itemDetails?.find(d => d.name === "Superficie")?.number ? Number(apartment.itemDetails.find(d => d.name === "Superficie").number) : 0,
    features: apartment.amenities ? apartment.amenities.split(', ') : [],
    house_rules: apartment.house_rules || [],
    description: apartment.description || apartment.title || "",
    type: apartment.type || "Appartement",
    posterName: apartment.posterName || "Kadoor Service",
    postedYear: apartment.postedYear || "Récent",
  } : {
    ...apartment,
    img: apartment.images && apartment.images.length > 0 ? apartment.images[0] : "/assets/images/services/apartment_luxury.png",
    imgList: apartment.images || [],
    price: apartment.pricePerNight ? Math.round(apartment.pricePerNight * 30) : 75000,
    pricePerNight: apartment.pricePerNight,
    location: apartment.city ? `${apartment.address || ""}, ${apartment.city}`.trim() : (apartment.address || "Cameroun"),
    address: apartment.address,
    city: apartment.city,
    posterName: "Kadoor Service",
    postedYear: "Récent",
  };


  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Single Property --> */}
      <ListingOne property={property} />

      {/* Track recently viewed */}
      <RecentlyViewedTracker itemId={id} itemType="apartment" />

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <ApartmentDetailsContent item={property} />
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar itemId={id} itemType="apartment" itemData={property} />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
          
          {/* Section Commentaires - Déplacée après le bouton Réserver */}
          <div className="row mt50">
            <div className="col-lg-12">
              <CommentsSection 
                itemId={id} 
                itemType="apartment"
                itemTitle={property.title}
              />
            </div>
          </div>
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
