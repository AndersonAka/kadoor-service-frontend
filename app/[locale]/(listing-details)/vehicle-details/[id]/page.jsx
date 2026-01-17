import "photoswipe/dist/photoswipe.css";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/common/header/DefaultHeader";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import VehicleDetailsContent from "@/components/listing-details-v1/VehicleDetailsContent";
import Sidebar from "@/components/listing-details-v1/Sidebar";
import ListingOne from "@/components/listing-single/ListingOne";
import CommentsSection from "@/components/common/CommentsSection";
import RecentlyViewedTracker from "@/components/common/listing/RecentlyViewedTracker";
import { serverApi } from "@/utils/serverApi";
import { notFound } from "next/navigation";
import vehiclesMock from "@/data/vehicles";

// Fonction pour vérifier si un ID est un UUID
const isUUID = (id) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

const ListingDynamicDetailsV1 = async props => {
  const params = await props.params;
  const id = params.id;

  let v = null;
  let isMockData = false;

  // Si l'ID est un nombre (données mock), utiliser les données mock
  if (!isUUID(id) && !isNaN(Number(id))) {
    const mockId = Number(id);
    v = vehiclesMock.find(vehicle => vehicle.id === mockId);
    isMockData = true;
  } else {
    // Sinon, utiliser l'API (UUID)
    v = await serverApi.getVehicleById(id);
  }

  if (!v) {
    notFound();
  }

  // Adapter le format selon la source (mock ou API)
  const property = isMockData ? {
    ...v,
    id: v.id.toString(),
    img: v.img || "/assets/images/services/mercedes.png",
    imgList: v.imgList || [v.img] || [],
    price: v.price ? Number(v.price) : 45000,
    pricePerDay: v.price ? Number(v.price) : 45000,
    location: v.location || "Douala, Littoral",
    transmission: v.transmission || "Automatique",
    fuel: v.fuel || "Diesel",
    seats: v.seats ? Number(v.seats) : 5,
    year: v.year ? Number(v.year) : 2023,
    make: v.make || "",
    model: v.model || "",
    description: v.description || v.title || "",
    type: v.type || "Berline",
    features: v.features || [],
    isAvailable: v.isAvailable !== undefined ? v.isAvailable : true,
    posterName: v.posterName || "Kadoor Service",
    postedYear: v.postedYear || v.year || "2023",
  } : {
    ...v,
    img: v.images && v.images.length > 0 ? v.images[0] : "/assets/images/services/mercedes.png",
    imgList: v.images || [],
    price: v.pricePerDay,
    posterName: "Kadoor Service",
    postedYear: v.year || "2023",
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
      <RecentlyViewedTracker itemId={id} itemType="vehicle" />

      {/* <!-- Agent Single Grid View --> */}
      <section className="our-agent-single bgc-f7 pb30-991">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-8">
              <VehicleDetailsContent item={property} />
            </div>
            {/* End details content .col-lg-8 */}

            <div className="col-lg-4 col-xl-4">
              <Sidebar itemId={id} itemType="vehicle" itemData={property} />
            </div>
            {/* End sidebar content .col-lg-4 */}
          </div>
          {/* End .row */}
          
          {/* Section Commentaires - Déplacée après le bouton Réserver */}
          <div className="row mt50">
            <div className="col-lg-12">
              <CommentsSection 
                itemId={id} 
                itemType="vehicle"
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

export default ListingDynamicDetailsV1;
