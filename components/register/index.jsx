'use client'

import CopyrightFooter from "../common/footer/CopyrightFooter";
import Footer from "../common/footer/Footer";
import Header from "../home-10/Header";
import MobileMenu from "../common/header/MobileMenu";
import PopupSignInUp from "../common/PopupSignInUp";
import Form from "./Form";
import Image from "next/image";
import { useTranslations } from "next-intl";
import BreadCrumb from "../common/BreadCrumb";

const index = () => {
  const t = useTranslations('RegisterPage');

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumb title={t("page_title")} />

      {/* <!-- Our LogIn Register --> */}
      <section className="our-log bgc-fa mt85">
        <div className="container">
          <div className="row align-items-center">
            {/* Image illustrative */}
            <div className="col-lg-6 col-xl-6 d-none d-lg-block">
              <div className="regstr_thumb">
                <Image
                  src="/assets/images/resource/register-img.jpg"
                  alt={t("image_alt") || "Inscription"}
                  width={600}
                  height={800}
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: 'cover', borderRadius: '12px' }}
                  priority
                />
              </div>
            </div>
            {/* End image column */}

            {/* Formulaire */}
            <div className="col-sm-12 col-lg-6 col-xl-6">
              <div className="login_form inner_page">
                <Form />
              </div>
            </div>
            {/* End form column */}
          </div>
        </div>
      </section>

      {/* <!-- Our Footer --> */}
      <section className="footer_one">
        <div className="container">
          <div className="row">
            <Footer />
          </div>
        </div>
      </section>

      {/* <!-- Our Footer Bottom Area --> */}
      <section className="footer_middle_area pt40 pb40">
        <div className="container">
          <CopyrightFooter />
        </div>
      </section>
    </>
  );
};

export default index;
