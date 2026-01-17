import CallToAction from "@/components/common/CallToAction";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import Footer from "@/components/common/footer/Footer";
import Header from "@/components/home-10/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import BreadCrumbBanner from "@/components/privacy-policy/BreadCrumbBanner";
import PrivacyPolicyContent from "@/components/privacy-policy/PrivacyPolicyContent";

export const metadata = {
  title: "Politique de Confidentialité | KADOOR SERVICE",
  description: "Politique de confidentialité de KADOOR SERVICE",
};

const PrivacyPolicyPage = () => {
  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Inner Page Breadcrumb --> */}
      <BreadCrumbBanner title="Politique de Confidentialité" />

      {/* <!-- Privacy Policy Content --> */}
      <section className="our-terms bgc-f7">
        <div className="container">
          <PrivacyPolicyContent />
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

export default PrivacyPolicyPage;
