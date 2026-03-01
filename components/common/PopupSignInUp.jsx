'use client';

import dynamic from 'next/dynamic';
import { useLoginModal } from '@/context/LoginModalContext';

const LoginSignup = dynamic(
  () => import('./user-credentials/LoginSignup'),
  { ssr: false }
);

const PopupSignInUp = () => {
  const { isOpen, closeLoginModal } = useLoginModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={closeLoginModal}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />
      
      {/* Modal */}
      <div
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <LoginSignup onClose={closeLoginModal} />
      </div>
    </div>
  );
};

export default PopupSignInUp;
