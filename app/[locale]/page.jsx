import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChoose from "@/components/common/WhyChoose";
import TestimonialSection from "@/components/common/TestimonialSection";
import Partners from "@/components/common/Partners";
import CallToAction from "@/components/common/CallToAction";
import Footer from "@/components/common/footer/Footer";
import CopyrightFooter from "@/components/common/footer/CopyrightFooter";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import Wrapper from "@/components/layout/Wrapper";
import Header from "@/components/home-10/Header";
import MobileMenu from "@/components/common/header/MobileMenu";
import HeroSlider from "@/components/home/HeroSlider";
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

const Home = () => {
  const t = useTranslations('HomePage');

  return (
    <Wrapper>
      {/* <!-- Main Header Nav --> */}
      <Header />

      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- 10th Home Slider (Integrated Search) --> */}
      <div className="home10-mainslider">
        <div className="main-banner-wrapper home10">
          <div className="banner-style-one home10-banner-style arrow-style-2">
            <HeroSlider />
          </div>
        </div>
        {/* <!-- /.main-banner-wrapper --> */}
      </div>

      {/* <!-- Feature Properties (Véhicules & Appartements) --> */}
      <section id="feature-property" className="feature-property bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb40">
                <h2>{t('services_title')}</h2>
                <p>{t('services_subtitle')}</p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="feature_property_slider gutter-x15">
                <FeaturedProperties />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Why Chose Us --> */}
      <section id="why-chose" className="whychose_us bgc-f7 pb30">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>{t('why_choose_title')}</h2>
                <p>{t('why_choose_subtitle')}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <WhyChoose style="home10" />
          </div>
        </div>
      </section>

      {/* <!-- Our Testimonials --> */}
      <TestimonialSection />

      {/* <!-- Our Partners --> */}
      {/* <section id="our-partners" className="our-partners">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center">
                <h2>{t('partners_title')}</h2>
                <p>{t('partners_subtitle')}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <Partners />
          </div>
        </div>
      </section> */}

      {/* <!-- Start Call to Action --> */}
      {/* <section className="start-partners bgc-thm pt50 pb50">
        <div className="container">
          <CallToAction />
        </div>
      </section> */}

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
    </Wrapper>
  );
};

export default Home;
