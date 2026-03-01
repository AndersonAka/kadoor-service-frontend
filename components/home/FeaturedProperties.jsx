'use client'

import { Link } from "@/i18n/routing";
import Slider from "react-slick";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";
import { vehicleService } from "../../services/vehicleService";
import { apartmentService } from "../../services/apartmentService";
import { useCurrency } from "@/context/CurrencyContext";

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
  const { formatPrice } = useCurrency();

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
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex bg-gray-100  p-1">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex items-center gap-2 px-6 py-2.5  font-medium transition-all ${
              activeTab === 'vehicles'
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={activeTab === 'vehicles' ? { backgroundColor: '#c21c21ff' } : {}}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
            </svg>
            {tNav('vehicles')}
          </button>
          <button
            onClick={() => setActiveTab('apartments')}
            className={`flex items-center gap-2 px-6 py-2.5  font-medium transition-all ${
              activeTab === 'apartments'
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            style={activeTab === 'apartments' ? { backgroundColor: '#c21c21ff' } : {}}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            {tNav('apartments')}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500">{getEmptyMessage()}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && currentData.length === 0 && (
        <div className="max-w-md mx-auto text-center py-16 px-8 bg-white">
          <div className="text-6xl mb-4">{activeTab === 'vehicles' ? '🚗' : '🏠'}</div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            {tHome('no_services_title') || 'Aucun service disponible'}
          </h4>
          <p className="text-gray-500 mb-4">{getEmptyMessage()}</p>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
      )}

      {/* Properties Grid */}
      {!loading && currentData.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentData?.slice(0, 6)?.map((item) => (
              <Link
                key={item.id}
                href={activeTab === 'vehicles' ? `/vehicle-details/${item.id}` : `/apartment-details/${item.id}`}
                className="group"
              >
                <div className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.saleTag.map((tag, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-xs font-semibold ${
                            i === 0
                              ? tag === 'Disponible' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                              : 'bg-primary text-white'
                          }`}
                        >
                          {translateTag(tag)}
                        </span>
                      ))}
                    </div>
                    {/* Price */}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-4 py-2 bg-white/95 backdrop-blur-sm font-bold shadow-lg" style={{ color: '#c21c21ff' }}>
                        {formatPrice(item.price)}
                        <span className="text-sm font-normal text-gray-500">
                          {activeTab === 'vehicles' ? `/${tVehicles('per_day')}` : `/${t('month')}`}
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <p className="text-primary text-sm font-medium mb-1">{translateType(item.type)}</p>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {item.location}
                    </p>

                    {/* Features */}
                    <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-gray-100 pt-4">
                      {activeTab === 'vehicles' ? (
                        <>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            </svg>
                            {item.transmission}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {item.fuel}
                          </span>
                        </>
                      ) : (
                        item.itemDetails?.slice(0, 3).map((val, i) => (
                          <span key={i} className="flex items-center gap-1">
                            {translateDetailName(val.name)}: {val.number}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-10">
            <Link
              href={activeTab === 'vehicles' ? '/vehicles' : '/apartments'}
              className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold transition-colors hover:opacity-90"
              style={{ backgroundColor: '#c21c21ff' }}
            >
              {tHome('view_more')}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
