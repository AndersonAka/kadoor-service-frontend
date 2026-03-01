import GiftsListing from "@/components/listings/GiftsListing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'GiftsPage' });
  
  return {
    title: `${t('page_title') || 'Chèques Cadeaux'} | KADOOR SERVICE`,
    description: t('hero_description') || 'Offrez une expérience unique',
  };
}

const GiftsPage = () => {
  return <GiftsListing />;
};

export default GiftsPage;
