import HeaderTailwind from "@/components/common/header/HeaderTailwind";
import FooterTailwind from "@/components/common/footer/FooterTailwind";
import PopupSignInUp from "@/components/common/PopupSignInUp";
import PrivacyPolicyContent from "@/components/privacy-policy/PrivacyPolicyContent";

export const metadata = {
  title: "Politique de Confidentialité | KADOOR SERVICE",
  description: "Politique de confidentialité de KADOOR SERVICE",
};

const PrivacyPolicyPage = () => {
  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-primary/20">
        <div className="container-kadoor text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Politique de Confidentialité</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Protection de vos données personnelles</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="container-kadoor">
          <PrivacyPolicyContent />
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default PrivacyPolicyPage;
