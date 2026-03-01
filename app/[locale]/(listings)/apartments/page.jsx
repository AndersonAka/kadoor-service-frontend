import ApartmentsListing from "@/components/listings/ApartmentsListing";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ApartmentsPage' });
  
  return {
    title: `${t('page_title')} | KADOOR SERVICE`,
    description: t('hero_description'),
  };
}

const ApartmentsPage = () => {
  return <ApartmentsListing />;
};

export default ApartmentsPage;
