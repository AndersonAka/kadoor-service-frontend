'use client';

import Image from 'next/image';
import HeaderTailwind from "../common/header/HeaderTailwind";
import FooterTailwind from "../common/footer/FooterTailwind";
import PopupSignInUp from "../common/PopupSignInUp";
import BookingsContent from "./BookingsContent";
import FeaturedListings from "../common/listing/FeaturedListings";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

const Bookings = () => {
  const t = useTranslations('Bookings');
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Hero */}
      <section className="pt-28 pb-12 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
            alt="Bookings background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0"></div>
        </div>
        <div className="container-kadoor text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("page_title") || "Mes Réservations"}</h1>
          <p className="text-xl text-gray-300">Suivez et gérez vos réservations</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="container-kadoor">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <BookingsContent />
            </div>
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Vus récemment</h4>
                <FeaturedListings />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default Bookings;
