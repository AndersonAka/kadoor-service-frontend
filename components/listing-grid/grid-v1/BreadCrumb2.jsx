'use client'

import BreadCrumb from "../../common/BreadCrumb";
import { useTranslations } from "next-intl";
import Image from "next/image";

const BreadCrumb2 = ({ dataType = "properties" }) => {
  const tNav = useTranslations("Navigation");
  const tVehicles = useTranslations("VehiclesPage");

  if (dataType === "vehicles") {
    return (
      <>
        {/* Hero Section */}
        <div className="listing-hero-section">
          <div className="breadcrumb_content style2 mb20">
            <BreadCrumb title={tNav("vehicles")} />
          </div>
          
          {/* <div className="hero-content-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="hero-text-content">
                  <h1 className="hero-title mb20">{tVehicles("page_title")}</h1>
                  <h3 className="hero-subtitle mb15">{tVehicles("hero_title")}</h3>
                  <p className="hero-description mb25">
                    {tVehicles("hero_description")}
                  </p>
                  <div className="hero-features">
                    <div className="row">
                      <div className="col-md-6 col-lg-4">
                        <div className="feature-item d-flex align-items-center mb15">
                          <span className="flaticon-transfer feature-icon" style={{ fontSize: '24px', color: '#1967d2', marginRight: '10px' }}></span>
                          <span>{tVehicles("feature_1")}</span>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="feature-item d-flex align-items-center mb15">
                          <span className="flaticon-transfer-1 feature-icon" style={{ fontSize: '24px', color: '#1967d2', marginRight: '10px' }}></span>
                          <span>{tVehicles("feature_2")}</span>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="feature-item d-flex align-items-center mb15">
                          <span className="flaticon-tick feature-icon" style={{ fontSize: '24px', color: '#1967d2', marginRight: '10px' }}></span>
                          <span>{tVehicles("feature_3")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="hero-image text-center">
                  <Image
                    src="/assets/images/services/mercedes.png"
                    alt={tVehicles("image_alt")}
                    width={450}
                    height={320}
                    className="img-fluid"
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </>
    );
  }

  return (
    <div className="breadcrumb_content style2">
      <BreadCrumb title="Simple Listing – Grid V1" />
      <h2 className="breadcrumb_title">Simple Listing – Grid View</h2>
    </div>
  );
};

export default BreadCrumb2;
