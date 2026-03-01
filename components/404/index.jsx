import HeaderTailwind from "../common/header/HeaderTailwind";
import FooterTailwind from "../common/footer/FooterTailwind";
import PopupSignInUp from "../common/PopupSignInUp";
import ErrorPageContent from "./ErrorPageContent";

const index = () => {
  return (
    <>
      <HeaderTailwind />
      <PopupSignInUp />

      <section className="pt-28 pb-20 min-h-[70vh] flex items-center bg-gray-50">
        <div className="container-kadoor">
          <div className="max-w-xl mx-auto text-center">
            <ErrorPageContent />
          </div>
        </div>
      </section>

      <FooterTailwind />
    </>
  );
};

export default index;
