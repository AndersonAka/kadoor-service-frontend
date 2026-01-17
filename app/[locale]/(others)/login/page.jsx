import Login from "@/components/login";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'LoginPage' });
  
  return {
    title: `${t('page_title')} | KADOOR SERVICE`,
    description: t('title'),
  };
}

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  );
};

export default LoginPage;
