'use client'

import { useTranslations } from 'next-intl';
import SidebarListingUnified from './SidebarListingUnified';

const OffcanvasSidebar = ({ dataType = "apartments" }) => {
  const t = useTranslations('ListingSidebar');

  return (
    <div
      className="offcanvas offcanvas-start offcanvas-listing-sidebar"
      tabIndex="-1"
      id="sidebarListing"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">{t('advanced_search')}</h5>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      {/* End .offcanvas-header */}

      <div className="offcanvas-body">
        <SidebarListingUnified dataType={dataType} />
      </div>
    </div>
  );
};

export default OffcanvasSidebar;
