"use client";

import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import adminService from '@/services/adminService';
import { useTranslations } from "next-intl";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      mode: "index",
      intersect: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function StatisticsChart() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('month');
  const t = useTranslations('Admin');

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true);
        const data = await adminService.getChartData(period);
        
        if (data && data.data) {
          const labels = data.data.map((item) => item.label);
          const revenues = data.data.map((item) => item.revenue);
          
          setChartData({
            labels,
            datasets: [
              {
                label: t('revenue_fcfa') || "Revenus (FCFA)",
                data: revenues,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                fill: false,
                tension: 0.4,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error loading chart data:', error);
        // Fallback sur des données par défaut
        setChartData({
          labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"],
          datasets: [
            {
              label: t('revenue_fcfa') || "Revenus (FCFA)",
              data: [0, 0, 0, 0, 0, 0],
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              fill: false,
            },
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [period, t]);

  if (loading || !chartData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <select
          className="px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="day">{t('filter_day') || "Jour"}</option>
          <option value="week">{t('filter_week') || "Semaine"}</option>
          <option value="month">{t('filter_month') || "Mois"}</option>
          <option value="year">{t('filter_year') || "Année"}</option>
        </select>
      </div>
      <Line options={options} data={chartData} />
    </div>
  );
}
