import "photoswipe/dist/photoswipe.css";
import HeaderTailwind from "@/components/common/header/HeaderTailwind";
import FooterTailwind from "@/components/common/footer/FooterTailwind";
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
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Hero Gallery */}
      <div className="pt-20">
        <ListingOne property={property} />
      </div>

      <RecentlyViewedTracker itemId={id} itemType="vehicle" />

      {/* Details Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-kadoor">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              <VehicleDetailsContent item={property} />
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <div className="sticky top-24">
                <Sidebar itemId={id} itemType="vehicle" itemData={property} />
              </div>
            </div>
          </div>
          
          {/* Comments Section */}
          <div className="mt-12">
            <CommentsSection 
              itemId={id} 
              itemType="vehicle"
              itemTitle={property.title}
            />
          </div>
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default ListingDynamicDetailsV1;
