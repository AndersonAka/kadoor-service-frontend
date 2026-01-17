import Link from "next/link";
import { useTranslations } from 'next-intl';

const CallToAction = () => {
  const t = useTranslations('HomePage');

  return (
    <div className="row">
      <div className="col-lg-8">
        <div className="start_partner tac-smd">
          <h2 className="text-white">{t('cta_title')}</h2>
          <p className="text-white">{t('cta_subtitle')}</p>
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-4">
        <div className="parner_reg_btn text-right tac-smd">
          <Link href="/register" className="btn btn-thm2">
            {t('cta_button')}
          </Link>
        </div>
      </div>
      {/* End .col */}
    </div>
  );
};

export default CallToAction;
