"use client";

import { useState } from "react";
import ModalVideo from "./ModalVideo";

const PopupVideo = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div
        className="popup_video_btn popup-iframe popup-youtube color-white"
        onClick={() => setOpen(true)}
        role="button"
      >
        <i className="flaticon-play"></i>
      </div>
      <ModalVideo setIsOpen={setOpen} isOpen={isOpen} videoId="y9j-BL5ocW8" />
    </>
  );
};

export default PopupVideo;
