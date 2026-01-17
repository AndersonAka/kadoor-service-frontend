'use client';

import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import SocialMedia from "./SocialMedia";
import { useTranslations } from "next-intl";

const index = () => {
  const t = useTranslations('Admin');

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> {t('navigation') || "Navigation"}
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">{t('my_profile') || "Mon Profil"}</h2>
                    <p>{t('profile_welcome') || "Bienvenue sur votre page de profil"}</p>
                  </div>
                </div>
                {/* End .col */}

                <div className="col-lg-12">
                  <div className="my_dashboard_review">
                    <div className="row">
                      <div className="col-xl-2">
                        <h4>{t('profile_information') || "Informations du Profil"}</h4>
                      </div>
                      <div className="col-xl-10">
                        <ProfileInfo />
                      </div>
                    </div>
                  </div>
                  {/* End profile info wrapper end */}

                  <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-xl-2">
                        <h4>{t('change_password') || "Changer le mot de passe"}</h4>
                      </div>
                      <div className="col-xl-10">
                        <ChangePassword />
                      </div>
                    </div>
                  </div>
                  {/* End change password */}
                </div>
              </div>
              {/* End .row */}

              <div className="row mt50">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>© {new Date().getFullYear()} KADOOR SERVICE. Tous droits réservés.</p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default index;
