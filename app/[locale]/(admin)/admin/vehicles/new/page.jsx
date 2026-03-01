'use client';

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";
import AdminLayout from "@/components/admin/AdminLayout";
import VehicleForm from "@/components/dashboard/admin-vehicles/VehicleForm";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const NewVehiclePage = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations('Admin');

  useEffect(() => {
    if (!loading && user && user.role === 'USER') {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user && user.role === 'USER') {
    return null;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  if (user && (user.role === 'ADMIN' || user.role === 'MANAGER')) {
    return (
      <AdminLayout title={t('add_vehicle') || "Ajouter un véhicule"}>
        <div className="mb-6">
          <Link 
            href="/admin/vehicles" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {t('back_to_list') || "Retour à la liste"}
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <VehicleForm />
        </div>
      </AdminLayout>
    );
  }

  return null;
};

export default NewVehiclePage;
