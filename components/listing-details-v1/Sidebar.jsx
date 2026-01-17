import FeaturedListings from "../common/listing/FeaturedListings";
import BookingButton from "../common/booking/BookingButton";

const Sidebar = ({ itemId, itemType = 'apartment', itemData }) => {
  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          {/* Booking Button */}
          <div className="mb30">
            <BookingButton itemId={itemId} itemType={itemType} itemData={itemData} />
          </div>
          {/* End Booking Button */}
        </div>
      </div>
      {/* End .sidebar_listing_list */}

      <div className="sidebar_feature_listing">
        <h4 className="title">Recently Viewed</h4>
        <FeaturedListings currentItemId={itemId} currentItemType={itemType} />
      </div>
      {/* End .Recently Viewed */}
    </>
  );
};

export default Sidebar;
