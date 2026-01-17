import Contact from "@/components/contact";
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  
  return {
    title: `${t('page_title')} | KADOOR SERVICE`,
    description: t('description'),
  };
}

const index = () => {
  return (
    <>
      <Contact />
    </>
  );
};

export default index;
