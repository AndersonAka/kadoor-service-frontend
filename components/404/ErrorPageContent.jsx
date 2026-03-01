import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from "next/image";

const ErrorPageContent = () => {
  const t = useTranslations('NotFoundPage');

  return (
    <div className="space-y-6">
      <Image
        width={266}
        height={200}
        className="mx-auto"
        src="/assets/images/resource/error.png"
        alt="Page non trouvée"
      />
      <h1 className="text-6xl font-bold text-primary">{t('title')}</h1>
      <p className="text-lg text-gray-500 max-w-md mx-auto">{t('description')}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        {t('back_to_home')}
      </Link>
    </div>
  );
};

export default ErrorPageContent;
