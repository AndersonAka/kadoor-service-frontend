'use client'

import { Link } from "@/i18n/routing";
import Slider from "react-slick";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { vehicleService } from "../../services/vehicleService";
import { apartmentService } from "../../services/apartmentService";
import { formatPrice } from "@/utils/currency";

const FeaturedProperties = () => {
  const [activeTab, setActiveTab] = useState('vehicles'); // 'vehicles' or 'apartments'
  const [vehicles, setVehicles] = useState([]);
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const t = useTranslations('Property');
  const tHome = useTranslations('HomePage');
  const tVehicles = useTranslations('Vehicles');
  const tNav = useTranslations('Navigation');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        
        // Fetch vehicles - limiter à 6 pour la page d'accueil
        const vehiclesResult = await vehicleService.getAllVehicles({ page: 1, limit: 6 });
        console.log('Vehicles data received:', vehiclesResult);
        const vehiclesData = vehiclesResult?.data || [];
        if (vehiclesData && Array.isArray(vehiclesData) && vehiclesData.length > 0) {
          const mapped = vehiclesData.map(v => ({
            id: v.id,
            img: v.images && v.images.length > 0 ? v.images[0] : "/assets/images/services/mercedes.png",
            price: v.pricePerDay,
            type: v.type,
            title: v.title,
            location: v.location || "Douala, Littoral",
            saleTag: [v.isAvailable ? "Disponible" : "Loué", v.type],
            transmission: v.transmission || "Automatique",
            fuel: v.fuel || "Diesel",
            posterName: "Kadoor Service",
            postedYear: v.year || "2023",
            posterAvatar: "/assets/images/team/1.jpg"
          }));
          console.log('Vehicles mapped:', mapped.length, 'items');
          setVehicles(mapped);
        } else {
          console.log('No vehicles data or empty array');
          setVehicles([]);
        }

        // Fetch apartments - limiter à 6 pour la page d'accueil
        const apartmentsResult = await apartmentService.getAllApartments({ page: 1, limit: 6 });
        console.log('Apartments data received:', apartmentsResult);
        const apartmentsData = apartmentsResult?.data || [];
        if (apartmentsData && Array.isArray(apartmentsData) && apartmentsData.length > 0) {
          const mapped = apartmentsData.map(a => ({
            id: a.id,
            img: a.images && a.images.length > 0 ? a.images[0] : "/assets/images/services/apartment_luxury.png",
            price: a.pricePerNight ? Math.round(a.pricePerNight * 30) : 75000,
            type: a.type || "Appartement",
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
            posterAvatar: "/assets/images/property/pposter1.png"
          }));
          console.log('Apartments mapped:', mapped.length, 'items');
          setApartments(mapped);
        } else {
          console.log('No apartments data or empty array');
          setApartments([]);
        }
      } catch (error) {
        console.error("Failed to fetch data on home:", error);
        setError(error.message || 'Erreur lors du chargement des données');
        setVehicles([]);
        setApartments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 1200,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // S'assurer que currentData est toujours un tableau
  const currentData = Array.isArray(activeTab === 'vehicles' ? vehicles : apartments) 
    ? (activeTab === 'vehicles' ? vehicles : apartments) 
    : [];

  const translateType = (type) => {
    const key = type.toLowerCase().replace(/\s+/g, '_');
    return t.has(key) ? t(key) : type;
  };

  const translateTag = (tag) => {
    const key = tag.toLowerCase().replace(/\s+/g, '_');
    return t.has(key) ? t(key) : tag;
  };

  const translateDetailName = (name) => {
    const key = name.toLowerCase();
    return t.has(key) ? t(key) : name;
  };

  // Message à afficher si pas de données
  const getEmptyMessage = () => {
    if (loading) {
      return tHome('loading_services') || 'Chargement des services...';
    }
    if (error) {
      return tHome('error_loading_services') || 'Erreur lors du chargement des services. Veuillez réessayer plus tard.';
    }
    return activeTab === 'vehicles' 
      ? (tHome('no_vehicles_available') || 'Aucun véhicule disponible pour le moment.')
      : (tHome('no_apartments_available') || 'Aucun appartement disponible pour le moment.');
  };

  return (
    <>
      <div className="row justify-content-center mb30">
        <div className="col-auto">
          <ul className="nav nav-pills custom_tab_list">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'vehicles' ? 'active' : ''}`}
                onClick={() => setActiveTab('vehicles')}
                style={{
                  backgroundColor: activeTab === 'vehicles' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'vehicles' ? '#fff' : '#333',
                  border: '1px solid #ddd',
                  marginRight: '10px',
                  borderRadius: '30px',
                  padding: '8px 25px'
                }}
              >
                {tNav('vehicles')}
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'apartments' ? 'active' : ''}`}
                onClick={() => setActiveTab('apartments')}
                style={{
                  backgroundColor: activeTab === 'apartments' ? 'var(--color-primary)' : 'transparent',
                  color: activeTab === 'apartments' ? '#fff' : '#333',
                  border: '1px solid #ddd',
                  borderRadius: '30px',
                  padding: '8px 25px'
                }}
              >
                {tNav('apartments')}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {loading ? (
        <div className="row justify-content-center">
          <div className="col-auto">
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
              <p className="mt-3">{getEmptyMessage()}</p>
            </div>
          </div>
        </div>
      ) : currentData.length === 0 ? (
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-6">
            <div className="text-center py-5" style={{
              background: '#f8f9fa',
              borderRadius: '10px',
              padding: '40px 20px'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
              <h4 style={{ color: '#333', marginBottom: '15px' }}>
                {tHome('no_services_title') || 'Aucun service disponible'}
              </h4>
              <p style={{ color: '#666', fontSize: '16px', marginBottom: '20px' }}>
                {getEmptyMessage()}
              </p>
              {error && (
                <p style={{ color: '#b91c1c', fontSize: '14px', marginTop: '10px' }}>
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Slider {...settings} arrows={false}>
            {currentData?.slice(0, 6)?.map((item) => (
          <div className="item" key={item.id}>
            <div className="feat_property">
              <div className="thumb" style={{ height: '220px', overflow: 'hidden' }}>
                <Image
                  width={343}
                  height={220}
                  className="img-whp w-100 h-100"
                  src={item.img}
                  alt={item.title}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
                <div className="thmb_cntnt">
                  <ul className="tag mb0">
                    {item.saleTag.map((val, i) => (
                      <li className="list-inline-item" key={i}>
                        <a href="#">{val}</a>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={activeTab === 'vehicles' ? `/vehicle-details/${item.id}` : `/apartment-details/${item.id}`}
                    className="fp_price"
                  >
                    {formatPrice(item.price)}
                    <small>{activeTab === 'vehicles' ? ` ${tVehicles('per_day')}` : ` /${t('month')}`}</small>
                  </Link>
                </div>
              </div>

              <div className="details">
                <div className="tc_content">
                  <p className="text-thm">{translateType(item.type)}</p>
                  <h4>
                    <Link href={activeTab === 'vehicles' ? `/vehicle-details/${item.id}` : `/apartment-details/${item.id}`}>
                      {item.title}
                    </Link>
                  </h4>
                  <p>
                    <span className="flaticon-placeholder"></span>
                    {item.location}
                  </p>

                  <ul className="prop_details mb0">
                    {activeTab === 'vehicles' ? (
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
                      </>
                    ) : (
                      item.itemDetails?.slice(0, 2).map((val, i) => (
                        <li className="list-inline-item" key={i}>
                          <a href="#">
                            {translateDetailName(val.name)}: {val.number}
                          </a>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div className="fp_footer">
                  <ul className="fp_meta float-start mb0">
                    <li className="list-inline-item">
                      <Image
                        width={40}
                        height={40}
                        src={item.posterAvatar || "/assets/images/property/pposter1.png"}
                        alt="poster"
                        className="rounded-circle"
                      />
                    </li>
                    <li className="list-inline-item">
                      <a href="#">{item.posterName}</a>
                    </li>
                  </ul>
                  <div className="fp_pdate float-end">{item.postedYear}</div>
                </div>
              </div>
            </div>
          </div>
            ))}
          </Slider>

          <div className="row justify-content-center mt30">
            <div className="col-auto">
              <Link
                href={activeTab === 'vehicles' ? '/vehicules' : '/apartments'}
                className="btn btn-thm btn-lg rounded"
                style={{ padding: '12px 35px' }}
              >
                {tHome('view_more')}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FeaturedProperties;
