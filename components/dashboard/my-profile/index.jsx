'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ChangePassword from "./ChangePassword";
import ProfileInfo from "./ProfileInfo";
import { useTranslations } from "next-intl";

const MyProfile = () => {
  const t = useTranslations('Admin');

  return (
    <AdminLayout title={t('my_profile') || "Mon Profil"}>
      {/* Welcome Message */}
      <div className="mb-6">
        <p className="text-gray-500">{t('profile_welcome') || "Bienvenue sur votre page de profil"}</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">{t('profile_information') || "Informations du Profil"}</h4>
        <ProfileInfo />
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">{t('change_password') || "Changer le mot de passe"}</h4>
        <ChangePassword />
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} KADOOR SERVICE. Tous droits réservés.</p>
      </div>
    </AdminLayout>
  );
};

export default MyProfile;
