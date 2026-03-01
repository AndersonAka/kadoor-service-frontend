'use client'

import { useEffect, useState } from 'react';
import adminService from '@/services/adminService';

const AllStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboardStats();
        setStats({
          ...data.overview,
          pendingBookings: data.bookings?.pending || 0,
          bookings: data.bookings,
        });
      } catch (error) {
        console.error('Error loading statistics:', error);
        setStats({
          totalBookings: 0,
          totalVehicles: 0,
          totalApartments: 0,
          totalUsers: 0,
          totalRevenue: 0,
          monthlyRevenue: 0,
          last30DaysRevenue: 0,
          pendingBookings: 0,
          bookings: { pending: 0, confirmed: 0, cancelled: 0, completed: 0 },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const allStatistics = [
    {
      id: 1,
      color: 'bg-blue-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
      value: stats?.totalVehicles || 0,
      name: "Véhicules",
    },
    {
      id: 2,
      color: 'bg-purple-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      value: stats?.totalApartments || 0,
      name: "Appartements",
    },
    {
      id: 3,
      color: 'bg-primary',
      iconBg: 'bg-red-100',
      iconColor: 'text-primary',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      value: stats?.totalBookings || 0,
      name: "Réservations",
      subtitle: stats?.pendingBookings || stats?.bookings?.pending ? `${stats.pendingBookings || stats.bookings.pending} en attente` : null,
    },
    {
      id: 4,
      color: 'bg-green-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      value: stats?.totalUsers || 0,
      name: "Clients",
    },
  ];

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((id) => (
          <div key={id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return (
    <>
      {allStatistics.map((item) => (
        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              <p className="text-gray-500 font-medium">{item.name}</p>
              {item.subtitle && (
                <p className="text-sm text-yellow-600 mt-1 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.subtitle}
                </p>
              )}
            </div>
            <div className={`w-14 h-14 ${item.iconBg} rounded-full flex items-center justify-center ${item.iconColor}`}>
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
