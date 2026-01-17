'use client'

import { useTranslations } from 'next-intl';
import FilteringItemAdaptive from './FilteringItemAdaptive';

const SidebarListingUnified = ({ dataType = "apartments" }) => {
  const t = useTranslations('ListingSidebar');

  return (
    <div className="sidebar_listing_grid1">
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <FilteringItemAdaptive dataType={dataType} />
        </div>
      </div>
      {/* End .sidebar_listing_list */}
    </div>
  );
};

export default SidebarListingUnified;
