
'use client'

import { Link } from "@/i18n/routing";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLength } from "../../../features/properties/propertiesSlice";
import propertiesData from "../../../data/properties";
import vehiclesMockData from "../../../data/vehicles";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { vehicleService } from "../../../services/vehicleService";
import { formatPrice } from "@/utils/currency";
import Pagination from "../../common/blog/Pagination";

const FeaturedItem = ({ dataType = "properties" }) => {
  const t = useTranslations("Vehicles");
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(dataType === "vehicles");
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMeta, setPaginationMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });

  const {
    keyword,
    location,
    status,
    propertyType,
    price,
    bedrooms,
    garages,
    yearBuilt,
  } = useSelector((state) => state.properties);
  const { statusType, featured, isGridOrList } = useSelector(
    (state) => state.filter
  );

  const dispatch = useDispatch();

  // Construire les filtres pour l'API (charger toutes les données correspondant aux filtres de base)
  const apiFilters = useMemo(() => {
    const filters = {
      page: 1,
      limit: 100, // Maximum autorisé par le backend (selon @Max(100) dans QueryVehiclesDto)
    };

    if (dataType === "vehicles") {
      // Search - seulement si non vide
      if (keyword && keyword.trim() !== "") {
        filters.search = keyword.trim();
      }
      
      // Location - seulement si non vide
      if (location && location.trim() !== "") {
        filters.location = location.trim();
      }
      
      // Ne pas envoyer type si ce n'est pas une valeur valide de l'enum VehicleType
      // Le backend attend TYPE_1, TYPE_2, TYPE_3, TYPE_4 uniquement
      // Pour l'instant, on ne filtre pas par type car les valeurs du frontend ne correspondent pas
      // if (propertyType && ['TYPE_1', 'TYPE_2', 'TYPE_3', 'TYPE_4'].includes(propertyType)) {
      //   filters.type = propertyType;
      // }
      
      // Prix - doivent être des nombres valides (> 0)
      if (price?.min !== undefined && price.min !== null && price.min !== "" && !isNaN(price.min) && Number(price.min) > 0) {
        filters.minPrice = Number(price.min);
      }
      if (price?.max !== undefined && price.max !== null && price.max !== "" && !isNaN(price.max) && Number(price.max) > 0) {
        filters.maxPrice = Number(price.max);
      }
      
      // Note: seats et transmission sont filtrés côté client car le backend ne les supporte pas encore
    }

    return filters;
  }, [dataType, keyword, location, propertyType, price]);

  // Charger les données depuis l'API
  useEffect(() => {
    if (dataType === "vehicles") {
      const fetchVehicles = async () => {
        setLoading(true);
        try {
          const result = await vehicleService.getAllVehicles(apiFilters);
          if (result && result.data && result.data.length > 0) {
            let mappedVehicles = result.data.map(v => ({
              id: v.id,
              img: v.images && v.images.length > 0 ? v.images[0] : "/assets/images/services/mercedes.png",
              price: v.pricePerDay,
              type: v.type,
              title: v.title,
              location: v.location || "Cameroun",
              transmission: v.transmission || "Automatique",
              fuel: v.fuel || "Diesel",
              seats: v.seats || 5,
              posterName: "Kadoor Service",
              postedYear: v.year || "2023",
              posterAvatar: "/assets/images/team/1.jpg",
              created_at: new Date(v.createdAt).getTime(),
              featured: "Disposable"
            }));

            // Appliquer les filtres côté client (seats et transmission)
            if (bedrooms) {
              mappedVehicles = mappedVehicles.filter(v => v.seats === parseInt(bedrooms));
            }
            if (garages) {
              mappedVehicles = mappedVehicles.filter(v => 
                v.transmission?.toLowerCase().includes(garages.toLowerCase())
              );
            }

            // Pagination côté client
            const itemsPerPage = 10;
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const paginatedVehicles = mappedVehicles.slice(startIndex, endIndex);

            setVehicles(paginatedVehicles);
            // Métadonnées de pagination basées sur les données filtrées
            const filteredTotal = mappedVehicles.length;
            setPaginationMeta({
              total: filteredTotal,
              page: currentPage,
              limit: itemsPerPage,
              totalPages: Math.ceil(filteredTotal / itemsPerPage)
            });
          } else {
            setVehicles(vehiclesMockData);
            setPaginationMeta({ total: vehiclesMockData.length, page: 1, limit: 10, totalPages: 1 });
          }
        } catch (error) {
          console.error('Error fetching vehicles:', error);
          setVehicles(vehiclesMockData);
          setPaginationMeta({ total: vehiclesMockData.length, page: 1, limit: 10, totalPages: 1 });
        } finally {
          setLoading(false);
        }
      };
      fetchVehicles();
    }
  }, [dataType, apiFilters, bedrooms, garages, currentPage]);

  // Réinitialiser la page quand les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, location, propertyType, price, bedrooms, garages]);

  const data = dataType === "vehicles" ? vehicles : propertiesData;

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

  const content = data.map((item) => (
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
            alt="fp1.jpg"
          />
          <div className="thmb_cntnt">
            <ul className="tag mb0">
              <li className="list-inline-item">
                <a href="#">Featured</a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-capitalize">
                  {item.featured}
                </a>
              </li>
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
              href={{ pathname: '/vehicle-details/[id]', params: { id: item.id } }}
              className="fp_price"
            >
              {formatPrice(item.price)}
              <small>{dataType === "vehicles" ? ` ${t("per_day")}` : " /mo"}</small>
            </Link>
          </div>
        </div>
        <div className="details">
          <div className="tc_content">
            <p className="text-thm">{item.type}</p>
            <h4>
              <Link href={{ pathname: '/vehicle-details/[id]', params: { id: item.id } }}>
                {item.title}
              </Link>
            </h4>
            <p>
              <span className="flaticon-placeholder"></span>
              {item.location}
            </p>

            <ul className="prop_details mb0">
              {dataType === "vehicles" ? (
                <>
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-settings mr5"></span>
                      {item.transmission}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-oil mr5"></span>
                      {item.fuel}
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <span className="flaticon-car mr5"></span>
                      {item.seats} {t("seats")}
                    </a>
                  </li>
                </>
              ) : (
                item.itemDetails?.map((val, i) => (
                  <li className="list-inline-item" key={i}>
                    <a href="#">
                      {val.name}: {val.number}
                    </a>
                  </li>
                ))
              )}
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
                    src={item.posterAvatar}
                    alt="pposter1.png"
                  />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link href="/agent-v2">{item.posterName}</Link>
              </li>
            </ul>
            <div className="fp_pdate float-end">{item.postedYear}</div>
          </div>
          {/* End .fp_footer */}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {content}
      {dataType === "vehicles" && paginationMeta.totalPages > 1 && (
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
