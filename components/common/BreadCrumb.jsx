'use client'

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const BreadCrumb = ({ title = "" }) => {
  const t = useTranslations('Navigation');

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 py-4">
      <Link href="/" className="hover:text-primary transition-colors">
        {t('home')}
      </Link>
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span className="text-gray-900 font-medium">{title}</span>
    </nav>
  );
};

export default BreadCrumb;
