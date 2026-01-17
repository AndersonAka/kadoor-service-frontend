import GridV1 from "@/components/listing-grid/grid-v1";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'VehiclesPage' });
  
  return {
    title: `${t('page_title')} | KADOOR SERVICE`,
    description: t('hero_description'),
  };
}

const VehiclesPage = () => {
  return (
    <>
      <GridV1 dataType="vehicles" />
    </>
  );
};

export default VehiclesPage;
