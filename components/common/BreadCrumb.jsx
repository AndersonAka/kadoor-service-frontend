'use client'

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

const BreadCrumb = ({ title = "" }) => {
  const t = useTranslations('Navigation');

  return (
    <>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">{t('home')}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {title}
        </li>
      </ol>
    </>
  );
};

export default BreadCrumb;
