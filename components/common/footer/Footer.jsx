'use client'

import { Link } from "@/i18n/routing";
import Social from "./Social";
import SubscribeForm from "./SubscribeForm";
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <>
      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3 pr0 pl0">
        <div className="footer_about_widget">
          <h4>{t('about_title')}</h4>
          <p>{t('about_desc')}</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_qlink_widget">
          <h4>{t('links_title')}</h4>
          <ul className="list-unstyled">
            <li>
              <Link href="/about-us">{t('about_us')}</Link>
            </li>
            <li>
              <Link href="/terms">{t('cgl')}</Link>
            </li>
            <li>
              <Link href="/privacy-policy">{t('privacy_policy')}</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_contact_widget">
          <h4>{t('contact_title')}</h4>
          <ul className="list-unstyled">
            <li>
              <a href="mailto:kadoorserviceci@gmail.com">kadoorserviceci@gmail.com</a>
            </li>
            <li>
              <span>Abidjan, Côte d'Ivoire</span>
            </li>
          </ul>
        </div>
      </div>
      {/* End .col */}

      <div className="col-sm-6 col-md-6 col-lg-3 col-xl-3">
        <div className="footer_social_widget">
          <h4>{t('follow_title')}</h4>
          <ul className="mb30">
            <Social />
          </ul>
          <h4>{t('subscribe_title')}</h4>
          <SubscribeForm />
        </div>
      </div>
    </>
  );
};

export default Footer;
