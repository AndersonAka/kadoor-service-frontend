import Image from 'next/image';
import HeaderTailwind from "../common/header/HeaderTailwind";
import FooterTailwind from "../common/footer/FooterTailwind";
import PopupSignInUp from "../common/PopupSignInUp";
import TermsCondions from "./TermsCondions";

const index = () => {
  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&q=80&sat=-100"
            alt="Terms background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 "></div>
        </div>
        <div className="container-kadoor text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Conditions Générales</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Conditions d&apos;utilisation de nos services</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="container-kadoor">
          <TermsCondions />
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default index;
