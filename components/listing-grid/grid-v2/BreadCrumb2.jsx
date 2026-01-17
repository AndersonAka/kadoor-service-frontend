'use client'

import BreadCrumb from "../../common/BreadCrumb";
import { useTranslations } from "next-intl";
import Image from "next/image";

const BreadCrumb2 = ({ dataType = "properties" }) => {
  const tNav = useTranslations("Navigation");
  const tApartments = useTranslations("ApartmentsPage");

  if (dataType === "apartments") {
    return (
      <>
        {/* Hero Section */}
        <div className="listing-hero-section">
          <div className="breadcrumb_content style2 mb20">
            <BreadCrumb title={tNav("apartments")} />
          </div>
{/*           
          <div className="hero-content-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-7">
                <div className="hero-text-content">
                  <h1 className="hero-title mb20">{tApartments("page_title")}</h1>
                  <h3 className="hero-subtitle mb15">{tApartments("hero_title")}</h3>
                  <p className="hero-description mb25">
                    {tApartments("hero_description")}
                  </p>
                  <div className="hero-features">
                    <div className="row">
                      <div className="col-md-6 col-lg-4">
                        <div className="feature-item d-flex align-items-center mb15">
                          <span className="flaticon-home feature-icon" style={{ fontSize: '24px', color: '#1967d2', marginRight: '10px' }}></span>
                          <span>{tApartments("feature_1")}</span>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="feature-item d-flex align-items-center mb15">
                          <span className="flaticon-building feature-icon" style={{ fontSize: '24px', color: '#1967d2', marginRight: '10px' }}></span>
                          <span>{tApartments("feature_2")}</span>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4">
                        <div className="feature-item d-flex align-items-center mb15">
                          <span className="flaticon-tick feature-icon" style={{ fontSize: '24px', color: '#1967d2', marginRight: '10px' }}></span>
                          <span>{tApartments("feature_3")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="hero-image text-center">
                  <Image
                    src="/assets/images/services/apartment_luxury.png"
                    alt={tApartments("image_alt")}
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
      <BreadCrumb title="Simple Listing – Grid V2" />
      <h2 className="breadcrumb_title">Simple Listing – Grid View 2</h2>
    </div>
  );
};

export default BreadCrumb2;
