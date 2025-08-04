// src/components/ClusterScatterPlot.jsx

import React from "react";
import { Scatter } from "react-chartjs-2";

// (Impor ChartJS sama seperti di atas, bisa di-skip jika sudah ada di file utama)

const ClusterScatterPlot = ({
  visualizationData,
  xAxis,
  yAxis,
  featureOptions,
}) => {
  // Array warna untuk cluster
  const colors = [
    "rgba(255, 99, 132, 0.8)",
    "rgba(54, 162, 235, 0.8)",
    "rgba(255, 206, 86, 0.8)",
    "rgba(75, 192, 192, 0.8)",
    "rgba(153, 102, 255, 0.8)",
    "rgba(255, 159, 64, 0.8)",
    "rgba(99, 255, 132, 0.8)",
    "rgba(235, 54, 162, 0.8)",
    "rgba(86, 255, 206, 0.8)",
    "rgba(192, 75, 192, 0.8)",
  ];

  const datasets = [...new Set(visualizationData.map((d) => d.cluster))]
    .sort()
    .map((clusterId) => {
      const clusterPoints = visualizationData.filter(
        (d) => d.cluster === clusterId
      );
      return {
        label: `Cluster ${clusterId}`,
        data: clusterPoints.map((p) => ({
          x: p[xAxis],
          y: p[yAxis],
          product: p.nama_produk,
        })),
        backgroundColor: colors[clusterId % colors.length],
      };
    });

  const chartData = { datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: {
        display: true,
        text: `Visualisasi: ${
          featureOptions.find((f) => f.value === xAxis)?.label
        } vs ${featureOptions.find((f) => f.value === yAxis)?.label}`,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw.product; // Tampilkan nama produk di tooltip
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: featureOptions.find((f) => f.value === xAxis)?.label,
        },
      },
      y: {
        title: {
          display: true,
          text: featureOptions.find((f) => f.value === yAxis)?.label,
        },
      },
    },
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <Scatter options={options} data={chartData} />
      </div>
    </div>
  );
};

export default ClusterScatterPlot;
