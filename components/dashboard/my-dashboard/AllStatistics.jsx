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
        // Fallback sur des données par défaut en cas d'erreur
        setStats({
          totalBookings: 0,
          totalVehicles: 0,
          totalApartments: 0,
          totalUsers: 0,
          totalRevenue: 0,
          monthlyRevenue: 0,
          last30DaysRevenue: 0,
          pendingBookings: 0,
          bookings: {
            pending: 0,
            confirmed: 0,
            cancelled: 0,
            completed: 0,
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <>
        {[1, 2, 3, 4].map((id) => (
          <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={id}>
            <div className="ff_one">
              <div className="detais">
                <div className="timer">...</div>
                <p>Chargement...</p>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  const allStatistics = [
    {
      id: 1,
      blockStyle: "",
      icon: "flaticon-home",
      timer: stats?.totalVehicles || 0,
      name: "Véhicules",
    },
    {
      id: 2,
      blockStyle: "style2",
      icon: "flaticon-home",
      timer: stats?.totalApartments || 0,
      name: "Appartements",
    },
    {
      id: 3,
      blockStyle: "style3",
      icon: "flaticon-chat",
      timer: stats?.totalBookings || 0,
      name: "Réservations",
      subtitle: stats?.pendingBookings || stats?.bookings?.pending ? `${stats.pendingBookings || stats.bookings.pending} en attente` : null,
    },
    {
      id: 4,
      blockStyle: "style4",
      icon: "flaticon-user",
      timer: stats?.totalUsers || 0,
      name: "Clients",
    },
  ];

  return (
    <>
      {allStatistics.map((item) => (
        <div className="col-sm-6 col-md-6 col-lg-6 col-xl-3" key={item.id}>
          <div className={`ff_one ${item.blockStyle}`}>
            <div className="detais">
              <div className="timer">{item.timer}</div>
              <p>{item.name}</p>
              {item.subtitle && (
                <small className="d-block mt-1" style={{ fontSize: '0.85em', opacity: 0.8 }}>
                  <i className="fa fa-clock-o me-1"></i>
                  {item.subtitle}
                </small>
              )}
            </div>
            <div className="icon">
              <span className={item.icon}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AllStatistics;
