import GridV2 from "@/components/listing-grid/grid-v2";
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
  return (
    <>
      <GridV2 dataType="apartments" />
    </>
  );
};

export default ApartmentsPage;
