'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import HeaderTailwind from "../common/header/HeaderTailwind";
import FooterTailwind from "../common/footer/FooterTailwind";
import PopupSignInUp from "../common/PopupSignInUp";
import WhyChoose from "../common/WhyChoose";

const AboutUs = () => {
  const t = useTranslations('AboutPage');

  const values = [
    { icon: '🎯', title: 'Excellence', desc: 'Nous visons l\'excellence dans chaque service' },
    { icon: '🤝', title: 'Confiance', desc: 'La confiance est au cœur de notre relation client' },
    { icon: '💡', title: 'Innovation', desc: 'Nous innovons pour mieux vous servir' },
    { icon: '❤️', title: 'Passion', desc: 'Passionnés par ce que nous faisons' },
  ];

  const stats = [
    { number: '500+', label: 'Clients satisfaits' },
    { number: '150+', label: 'Véhicules' },
    { number: '50+', label: 'Appartements' },
    { number: '5+', label: 'Années d\'expérience' },
  ];

  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Hero Section */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="About us background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 "></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-amber-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container-kadoor text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('hero_title') || 'À propos de KADOOR SERVICE'}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('hero_description') || 'Votre partenaire de confiance pour la location de véhicules et d\'appartements de qualité en Côte d\'Ivoire.'}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="container-kadoor">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <span className="text-primary font-semibold uppercase tracking-wider text-sm">Notre Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                {t('mission_title') || 'Rendre le premium accessible'}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {t('mission_description') || 'Chez KADOOR SERVICE, nous croyons que chacun mérite d\'accéder à des services de qualité. Notre mission est de démocratiser l\'accès aux véhicules de luxe et aux appartements haut de gamme.'}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t('mission_detail') || 'Que vous ayez besoin d\'un véhicule pour un événement spécial ou d\'un appartement pour un séjour confortable, nous sommes là pour répondre à vos besoins avec professionnalisme et excellence.'}
              </p>
            </div>
            <div className="flex-1 relative">
              <div className="relative h-96  overflow-hidden ">
                <Image
                  src="/assets/images/logo_kadoor_service.png"
                  alt="Notre Mission"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 "></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-lg">
                <p className="text-4xl font-bold">5+</p>
                <p className="text-sm">Années d'excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-kadoor">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('values_title') || 'Nos Valeurs'}</h2>
            <p className="section-subtitle max-w-2xl mx-auto">{t('values_subtitle') || 'Les principes qui guident chacune de nos actions'}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white  p-8 text-center shadow-md hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-700">
        <div className="container-kadoor">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container-kadoor">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('why_choose_title') || 'Pourquoi nous choisir ?'}</h2>
            <p className="section-subtitle max-w-2xl mx-auto">{t('why_choose_subtitle') || 'Un service complet à chaque étape'}</p>
          </div>
          <WhyChoose />
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default AboutUs;
