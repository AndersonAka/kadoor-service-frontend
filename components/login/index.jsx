'use client'

import HeaderTailwind from "../common/header/HeaderTailwind";
import FooterTailwind from "../common/footer/FooterTailwind";
import PopupSignInUp from "../common/PopupSignInUp";
import Form from "./Form";
import Image from "next/image";
import { useTranslations } from "next-intl";

const index = () => {
  const t = useTranslations('LoginPage');

  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Login Section */}
      <section className="pt-28 pb-16 min-h-screen bg-gray-50">
        <div className="container-kadoor">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            {/* Image */}
            <div className="hidden lg:block flex-1">
              <div className="relative h-[550px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/assets/images/resource/login-img.png"
                  alt={t("image_alt") || "Connexion"}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h2 className="text-2xl font-bold mb-2">KADOOR SERVICE</h2>
                  <p className="text-white/80">Votre partenaire de confiance pour la location premium</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="w-full lg:flex-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
                <Form />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default index;
