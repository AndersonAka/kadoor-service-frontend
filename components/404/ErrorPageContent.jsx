import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Form from "./Form";
import Image from "next/image";

const ErrorPageContent = () => {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="error_page footer_apps_widget">
      <Image
        width={266}
        height={200}
        className="img-fluid img-thumb contain"
        src="/assets/images/resource/error.png"
        alt="error.png"
      />
      <div className="erro_code">
        <h1>{t('title')}</h1>
      </div>
      <p>{t('description')}</p>

      <Form />
      {/* End form */}

      <Link href="/" className="btn btn_error btn-thm">
        {t('back_to_home')}
      </Link>
    </div>
  );
};

export default ErrorPageContent;
