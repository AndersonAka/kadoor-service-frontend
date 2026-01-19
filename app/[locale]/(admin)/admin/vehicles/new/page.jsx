'use client';

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/common/header/dashboard/Header";
import SidebarMenu from "@/components/common/header/dashboard/SidebarMenu";
import MobileMenu from "@/components/common/header/MobileMenu";
import VehicleForm from "@/components/dashboard/admin-vehicles/VehicleForm";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const NewVehiclePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations('Admin');

  useEffect(() => {
    if (!loading && user && user.role === 'USER') {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  if (user && user.role === 'USER') {
    return null;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (user && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
    return (
      <>
        <Header />
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

        <section className="our-dashbord dashbord bgc-f7 pb50">
          <div className="container-fluid ovh">
            <div className="row">
              <div className="col-lg-12 maxw100flex-992">
                <div className="row">
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

                  <div className="col-lg-12 mb10">
                    <div className="breadcrumb_content style2">
                      <h2 className="breadcrumb_title">{t('add_vehicle') || "Ajouter un véhicule"}</h2>
                      <Link href="/admin/vehicles" className="btn btn-thm-outline">
                        <i className="fa fa-arrow-left me-2"></i>
                        {t('back_to_list') || "Retour à la liste"}
                      </Link>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="my_dashboard_review mb40">
                      <VehicleForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  return null;
};

export default NewVehiclePage;
