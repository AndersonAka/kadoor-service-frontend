"use client";

import BreadCrumb from "../common/BreadCrumb";
import { useTranslations } from "next-intl";

const BreadCrumbBanner = () => {
  const t = useTranslations("RegisterPage");
  const tAuth = useTranslations("Auth");

  return (
    <section className="inner_page_breadcrumb">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title={tAuth("register")} />
              <h4 className="breadcrumb_title">{t("page_title")}</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
