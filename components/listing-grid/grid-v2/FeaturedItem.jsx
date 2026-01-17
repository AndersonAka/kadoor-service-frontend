
'use client'

import { Link } from "@/i18n/routing";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
import propertiesData from "../../../data/properties";
import apartmentsData from "../../../data/apartments";
import giftsData from "../../../data/gifts";
import Image from "next/image";
import { apartmentService } from "../../../services/apartmentService";
import { formatPrice } from "@/utils/currency";
import Pagination from "../../common/blog/Pagination";

const FeaturedItem = ({ dataType = "properties" }) => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(dataType === "apartments");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });

  const {
    keyword,
    location,
    status,
    propertyType,
    price,
    bathrooms,
    bedrooms,
    garages,
    yearBuilt,
    area,
    amenities,
  } = useSelector((state) => state.properties);
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  // Construire les filtres pour l'API
  const apiFilters = useMemo(() => {
    const filters = {
      page: currentPage,
      limit: 10,
    };

    if (dataType === "apartments") {
      // Search - seulement si non vide
      if (keyword && keyword.trim() !== "") {
        filters.search = keyword.trim();
      }
      
      // City - seulement si non vide
      if (location && location.trim() !== "") {
        filters.city = location.trim();
      }
      
      // Ne pas envoyer type si ce n'est pas une valeur valide de l'enum ApartmentType
      // Le backend attend TYPE_1, TYPE_2, TYPE_3 uniquement
      // Pour l'instant, on ne filtre pas par type car les valeurs du frontend ne correspondent pas
      
      // Convertir prix mensuel en prix par nuit (approximatif)
      // S'assurer que les prix sont valides (> 0) et des nombres
      if (price?.min !== undefined && price.min !== null && price.min !== "" && !isNaN(price.min) && Number(price.min) > 0) {
        const minPriceValue = Math.max(0, Math.round(Number(price.min) / 30));
        if (minPriceValue > 0) {
          filters.minPrice = minPriceValue;
        }
      }
      if (price?.max !== undefined && price.max !== null && price.max !== "" && !isNaN(price.max) && Number(price.max) > 0) {
        const maxPriceValue = Math.max(0, Math.round(Number(price.max) / 30));
        if (maxPriceValue > 0) {
          filters.maxPrice = maxPriceValue;
        }
      }
      
      // bedrooms doit être >= 1 selon le DTO
      // Ne pas envoyer si vide, null, undefined ou 0
      if (bedrooms !== undefined && bedrooms !== null && bedrooms !== "" && !isNaN(bedrooms)) {
        const bedroomsValue = parseInt(bedrooms);
        if (!isNaN(bedroomsValue) && bedroomsValue >= 1) {
          filters.bedrooms = bedroomsValue;
        }
      }
    }

    return filters;
  }, [dataType, currentPage, keyword, location, price, bedrooms]);

  // Charger les données depuis l'API
  useEffect(() => {
    if (dataType === "apartments") {
      const fetchApartments = async () => {
        setLoading(true);
        try {
          const result = await apartmentService.getAllApartments(apiFilters);
          if (result && result.data && result.data.length > 0) {
            const mappedApartments = result.data.map(a => ({
              id: a.id,
              img: a.images && a.images.length > 0 ? a.images[0] : "/assets/images/services/apartment_luxury.png",
              price: a.pricePerNight ? Math.round(a.pricePerNight * 30) : 75000, // Convertir prix par nuit en prix mensuel approximatif
              type: "Appartement",
              title: a.title,
              location: a.city ? `${a.address || ""}, ${a.city}`.trim() : (a.address || "Cameroun"),
              saleTag: [a.isAvailable ? "Disponible" : "Loué", "Appartement"],
              itemDetails: [
                { name: "Chambres", number: a.bedrooms?.toString() || "2" },
                { name: "Douches", number: a.bathrooms?.toString() || "1" },
                { name: "Superficie", number: a.area ? Math.round(a.area).toString() : "80" },
              ],
              posterName: "Kadoor Service",
              postedYear: "Récent",
              posterAvatar: "/assets/images/property/pposter1.png",
              imgList: a.images && a.images.length > 0 ? a.images : ["/assets/images/services/apartment_luxury.png"],
              built: new Date(a.createdAt).getFullYear().toString(),
              amenities: a.features && a.features.length > 0 ? a.features.join(", ") : "Climatisation, Wi-Fi, Parking",
              featured: "rent",
              created_at: new Date(a.createdAt || Date.now()).getTime(),
            }));
            setApartments(mappedApartments);
            setPaginationMeta(result.meta || { total: 0, page: 1, limit: 10, totalPages: 0 });
          } else {
            setApartments(apartmentsData);
            setPaginationMeta({ total: apartmentsData.length, page: 1, limit: 10, totalPages: 1 });
          }
        } catch (error) {
          console.error('Error fetching apartments:', error);
          setApartments(apartmentsData);
          setPaginationMeta({ total: apartmentsData.length, page: 1, limit: 10, totalPages: 1 });
        } finally {
          setLoading(false);
        }
      };
      fetchApartments();
    }
  }, [dataType, apiFilters]);

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, location, price, bedrooms]);

  const data =
    dataType === "apartments" ? apartments :
      dataType === "gifts" ? giftsData :
        propertiesData;

  // Mettre à jour la longueur pour FilterTopBar
  useEffect(() => {
    dispatch(addLength(paginationMeta.total || data.length));
  }, [dispatch, paginationMeta.total, data.length]);

  if (loading) {
    return (
      <div className="col-12 text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Chargement...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="col-12 text-center py-5">
        <p>Aucun résultat trouvé.</p>
      </div>
    );
  }

  // Appliquer les filtres côté client pour les autres types (gifts, properties)
  const filteredData = dataType === "apartments" ? data : (() => {
    const keywordHandler = (item) =>
      item.title?.toLowerCase().includes(keyword?.toLowerCase() || "");
    const locationHandler = (item) =>
      item.location?.toLowerCase().includes(location?.toLowerCase() || "");
    const priceHandler = (item) => {
      if (!price?.min && !price?.max) return true;
      if (price?.max === 0) return item.price >= price?.min;
      return item.price <= price?.max && item.price >= price?.min;
    };

    return data
      ?.filter(keywordHandler)
      ?.filter(locationHandler)
      ?.filter(priceHandler) || [];
  })();

  let content = filteredData.map((item) => (
    <div
      className={`${isGridOrList ? "col-12 feature-list" : "col-md-6 col-lg-6"
        } `}
      key={item.id}
    >
      <div
        className={`feat_property home7 style4 ${isGridOrList ? "d-flex align-items-center" : undefined
          }`}
      >
        <div className="thumb">
          <Image
            width={342}
            height={220}
            className="img-whp w-100 h-100 cover"
            src={item.img}
            alt={item.title || "property"}
          />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              {item.saleTag?.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">{val}</a>
                </li>
              )) || (
                <>
                  <li className="list-inline-item">
                    <a href="#">Featured</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="text-capitalize">
                      {item.featured || "Disponible"}
                    </a>
                  </li>
                </>
              )}
            </ul>
            <ul className="icon mb0">
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-transfer-1"></span>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <span className="flaticon-heart"></span>
                </a>
              </li>
            </ul>

            <Link
              href={{
                pathname: dataType === 'gifts' ? '/gift-details/[id]' : '/apartment-details/[id]',
                params: { id: item.id }
              }}
              className="fp_price"
            >
              {formatPrice(item.price)}
              <small>{dataType === "apartments" ? " /mois" : dataType === "gifts" ? "" : " /mo"}</small>
            </Link>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.type || "Appartement"}</p>
            <h4>
              <Link href={{
                pathname: dataType === 'gifts' ? '/gift-details/[id]' : '/apartment-details/[id]',
                params: { id: item.id }
              }}>
                {item.title}
              </Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.location}
            </p>

            <ul className="prop_details mb0">
              {item.itemDetails?.map((val, i) => (
                <li className="list-inline-item" key={i}>
                  <a href="#">
                    {val.name}: {val.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* End .tc_content */}

          <div className="fp_footer">
            <ul className="fp_meta float-start mb0">
              <li className="list-inline-item">
                <Link href="/agent-v2">
                  <Image
                    width={40}
                    height={40}
                    src={item.posterAvatar || "/assets/images/property/pposter1.png"}
                    alt="poster"
                  />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/agent-v2">{item.posterName || "Kadoor Service"}</Link>
              </li>
            </ul>
            <div className="fp_pdate float-end">{item.postedYear || "Récent"}</div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {content}
      {dataType === "apartments" && paginationMeta.totalPages > 1 && (
        <div className="col-12 mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={paginationMeta.totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </>
  );
};

export default FeaturedItem;
