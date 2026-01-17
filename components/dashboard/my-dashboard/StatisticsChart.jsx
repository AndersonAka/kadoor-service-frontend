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
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">{t('loading') || "Chargement des données..."}</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 d-flex justify-content-end">
        <select
          className="form-select"
          style={{ width: 'auto' }}
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
