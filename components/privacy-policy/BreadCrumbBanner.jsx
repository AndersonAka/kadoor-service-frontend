import BreadCrumb from "../common/BreadCrumb";
import { useTranslations } from 'next-intl';

const BreadCrumbBanner = ({ title }) => {
  const t = useTranslations('Footer');
  const displayTitle = title || t('privacy_policy') || "Politique de Confidentialité";
  
  return (
    <section className="inner_page_breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title={displayTitle} />
              <h4 className="breadcrumb_title">{displayTitle}</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
