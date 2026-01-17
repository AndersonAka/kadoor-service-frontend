import CopyrightFooter from "../../common/footer/CopyrightFooter";
import Footer from "../../common/footer/Footer";
import Header from "../../home-10/Header";
import MobileMenu from "../../common/header/MobileMenu";
import FilterTopBar from "../../common/listing/FilterTopBar";
import GridListButton from "../../common/listing/GridListButton";
import ShowFilter from "../../common/listing/ShowFilter";
import SidebarListingUnified from "../../common/listing/SidebarListingUnified";
import OffcanvasSidebar from "../../common/listing/OffcanvasSidebar";
import PopupSignInUp from "../../common/PopupSignInUp";
import FeaturedItem from "./FeaturedItem";
import BreadCrumb2 from "./BreadCrumb2";
import Wrapper from "../../layout/Wrapper";

const index = ({ dataType = "properties" }) => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Listing Grid View --> */}
      <section className="our-listing bgc-f7 pb30-991 mt85 md-mt0">
        <div className="container">
          {/* BreadCrumb Section */}
          <BreadCrumb2 dataType={dataType} />

          <div className="row">
            <div className="col-lg-4 col-xl-4">
              <div className="sidebar-listing-wrapper">
                <SidebarListingUnified dataType={dataType} />
              </div>
              {/* End SidebarListing */}

              <OffcanvasSidebar dataType={dataType} />
              {/* End mobile sidebar listing  */}
            </div>
            {/* End sidebar conent */}

            <div className="col-md-12 col-lg-8">
              <div className="grid_list_search_result">
                <div className="row align-items-center">
                  <div className="col-sm-12 col-md-12 col-lg-3 col-xl-3">
                    <div className="listing_list_style mb20-xsd tal-991">
                      <GridListButton />
                    </div>
                    {/* End list grid */}
                  </div>
                  {/* End .col GridListButton */}

                  <div className="dn db-991 mt30 mb0">
                    <ShowFilter />
                  </div>
                  {/* ENd button for mobile sidebar show  */}

                  <FilterTopBar />
                </div>
              </div>
              {/* End .row */}

              <div className="row mt20">
                <FeaturedItem dataType={dataType} />
              </div>
              {/* End .row - Pagination gérée dans FeaturedItem */}
            </div>
            {/* End  page conent */}
          </div>
          {/* End .row */}
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
