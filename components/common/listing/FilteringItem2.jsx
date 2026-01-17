'use client'

import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStatusType } from "../../../features/filter/filterSlice";
import {
  addAmenities,
  addBathrooms,
  addBedrooms,
  addStatus,
  addYearBuilt,
  resetAmenities,
} from "../../../features/properties/propertiesSlice";
import { v4 as uuidv4 } from "uuid";


const FilteringItem2 = () => {
  const { status, bathrooms, bedrooms, yearBuilt } = useSelector(
    (state) => state.properties
  );

  // input state
  const [getStatus, setStatus] = useState(status);
  const [getBathroom, setBathroom] = useState(bathrooms);
  const [getBedroom, setBedroom] = useState(bedrooms);
  const [getBuiltYear, setBuiltYear] = useState(yearBuilt);

  // advanced state
  const [getAdvanced, setAdvanced] = useState([
    { id: "air-conditioning", name: "Air Conditioning" },
    { id: "barbeque", name: "Barbeque" },
    { id: "gym", name: "Gym" },
    { id: "microwave", name: "Microwave" },
    { id: "tv-cable", name: "TV Cable" },
    { id: "lawn", name: "Lawn" },
    { id: "refrigerator", name: "Refrigerator" },
    { id: "swimming-pool", name: "Swimming Pool" },
    { id: "wifi", name: "WiFi" },
    { id: "sauna", name: "Sauna" },
    { id: "dryer", name: "Dryer" },
    { id: "washer", name: "Washer" },
    { id: "laundry", name: "Laundry" },
    { id: "outdoor-shower", name: "Outdoor Shower" },
    { id: "window-coverings", name: "Window Coverings" },
  ]);

  const dispatch = useDispatch();



  // status
  useEffect(() => {
    dispatch(addStatus(getStatus));
  }, [dispatch, getStatus]);

  // bathroom
  useEffect(() => {
    dispatch(addBathrooms(getBathroom));
  }, [dispatch, getBathroom]);

  // bedroom
  useEffect(() => {
    dispatch(addBedrooms(getBedroom));
  }, [dispatch, getBedroom]);

  // built years
  useEffect(() => {
    dispatch(addYearBuilt(getBuiltYear));
  }, [dispatch, getBuiltYear]);

  // clear filter
  const clearHandler = () => {
    clearAllFilters();
  };

  const clearAllFilters = () => {
    setStatus("");
    setBathroom("");
    setBedroom("");
    setBuiltYear("");
    dispatch(resetAmenities());
    dispatch(addStatusType(""));
    clearAdvanced();
  };

  // clear advanced
  const clearAdvanced = () => {
    const changed = getAdvanced.map((item) => {
      item.isChecked = false;
      return item;
    });
    setAdvanced(changed);
  };

  // add advanced
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

  return (
    <>
      <ul className="sasw_list mb0 ">
        <li>
          <div className="panel-body row">
            <div className="col-lg-12">
              <ul className="ui_kit_checkbox selectable-list ui_kit_2 fn-400">
                {getAdvanced?.map((feature) => (
                  <li key={feature.id}>
                    <div className="form-check custom-checkbox">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={feature.id}
                        value={feature.name}
                        checked={feature.isChecked || false}
                        onChange={(e) => dispatch(addAmenities(e.target.value))}
                        onClick={() => advancedHandler(feature.id)}
                      />
                      <label className="form-check-label" htmlFor={feature.id}>
                        {feature.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </li>
        {/* End li */}
      </ul>

      <ul className="botoom-filter apeartment_area_list style-2">
        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => setStatus(e.target.value)}
                className="selectpicker w100 show-tick form-select"
                value={getStatus}
              >
                <option value="">Status</option>
                <option value="apartment">Apartment</option>
                <option value="bungalow">Bungalow</option>
                <option value="condo">Condo</option>
                <option value="house">House</option>
                <option value="land">Land</option>
                <option value="single family">Single Family</option>
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => setBathroom(e.target.value)}
                className="selectpicker w100 show-tick form-select"
                value={getBathroom}
              >
                <option value="">Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => setBedroom(e.target.value)}
                className="selectpicker w100 show-tick form-select"
                value={getBedroom}
              >
                <option value="">Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
          </div>
        </li>
        {/* End li */}

        <li>
          <div className="search_option_two">
            <div className="candidate_revew_select">
              <select
                onChange={(e) => setBuiltYear(e.target.value)}
                className="selectpicker w100 show-tick form-select"
                value={getBuiltYear}
              >
                <option value="">Year built</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
              </select>
            </div>
          </div>
        </li>
        {/* End li */}
      </ul>

      <li className="w-100">
        <div className="search_option_button">
          <button
            onClick={clearHandler}
            type="button"
            className="btn btn-block btn-thm w-100"
          >
            Clear Filters
          </button>
        </div>
      </li>
      {/* End li */}
    </>
  );
};

export default FilteringItem2;
