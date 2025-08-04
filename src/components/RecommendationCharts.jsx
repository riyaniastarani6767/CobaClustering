// src/components/RecommendationCharts.jsx

import React from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RecommendationCharts = ({ elbowData, silhouetteData }) => {
  const elbowChartData = {
    labels: elbowData.map((d) => d.k),
    datasets: [
      {
        label: "Inertia (Elbow Method)",
        data: elbowData.map((d) => d.inertia),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const silhouetteChartData = {
    labels: silhouetteData.map((d) => d.k),
    datasets: [
      {
        label: "Silhouette Score",
        data: silhouetteData.map((d) => d.score),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Evaluasi Kualitas Cluster" },
    },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <Line
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: { display: true, text: "Elbow Method (Cari Siku)" },
                },
              }}
              data={elbowChartData}
            />
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <Line
              options={{
                ...options,
                plugins: {
                  ...options.plugins,
                  title: {
                    display: true,
                    text: "Silhouette Score (Cari Puncak)",
                  },
                },
              }}
              data={silhouetteChartData}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCharts;
