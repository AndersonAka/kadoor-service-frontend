'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import HeaderTailwind from "../common/header/HeaderTailwind";
import FooterTailwind from "../common/footer/FooterTailwind";
import PopupSignInUp from "../common/PopupSignInUp";
import AddressSidebar from "./AddressSidebar";
import IncidentForm from "./IncidentForm";

// Import LeafletMap dynamically to avoid SSR issues and Strict Mode conflicts
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

const ContactPage = () => {
  const t = useTranslations('ContactPage');

  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Hero Section */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80&sat=-100"
            alt="Contact background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 "></div>
        </div>
        <div className="container-kadoor text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('page_title')}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-kadoor">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Form */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('title')}</h2>
                  <p className="text-gray-600">{t('description')}</p>
                </div>
                
                <div className="bg-gradient-to-r from-primary/5 to-amber-500/5 border-l-4 border-primary rounded-lg p-4 mb-8">
                  <h3 className="font-semibold text-primary flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t('form_title')}
                  </h3>
                </div>
                
                <IncidentForm />
              </div>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-96 flex-shrink-0">
              <AddressSidebar />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <LeafletMap />
      </section>

      <FooterTailwind />
    </>
  );
};

export default ContactPage;
