import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const CallToAction = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-4">
      <div className="text-center lg:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{t('cta_title')}</h2>
        <p className="text-white/80">{t('cta_subtitle')}</p>
      </div>
      <Link 
        href="/register" 
        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
      >
        {t('cta_button')}
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>
    </div>
  );
};

export default CallToAction;
