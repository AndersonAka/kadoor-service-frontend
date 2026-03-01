import { getTranslations } from "next-intl/server";
import Favorites from "@/components/favorites";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Favorites" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

const FavoritesPage = () => {
  return (
    <>
      <Favorites />
    </>
  );
};

export default FavoritesPage;
