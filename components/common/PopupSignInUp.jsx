'use client';

import dynamic from 'next/dynamic';

const LoginSignup = dynamic(
  () => import('./user-credentials/LoginSignup'),
  { ssr: false }
);

const PopupSignInUp = () => {
  return (
    <div
      className="sign_up_modal modal fade bd-example-modal-lg"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        role="document"
      >
        <LoginSignup />
      </div>
    </div>
  );
};

export default PopupSignInUp;
