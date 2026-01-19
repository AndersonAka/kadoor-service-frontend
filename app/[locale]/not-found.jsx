import NotFound from "@/components/404";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('NotFoundPage');
  
  return {
    title: `404 ${t('title')} || KADOOR SERVICE`,
    description: t('description'),
  };
}

const index = () => {
  return (
    <>
      <NotFound />
    </>
  );
};

export default index;
