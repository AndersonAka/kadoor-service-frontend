"use client";

import { useState } from "react";
import ModalVideo from "../common/ModalVideo";

const PopupVideo = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <ModalVideo setIsOpen={setOpen} isOpen={isOpen} videoId="y9j-BL5ocW8" />
      <div
        className="popup_video_btn popup-iframe popup-youtube"
        onClick={() => setOpen(true)}
        role="button"
      >
        <i className="flaticon-play"></i>
      </div>
    </>
  );
};

export default PopupVideo;
