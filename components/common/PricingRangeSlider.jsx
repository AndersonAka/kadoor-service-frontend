"use client";

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import { useDispatch, useSelector } from "react-redux";
import { addPrice } from "../../features/properties/propertiesSlice";
import { useCurrency } from "@/context/CurrencyContext";

const RangeSlider = ({ min = 10000, max = 500000, defaultMin = 10000, defaultMax = 200000 }) => {
  const dispatch = useDispatch();
  const { formatPrice } = useCurrency();
  const { price: storePrice } = useSelector((state) => state.properties);
  
  // Initialiser avec les valeurs du store si elles existent, sinon utiliser les valeurs par défaut
  const initialMin = storePrice?.min && storePrice.min > 0 ? storePrice.min : defaultMin;
  const initialMax = storePrice?.max && storePrice.max > 0 ? storePrice.max : defaultMax;
  
  const [price, setPrice] = useState([initialMin, initialMax]);

  // Mettre à jour le state local si le store change (uniquement au montage)
  useEffect(() => {
    if (storePrice?.min && storePrice?.max && storePrice.min > 0 && storePrice.max > 0) {
      setPrice([storePrice.min, storePrice.max]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Uniquement au montage pour éviter les boucles

  // Mettre à jour le store quand le prix change
  useEffect(() => {
    dispatch(
      addPrice({
        min: price[0],
        max: price[1],
      })
    );
  }, [dispatch, price]);

  return (
    <div className="nft__filter-price tp-range-slider tp-range-slider-dark mb-20">
      <div className="nft__filter-price-inner d-flex align-items-center justify-content-between">
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>{formatPrice(price[0])}</span>
          </div>
        </div>
        <div className="nft__filter-price-box">
          <div className="d-flex align-items-center">
            <span>{formatPrice(price[1])}</span>
          </div>
        </div>
      </div>

      <Slider max={max} min={min} range value={price} onChange={setPrice} />

      <div className="slider-styled inside-slider" id="nft-slider"></div>
    </div>
  );
};

export default RangeSlider;
