'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import HeaderTailwind from '@/components/common/header/HeaderTailwind';
import FooterTailwind from '@/components/common/footer/FooterTailwind';
import PopupSignInUp from '@/components/common/PopupSignInUp';
import { formatPrice } from '@/utils/currency';

const GiftsListing = () => {
  const t = useTranslations('GiftsPage');

  const gifts = [
    {
      id: '1',
      title: 'Chèque Cadeau Bronze',
      description: 'Offrez une expérience unique avec notre chèque cadeau Bronze',
      value: 50000,
      image: '/assets/images/services/gift_bronze.png',
      color: 'from-amber-600 to-amber-800',
      features: ['Valable 1 an', 'Véhicules & Appartements', 'Personnalisable'],
    },
    {
      id: '2',
      title: 'Chèque Cadeau Silver',
      description: 'Le cadeau parfait pour vos proches avec plus de possibilités',
      value: 100000,
      image: '/assets/images/services/gift_silver.png',
      color: 'from-gray-400 to-gray-600',
      features: ['Valable 1 an', 'Tous services', 'Personnalisable', 'Livraison offerte'],
    },
    {
      id: '3',
      title: 'Chèque Cadeau Gold',
      description: 'L\'expérience premium pour des moments inoubliables',
      value: 200000,
      image: '/assets/images/services/gift_gold.png',
      color: 'from-yellow-500 to-yellow-700',
      features: ['Valable 2 ans', 'Accès VIP', 'Conciergerie dédiée', 'Personnalisation luxe'],
    },
    {
      id: '4',
      title: 'Chèque Cadeau Platinum',
      description: 'Le summum du luxe et de l\'exclusivité',
      value: 500000,
      image: '/assets/images/services/gift_platinum.png',
      color: 'from-slate-700 to-slate-900',
      features: ['Valable 3 ans', 'Services exclusifs', 'Chauffeur privé', 'Expériences sur mesure'],
    },
  ];

  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1920&q=80"
            alt="Gifts background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-700/85 to-amber-600/80"></div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 border-4 border-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 border-4 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="container-kadoor text-center relative z-10">
          <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
            🎁 {t('badge') || 'Faites plaisir à vos proches'}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t('hero_title') || 'Chèques Cadeaux'}
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t('hero_description') || 'Offrez une expérience unique avec nos chèques cadeaux personnalisables'}
          </p>
        </div>
      </section>

      {/* Gifts Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-kadoor">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {gifts.map((gift) => (
              <Link key={gift.id} href={`/gift-details/${gift.id}`} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Card Header with Gradient */}
                  <div className={`relative h-48 bg-gradient-to-r ${gift.color} p-6 flex items-center justify-between`}>
                    <div className="text-white">
                      <h3 className="text-2xl font-bold mb-2">{gift.title}</h3>
                      <p className="text-4xl font-bold">
                        {formatPrice(gift.value)}
                      </p>
                    </div>
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-6xl">🎁</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-gray-600 mb-6">{gift.description}</p>
                    
                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {gift.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-700">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                      {t('choose_gift') || 'Choisir ce cadeau'}
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Custom Amount Section */}
          <div className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('custom_title') || 'Montant personnalisé'}
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('custom_description') || 'Vous souhaitez offrir un montant spécifique ? Créez votre chèque cadeau sur mesure.'}
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              {t('contact_us') || 'Nous contacter'}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-kadoor">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('how_it_works') || 'Comment ça marche ?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Choisissez', desc: 'Sélectionnez le montant qui vous convient' },
              { icon: '✍️', title: 'Personnalisez', desc: 'Ajoutez un message personnel' },
              { icon: '🎉', title: 'Offrez', desc: 'Envoyez par email ou imprimez' },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">{step.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default GiftsListing;
