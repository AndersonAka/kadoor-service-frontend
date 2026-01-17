import SignUp from "@/components/register";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'RegisterPage' });
  
  return {
    title: `${t('page_title')} | KADOOR SERVICE`,
    description: t('title'),
  };
}

const RegisterPage = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default RegisterPage;
