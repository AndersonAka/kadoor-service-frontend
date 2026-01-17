'use client'

import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from 'next-intl';
import {
  addFeatured,
  addStatusType,
} from "../../../features/filter/filterSlice";
import {
  addAmenities,
  addAreaMax,
  addAreaMin,
  addBathrooms,
  addBedrooms,
  addGarages,
  addKeyword,
  addLocation,
  addPrice,
  addPropertyType,
  addStatus,
  addYearBuilt,
  resetAmenities,
} from "../../../features/properties/propertiesSlice";
import PricingRangeSlider from "../../common/PricingRangeSlider";

const FilteringItemAdaptive = ({ dataType = "apartments" }) => {
  const t = useTranslations('ListingFilters');
  const tVehicles = useTranslations('Vehicles');
  const tProperty = useTranslations('Property');

  const {
    keyword,
    location,
    status,
    propertyType,
    bathrooms,
    bedrooms,
    garages,
    yearBuilt,
    area,
    amenities,
    price,
  } = useSelector((state) => state.properties);

  // Log initial des valeurs Redux
  useEffect(() => {
    console.log('🔵 [FilteringItemAdaptive] Valeurs Redux initiales:', {
      dataType,
      keyword,
      location,
      status,
      propertyType,
      bathrooms,
      bedrooms,
      garages,
      yearBuilt,
      area,
      amenities,
      price,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType]);

  // Input states - initialisés avec les valeurs Redux
  const [getKeyword, setKeyword] = useState(keyword || "");
  const [getLocation, setLocation] = useState(location || "");
  const [getStatus, setStatus] = useState(status || "");
  const [getPropertiesType, setPropertiesType] = useState(propertyType || "");
  const [getBathroom, setBathroom] = useState(bathrooms || "");
  const [getBedroom, setBedroom] = useState(bedrooms || "");
  const [getGarages, setGarages] = useState(garages || "");
  const [getBuiltYear, setBuiltYear] = useState(yearBuilt || "");
  const [getAreaMin, setAreaMin] = useState(area?.min || "");
  const [getAreaMax, setAreaMax] = useState(area?.max || "");

  const dispatch = useDispatch();

  // Synchroniser les états locaux avec Redux quand Redux change (uniquement si différent)
  // Cela permet de synchroniser si Redux est modifié depuis un autre composant
  useEffect(() => {
    if (keyword !== undefined && keyword !== getKeyword) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: keyword', { from: getKeyword, to: keyword });
      setKeyword(keyword || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);

  useEffect(() => {
    if (location !== undefined && location !== getLocation) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: location', { from: getLocation, to: location });
      setLocation(location || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    if (status !== undefined && status !== getStatus) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: status', { from: getStatus, to: status });
      setStatus(status || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (propertyType !== undefined && propertyType !== getPropertiesType) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: propertyType', { from: getPropertiesType, to: propertyType });
      setPropertiesType(propertyType || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyType]);

  useEffect(() => {
    if (bathrooms !== undefined && bathrooms !== getBathroom) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: bathrooms', { from: getBathroom, to: bathrooms });
      setBathroom(bathrooms || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bathrooms]);

  useEffect(() => {
    if (bedrooms !== undefined && bedrooms !== getBedroom) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: bedrooms', { from: getBedroom, to: bedrooms });
      setBedroom(bedrooms || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bedrooms]);

  useEffect(() => {
    if (garages !== undefined && garages !== getGarages) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: garages', { from: getGarages, to: garages });
      setGarages(garages || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [garages]);

  useEffect(() => {
    if (yearBuilt !== undefined && yearBuilt !== getBuiltYear) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: yearBuilt', { from: getBuiltYear, to: yearBuilt });
      setBuiltYear(yearBuilt || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yearBuilt]);

  useEffect(() => {
    if (area?.min !== undefined && area?.min !== getAreaMin) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: area.min', { from: getAreaMin, to: area?.min });
      setAreaMin(area?.min || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area?.min]);

  useEffect(() => {
    if (area?.max !== undefined && area?.max !== getAreaMax) {
      console.log('🔄 [FilteringItemAdaptive] Sync Redux -> Local: area.max', { from: getAreaMax, to: area?.max });
      setAreaMax(area?.max || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area?.max]);

  // Advanced features - adaptés selon le type
  const advancedFeatures = useMemo(() => {
    if (dataType === "vehicles") {
      return [
        { id: "air-conditioning", name: t('features.air_conditioning') },
        { id: "gps", name: t('features.gps') },
        { id: "bluetooth", name: t('features.bluetooth') },
        { id: "usb-port", name: t('features.usb_port') },
        { id: "backup-camera", name: t('features.backup_camera') },
        { id: "parking-sensors", name: t('features.parking_sensors') },
        { id: "sunroof", name: t('features.sunroof') },
        { id: "leather-seats", name: t('features.leather_seats') },
      ];
    } else {
      // apartments
      return [
        { id: "air-conditioning", name: t('features.air_conditioning') },
        { id: "wifi", name: t('features.wifi') },
        { id: "tv-cable", name: t('features.tv_cable') },
        { id: "refrigerator", name: t('features.refrigerator') },
        { id: "microwave", name: t('features.microwave') },
        { id: "washing-machine", name: t('features.washing_machine') },
        { id: "parking", name: t('features.parking') },
        { id: "security", name: t('features.security') },
        { id: "elevator", name: t('features.elevator') },
        { id: "balcony", name: t('features.balcony') },
      ];
    }
  }, [dataType, t]);

  const [getAdvanced, setAdvanced] = useState(
    advancedFeatures.map(f => ({ ...f, isChecked: false }))
  );

  // Update advanced features when dataType changes
  useEffect(() => {
    setAdvanced(advancedFeatures.map(f => ({ ...f, isChecked: false })));
  }, [dataType, advancedFeatures]);

  // Redux dispatches - dispatch immédiatement quand les valeurs locales changent
  useEffect(() => {
    const value = getKeyword || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: keyword', value);
    dispatch(addKeyword(value));
  }, [dispatch, getKeyword]);

  useEffect(() => {
    const value = getLocation || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: location', value);
    dispatch(addLocation(value));
  }, [dispatch, getLocation]);

  useEffect(() => {
    const value = getStatus || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: status', value);
    dispatch(addStatus(value));
  }, [dispatch, getStatus]);

  useEffect(() => {
    const value = getPropertiesType || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: propertyType', value);
    dispatch(addPropertyType(value));
  }, [dispatch, getPropertiesType]);

  useEffect(() => {
    const value = getBathroom || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: bathrooms', value);
    dispatch(addBathrooms(value));
  }, [dispatch, getBathroom]);

  useEffect(() => {
    const value = getBedroom || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: bedrooms', value);
    dispatch(addBedrooms(value));
  }, [dispatch, getBedroom]);

  useEffect(() => {
    const value = getGarages || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: garages', value);
    dispatch(addGarages(value));
  }, [dispatch, getGarages]);

  useEffect(() => {
    const value = getBuiltYear || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: yearBuilt', value);
    dispatch(addYearBuilt(value));
  }, [dispatch, getBuiltYear]);

  useEffect(() => {
    const value = getAreaMin || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: areaMin', value);
    dispatch(addAreaMin(value));
  }, [dispatch, getAreaMin]);

  useEffect(() => {
    const value = getAreaMax || "";
    console.log('📤 [FilteringItemAdaptive] Dispatch -> Redux: areaMax', value);
    dispatch(addAreaMax(value));
  }, [dispatch, getAreaMax]);

  // Initialiser les prix selon le type de données au montage
  useEffect(() => {
    if (!price.min || price.min === 0 || !price.max || price.max === 0) {
      const defaultPrice = dataType === "vehicles" 
        ? { min: 15000, max: 100000 } // Véhicules : 15k - 100k FCFA/jour
        : { min: 50000, max: 500000 }; // Appartements : 50k - 500k FCFA/mois
      console.log('💰 [FilteringItemAdaptive] Initialisation prix par défaut:', defaultPrice, 'pour', dataType);
      dispatch(addPrice(defaultPrice));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataType]); // Uniquement quand dataType change

  // Dispatch initial des valeurs au montage pour s'assurer que Redux est synchronisé
  useEffect(() => {
    console.log('🚀 [FilteringItemAdaptive] Dispatch initial au montage');
    const initialValues = {
      keyword: getKeyword || "",
      location: getLocation || "",
      status: getStatus || "",
      propertyType: getPropertiesType || "",
      bathrooms: getBathroom || "",
      bedrooms: getBedroom || "",
      garages: getGarages || "",
      yearBuilt: getBuiltYear || "",
      areaMin: getAreaMin || "",
      areaMax: getAreaMax || "",
    };
    console.log('📋 [FilteringItemAdaptive] Valeurs initiales dispatchées:', initialValues);
    dispatch(addKeyword(initialValues.keyword));
    dispatch(addLocation(initialValues.location));
    dispatch(addStatus(initialValues.status));
    dispatch(addPropertyType(initialValues.propertyType));
    dispatch(addBathrooms(initialValues.bathrooms));
    dispatch(addBedrooms(initialValues.bedrooms));
    dispatch(addGarages(initialValues.garages));
    dispatch(addYearBuilt(initialValues.yearBuilt));
    dispatch(addAreaMin(initialValues.areaMin));
    dispatch(addAreaMax(initialValues.areaMax));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Uniquement au montage

  const clearAllFilters = () => {
    console.log('🧹 [FilteringItemAdaptive] Clear all filters appelé pour', dataType);
    setKeyword("");
    setLocation("");
    setStatus("");
    setPropertiesType("");
    // Valeurs par défaut en FCFA selon le type
    const defaultPrice = dataType === "vehicles" 
      ? { min: 15000, max: 100000 } // Véhicules : 15k - 100k FCFA/jour
      : { min: 50000, max: 500000 }; // Appartements : 50k - 500k FCFA/mois
    console.log('💰 [FilteringItemAdaptive] Reset prix à:', defaultPrice);
    dispatch(addPrice(defaultPrice));
    setBathroom("");
    setBedroom("");
    setGarages("");
    setBuiltYear("");
    setAreaMin("");
    setAreaMax("");
    dispatch(resetAmenities());
    dispatch(addStatusType(""));
    dispatch(addFeatured(""));
    clearAdvanced();
    console.log('✅ [FilteringItemAdaptive] Tous les filtres ont été réinitialisés');
  };

  const clearAdvanced = () => {
    const changed = getAdvanced.map((item) => {
      item.isChecked = false;
      return item;
    });
    setAdvanced(changed);
  };

  const advancedHandler = (id) => {
    const data = getAdvanced.map((feature) => {
      if (feature.id === id) {
        if (feature.isChecked) {
          feature.isChecked = false;
        } else {
          feature.isChecked = true;
        }
      }
      return feature;
    });
    setAdvanced(data);
  };

  // Options pour les selects selon le type
  const statusOptions = dataType === "vehicles" 
    ? [
        { value: "", label: t('status.all') },
        { value: "available", label: tProperty('available') },
        { value: "rented", label: t('status.rented') },
        { value: "maintenance", label: t('status.maintenance') },
      ]
    : [
        { value: "", label: t('status.all') },
        { value: "available", label: tProperty('available') },
        { value: "rented", label: t('status.rented') },
        { value: "unavailable", label: tProperty('unavailable') },
      ];

  const typeOptions = dataType === "vehicles"
    ? [
        { value: "", label: t('type.all') },
        { value: "sedan", label: t('type.sedan') },
        { value: "suv", label: t('type.suv') },
        { value: "hatchback", label: t('type.hatchback') },
        { value: "coupe", label: t('type.coupe') },
        { value: "convertible", label: t('type.convertible') },
        { value: "van", label: t('type.van') },
      ]
    : [
        { value: "", label: t('type.all') },
        { value: "studio", label: t('type.studio') },
        { value: "apartment", label: tProperty('apartment') },
        { value: "villa", label: tProperty('villa') },
        { value: "house", label: tProperty('house') },
      ];

  return (
    <ul className="sasw_list mb0">
      {/* Keyword Search */}
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={t('keyword_placeholder')}
            value={getKeyword}
            onChange={(e) => {
              const newValue = e.target.value;
              console.log('✏️ [FilteringItemAdaptive] User input: keyword', { from: getKeyword, to: newValue });
              setKeyword(newValue);
            }}
          />
          <label>
            <span className="flaticon-magnifying-glass"></span>
          </label>
        </div>
      </li>

      {/* Location */}
      <li className="search_area">
        <div className="form-group mb-3">
          <input
            type="search"
            className="form-control"
            id="locationInput"
            placeholder={t('location_placeholder')}
            value={getLocation}
            onChange={(e) => {
              const newValue = e.target.value;
              console.log('✏️ [FilteringItemAdaptive] User input: location', { from: getLocation, to: newValue });
              setLocation(newValue);
            }}
          />
          <label htmlFor="locationInput">
            <span className="flaticon-maps-and-flags"></span>
          </label>
        </div>
      </li>

      {/* Status */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => {
                const newValue = e.target.value;
                console.log('✏️ [FilteringItemAdaptive] User select: status', { from: getStatus, to: newValue });
                setStatus(newValue);
              }}
              className="selectpicker w100 show-tick form-select"
              value={getStatus}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </li>

      {/* Type */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => {
                const newValue = e.target.value;
                console.log('✏️ [FilteringItemAdaptive] User select: propertyType', { from: getPropertiesType, to: newValue });
                setPropertiesType(newValue);
              }}
              className="selectpicker w100 show-tick form-select"
              value={getPropertiesType}
            >
              {typeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </li>

      {/* Price Range */}
      <li>
        <div className="small_dropdown2">
          <div
            id="prncgs2"
            className="btn dd_btn"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
          >
            <span>{t('price_range')}</span>
            <label htmlFor="prncgs2">
              <span className="fa fa-angle-down"></span>
            </label>
          </div>
          <div className="dd_content2 style2 dropdown-menu">
            <div className="pricing_acontent">
              {dataType === "vehicles" ? (
                <PricingRangeSlider 
                  min={10000} 
                  max={200000} 
                  defaultMin={15000} 
                  defaultMax={100000} 
                />
              ) : (
                <PricingRangeSlider 
                  min={20000} 
                  max={1000000} 
                  defaultMin={50000} 
                  defaultMax={500000} 
                />
              )}
            </div>
          </div>
        </div>
      </li>

      {/* Bathrooms - Only for apartments */}
      {dataType === "apartments" && (
        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('✏️ [FilteringItemAdaptive] User select: bathrooms', { from: getBathroom, to: newValue });
                  setBathroom(newValue);
                }}
                className="selectpicker w100 show-tick form-select"
                value={getBathroom}
              >
                <option value="">{t('bathrooms')}</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </li>
      )}

      {/* Bedrooms - Only for apartments */}
      {dataType === "apartments" && (
        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('✏️ [FilteringItemAdaptive] User select: bedrooms', { from: getBedroom, to: newValue });
                  setBedroom(newValue);
                }}
                className="selectpicker w100 show-tick form-select"
                value={getBedroom}
              >
                <option value="">{t('bedrooms')}</option>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </li>
      )}

      {/* Seats - Only for vehicles (using bedrooms field) */}
      {dataType === "vehicles" && (
        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('✏️ [FilteringItemAdaptive] User select: bedrooms', { from: getBedroom, to: newValue });
                  setBedroom(newValue);
                }}
                className="selectpicker w100 show-tick form-select"
                value={getBedroom}
              >
                <option value="">{tVehicles('seats')}</option>
                {[2, 4, 5, 7, 8].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </li>
      )}

      {/* Transmission - Only for vehicles (using garages field) */}
      {dataType === "vehicles" && (
        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('✏️ [FilteringItemAdaptive] User select: garages/transmission', { from: getGarages, to: newValue });
                  setGarages(newValue);
                }}
                className="selectpicker w100 show-tick form-select"
                value={getGarages}
              >
                <option value="">{tVehicles('transmission')}</option>
                <option value="automatic">{tVehicles('automatic')}</option>
                <option value="manual">{tVehicles('manual')}</option>
              </select>
            </div>
          </div>
        </li>
      )}

      {/* Year Built */}
      <li>
        <div className="search_option_two">
          <div className="candidate_revew_select">
            <select
              onChange={(e) => {
                const newValue = e.target.value;
                console.log('✏️ [FilteringItemAdaptive] User select: yearBuilt', { from: getBuiltYear, to: newValue });
                setBuiltYear(newValue);
              }}
              className="selectpicker w100 show-tick form-select"
              value={getBuiltYear}
            >
              <option value="">{t('year_built')}</option>
              {Array.from({ length: 12 }, (_, i) => 2013 + i).map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </li>

      {/* Area - Only for apartments */}
      {dataType === "apartments" && (
        <>
          <li className="min_area list-inline-item">
            <div className="form-group mb-4">
              <input
                type="number"
                className="form-control"
                id="minArea"
                placeholder={t('min_area')}
                value={getAreaMin}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('✏️ [FilteringItemAdaptive] User input: areaMin', { from: getAreaMin, to: newValue });
                  setAreaMin(newValue);
                }}
              />
            </div>
          </li>
          <li className="max_area list-inline-item">
            <div className="form-group mb-4">
              <input
                type="number"
                className="form-control"
                id="maxArea"
                placeholder={t('max_area')}
                value={getAreaMax}
                onChange={(e) => {
                  const newValue = e.target.value;
                  console.log('✏️ [FilteringItemAdaptive] User input: areaMax', { from: getAreaMax, to: newValue });
                  setAreaMax(newValue);
                }}
              />
            </div>
          </li>
        </>
      )}

      {/* Advanced Features */}
      <li>
        <div id="accordion" className="panel-group">
          <div className="panel">
            <div className="panel-heading">
              <h4 className="panel-title">
                <a
                  href="#panelBodyRating"
                  className="accordion-toggle link"
                  data-bs-toggle="collapse"
                  data-bs-parent="#accordion"
                >
                  <i className="flaticon-more"></i> {t('advanced_features')}
                </a>
              </h4>
            </div>
            <div id="panelBodyRating" className="panel-collapse collapse">
              <div className="panel-body row">
                <div className="col-lg-12">
                  <ul className="ui_kit_checkbox selectable-list fn-400">
                    {getAdvanced?.map((feature) => (
                      <li key={feature.id}>
                        <div className="form-check custom-checkbox">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id={feature.id}
                            value={feature.name}
                            checked={feature.isChecked || false}
                            onChange={(e) => {
                              const value = e.target.value;
                              console.log('✏️ [FilteringItemAdaptive] User checkbox: amenity', { feature: feature.id, value, checked: e.target.checked });
                              dispatch(addAmenities(value));
                            }}
                            onClick={() => {
                              console.log('✏️ [FilteringItemAdaptive] User click: amenity toggle', feature.id);
                              advancedHandler(feature.id);
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={feature.id}
                          >
                            {feature.name}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>

      {/* Clear Filters Button */}
      <li>
        <div className="search_option_button">
          <button
            onClick={clearAllFilters}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            {t('clear_filters')}
          </button>
        </div>
      </li>
    </ul>
  );
};

export default FilteringItemAdaptive;
