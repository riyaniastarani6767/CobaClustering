// const Dashboard = () => {
//   return (
//     <div>
//       <h2 className="mb-4">Dashboard</h2>
//       <div className="row">
//         <div className="col-md-12">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">Selamat Datang di ClusterInsight</h5>
//               <p className="card-text">
//                 Sistem analisis clustering untuk Yudi Motor. Silakan pilih menu
//                 di sidebar untuk mulai menggunakan aplikasi.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
// src/pages/Dashboard.jsx
// import React from "react";

// const Dashboard = () => {
//   return (
//     <div>
//       <h1>Tes Dasbor</h1>
//       <p>Komponen berhasil dimuat.</p>
//     </div>
//   );
// };

// export default Dashboard;

// KEMBALIKAN SEMUA IMPORT
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import api from "../service/api.js";

// Daftarkan kembali komponen ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // State tidak perlu diubah
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect juga tidak perlu diubah dari langkah 2
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await api.get("/dashboard/summary");
        setSummary(response.data);
      } catch (err) {
        setError("Gagal memuat data dasbor. Silakan coba lagi nanti.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  // Tambahkan kembali DATA dan OPTIONS untuk chart
  const chartData = {
    labels: summary?.clustering_summary?.labels || [],
    datasets: [
      {
        data: summary?.clustering_summary?.data || [],
        backgroundColor: ["#E74C3C", "#2ECC71", "#8E44AD"],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          padding: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  // Kembalikan JSX lengkapnya
  if (loading) {
    return <div>Memuat data dasbor...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    // KODE JSX LENGKAP DARI AWAL
    <div>
      <h2 className="mb-4" style={{ fontWeight: "bold" }}>
        Ringkasan Aktivitas
      </h2>
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <h5 className="card-title">Total Produk</h5>
              <h2>{summary?.total_produk}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <h5 className="card-title">Total Transaksi</h5>
              <h2>{summary?.total_transaksi}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <h5 className="card-title">Upload Terakhir</h5>
              <h2>{summary?.upload_terakhir}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body">
              <h5 className="card-title">K-Means Terakhir</h5>
              <h2>{summary?.k_means_terakhir}</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Ringkasan Clustering Terakhir</h5>
              <div style={{ height: "300px" }}>
                <Pie data={chartData} options={chartOptions} />
              </div>
              <div className="d-flex justify-content-around mt-3">
                <span>
                  <b>Cluster 1:</b> {summary?.clustering_summary?.data[0]}
                </span>
                <span>
                  <b>Cluster 2:</b> {summary?.clustering_summary?.data[1]}
                </span>
                <span>
                  <b>Cluster 3:</b> {summary?.clustering_summary?.data[2]}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Aktivitas Terbaru</h5>
              <ul className="list-group list-group-flush">
                {summary?.aktivitas_terbaru?.map((activity) => (
                  <li
                    key={activity.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    {activity.deskripsi}
                    <span className="badge bg-light text-dark">
                      {activity.waktu}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
