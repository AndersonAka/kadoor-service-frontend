'use client';

import Image from 'next/image';
import HeaderTailwind from "../common/header/HeaderTailwind";
import FooterTailwind from "../common/footer/FooterTailwind";
import PopupSignInUp from "../common/PopupSignInUp";
import ProfileContent from "./ProfileContent";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

const Profile = () => {
  const t = useTranslations('Profile');
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
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80"
            alt="Profile background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute "></div>
        </div>
        <div className="container-kadoor text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("page_title") || "Mon Profil"}</h1>
          <p className="text-xl text-gray-300">Gérez vos informations personnelles</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="container-kadoor">
          <ProfileContent />
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default Profile;
