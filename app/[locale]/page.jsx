import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyChoose from "@/components/common/WhyChoose";
import TestimonialSection from "@/components/common/TestimonialSection";
import FooterTailwind from "@/components/common/footer/FooterTailwind";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import Wrapper from "@/components/layout/Wrapper";
import HeaderTailwind from "@/components/common/header/HeaderTailwind";
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
      <HeaderTailwind />

      {/* <!-- Modal --> */}
      <PopupSignInUp />

      {/* <!-- Hero Slider --> */}
      <div className="pt-20">
        <HeroSlider />
      </div>

      {/* <!-- Services Section --> */}
      <section id="services" className="py-16 md:py-8 bg-gray-50">
        <div className="container-kadoor">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('services_title')}</h2>
            <p className="section-subtitle max-w-2xl mx-auto">{t('services_subtitle')}</p>
          </div>
          <FeaturedProperties />
        </div>
      </section>

      {/* <!-- Why Choose Us --> */}
      <section id="why-choose" className="pb-16 md:pb-16 bg-gray-50">
        <div className="container-kadoor">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('why_choose_title')}</h2>
            <p className="section-subtitle max-w-2xl mx-auto">{t('why_choose_subtitle')}</p>
          </div>
          <WhyChoose style="home10" />
        </div>
      </section>

      {/* <!-- Testimonials --> */}
      <TestimonialSection />

      {/* <!-- Footer --> */}
      <FooterTailwind />
    </Wrapper>
  );
};

export default Home;
