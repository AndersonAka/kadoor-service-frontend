'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import Activities from "./Activities";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import { useTranslations } from "next-intl";

const MyDashboard = () => {
  const t = useTranslations('Admin');

  return (
    <AdminLayout title={t('dashboard') || "Tableau de bord"}>
      {/* Welcome Message */}
      <div className="mb-6">
        <p className="text-gray-500">{t('welcome_message') || "Bienvenue sur votre espace d'administration"}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AllStatistics />
      </div>

      {/* Charts & Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistics Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('statistics') || "Statistiques"}</h4>
          <StatisticsChart />
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{t('recent_activities') || "Activités récentes"}</h4>
          <Activities />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-400 text-sm">© {new Date().getFullYear()} KADOOR SERVICE. Tous droits réservés.</p>
      </div>
    </AdminLayout>
  );
};

export default MyDashboard;
