'use client';

import Image from "next/image";
import { useTranslations } from 'next-intl';
import CallToAction from "../common/CallToAction";
import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../home-10/Header";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import AddressSidebar from "./AddressSidebar";
import BreadCrumbBanner from "./BreadCrumbBanner";
import IncidentForm from "./IncidentForm";
import BreadCrumb from "../common/BreadCrumb";

const index = () => {
  const t = useTranslations('ContactPage');

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumb title={t('page_title')} />

      {/* <!-- Our Contact --> */}
      <section className="our-contact pb0 bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-xl-8">
              <div className="form_grid">
                <div className="text-center mb-4">
                  <i className="flaticon-warning text-thm mb-3" style={{ fontSize: '3rem', color: '#b91c1c' }}></i>
                  <h4 className="mb-3 fw-bold" style={{ color: '#b91c1c' }}>{t('title')}</h4>
                  <p className="text-muted mb-0">{t('subtitle')}</p>
                </div>
                <p className="mb-4">
                  {t('description')}
                </p>
                <div 
                  className="p-4 rounded mb-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(185, 28, 28, 0.05) 0%, rgba(212, 175, 55, 0.05) 100%)',
                    borderLeft: '4px solid #b91c1c'
                  }}
                >
                  <h5 className="fw-bold mb-3" style={{ color: '#b91c1c' }}>
                    <i className="flaticon-file me-2"></i>
                    {t('form_title')}
                  </h5>
                </div>
                <IncidentForm />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-5 col-xl-4">
              <AddressSidebar />
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}

        <div className="container-fluid p0 mt50">
          <div className="row">
            <div className="col-lg-12">
              <div className="h600" id="map-canvas">
                <div className="gmap_canvas pe-none">
                  <iframe
                    title="map"
                    className="gmap_iframe"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193309.02147838814!2d-74.53513266718751!3d40.79602810000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1663993365939!5m2!1sen!2sbd"
                  ></iframe>
                  {/* End iframe */}

                  <Image
                    width={32}
                    height={50}
                    className="location-finder"
                    src="/assets/images/location.png"
                    alt="location"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Start Call to Action --> */}
      <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one bgc-dark8">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40 bgc-dark8 border-top-dark">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
