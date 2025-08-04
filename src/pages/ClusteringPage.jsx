// src/pages/ClusteringPage.jsx

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/service/api.js"; // Pastikan path ini benar

// --- Impor komponen-komponen "anak" yang akan menampilkan hasil ---
import RecommendationCharts from "../components/RecommendationCharts.jsx";
import ClusterScatterPlot from "../components/ClusterScatterPlot.jsx";
import ClusterProfileCard from "../components/ClusterProfileCard.jsx";

// --- Impor untuk slider ---
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ClusteringPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // === "OTAK" BAGIAN 1: STATE MANAGEMENT ===
  // Semua variabel yang bisa berubah ada di sini
  const [tempFileId, setTempFileId] = useState("");
  const [namaDataset, setNamaDataset] = useState("");
  const [parameters, setParameters] = useState(null);
  const [loadingParams, setLoadingParams] = useState(true);
  const [nClusters, setNClusters] = useState(3);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [xAxisFeature, setXAxisFeature] = useState("");
  const [yAxisFeature, setYAxisFeature] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [clusteringResult, setClusteringResult] = useState(null);

  // === "OTAK" BAGIAN 2: LOGIKA SAAT HALAMAN DIBUKA (useEffect) ===
  useEffect(() => {
    if (location.state?.tempFileId) {
      setTempFileId(location.state.tempFileId);
      setNamaDataset(location.state.namaDataset || "Dataset Anda");
    } else {
      // Jika halaman diakses langsung tanpa data, tendang kembali ke halaman upload
      navigate("/clustering", { replace: true });
    }

    const fetchParameters = async () => {
      try {
        const response = await api.get("/clustering/parameters");
        const params = response.data;
        setParameters(params);
        setNClusters(params.cluster_options.default_clusters);

        // Atur pilihan default agar tidak kosong saat pertama kali dimuat
        const defaultFeatures = ["total_pembelian", "rata_rata_harga"];
        setSelectedFeatures(defaultFeatures);
        setXAxisFeature(defaultFeatures[0]);
        setYAxisFeature(defaultFeatures[1]);
      } catch (err) {
        setError("Gagal memuat parameter clustering dari server.");
      } finally {
        setLoadingParams(false);
      }
    };
    fetchParameters();
  }, [location.state, navigate]);

  // === "OTAK" BAGIAN 3: FUNGSI-FUNGSI HANDLER ===
  const handleFeatureChange = (e) => {
    const { value, checked } = e.target;
    const newFeatures = checked
      ? [...selectedFeatures, value]
      : selectedFeatures.filter((f) => f !== value);

    setSelectedFeatures(newFeatures);

    // Logika cerdas untuk reset sumbu jika fiturnya di-uncheck
    if (!newFeatures.includes(xAxisFeature))
      setXAxisFeature(newFeatures[0] || "");
    if (!newFeatures.includes(yAxisFeature))
      setYAxisFeature(
        newFeatures.length > 1 ? newFeatures[1] : newFeatures[0] || ""
      );
  };

  const handleRunClustering = async () => {
    if (selectedFeatures.length < 2) {
      setError("Pilih minimal 2 fitur untuk analisis.");
      return;
    }
    setProcessing(true);
    setError("");
    setClusteringResult(null); // Kosongkan hasil lama sebelum fetching yang baru
    try {
      const payload = {
        temp_file_id: tempFileId,
        n_clusters: nClusters,
        selected_features: selectedFeatures,
      };
      const response = await api.post("/clustering/process", payload);
      setClusteringResult(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Terjadi error saat memproses clustering."
      );
    } finally {
      setProcessing(false);
    }
  };

  // Tampilkan pesan loading jika parameter belum siap
  if (loadingParams) {
    return <div className="container mt-4">Memuat parameter clustering...</div>;
  }

  // === BAGIAN TAMPILAN (VIEW) ===
  // Ini adalah JSX yang sudah Anda miliki, sekarang didukung oleh "otak" di atas.
  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-1">Analisis Clustering: {namaDataset}</h2>
      <p className="text-muted mb-4">
        Gunakan panel di bawah untuk bereksperimen dan menemukan wawasan dari
        data produk Anda.
      </p>

      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card shadow-sm sticky-top" style={{ top: "20px" }}>
            <div className="card-header">
              <h5>Panel Kontrol</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label d-block">
                  Jumlah Cluster (K): <strong>{nClusters}</strong>
                </label>
                <Slider
                  min={2}
                  max={10}
                  value={nClusters}
                  onChange={(val) => setNClusters(val)}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">1. Pilih Fitur Analisis</label>
                {parameters?.feature_options.map((f) => (
                  <div className="form-check" key={f.value}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={f.value}
                      id={f.value}
                      checked={selectedFeatures.includes(f.value)}
                      onChange={handleFeatureChange}
                    />
                    <label className="form-check-label" htmlFor={f.value}>
                      {f.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label className="form-label">2. Pilih Sumbu Visualisasi</label>
                <select
                  className="form-select mb-2"
                  value={xAxisFeature}
                  onChange={(e) => setXAxisFeature(e.target.value)}
                  disabled={selectedFeatures.length === 0}
                >
                  {selectedFeatures.map((f) => (
                    <option key={`x-${f}`} value={f}>
                      {
                        parameters?.feature_options.find(
                          (opt) => opt.value === f
                        )?.label
                      }
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  value={yAxisFeature}
                  onChange={(e) => setYAxisFeature(e.target.value)}
                  disabled={selectedFeatures.length === 0}
                >
                  {selectedFeatures.map((f) => (
                    <option key={`y-${f}`} value={f}>
                      {
                        parameters?.feature_options.find(
                          (opt) => opt.value === f
                        )?.label
                      }
                    </option>
                  ))}
                </select>
              </div>
              {error && <div className="alert alert-danger p-2">{error}</div>}
              <button
                className="btn btn-primary w-100"
                onClick={handleRunClustering}
                disabled={processing}
              >
                {processing ? "Menganalisis..." : "Jalankan Analisis"}
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          {!clusteringResult ? (
            <div
              className="text-center p-5 bg-light rounded"
              style={{
                minHeight: "400px",
                display: "grid",
                placeContent: "center",
              }}
            >
              <h4>Hasil analisis akan ditampilkan di sini.</h4>
              <p className="text-muted">
                Pilih parameter Anda di panel kontrol dan klik "Jalankan
                Analisis".
              </p>
            </div>
          ) : (
            <div className="vstack gap-4">
              <div className="card shadow-sm">
                <div className="card-header">
                  <h5>
                    Rekomendasi K Optimal:{" "}
                    {clusteringResult.optimal_k_recommendation}
                  </h5>
                </div>
                <div className="card-body">
                  <p>
                    Validasi jumlah cluster ideal. Cari "siku" pada Elbow Method
                    dan "puncak" pada Silhouette Score.
                  </p>
                  <RecommendationCharts
                    elbowData={clusteringResult.elbow_data}
                    silhouetteData={clusteringResult.silhouette_data}
                  />
                </div>
              </div>

              <ClusterScatterPlot
                visualizationData={
                  clusteringResult.selected_k_results.visualization_data
                }
                xAxis={xAxisFeature}
                yAxis={yAxisFeature}
                featureOptions={parameters.feature_options}
              />

              <div>
                <h4 className="mb-3">
                  Profil Setiap Cluster (K=
                  {clusteringResult.selected_k_results.k_value})
                </h4>
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">
                  {clusteringResult.selected_k_results.profiles
                    .sort((a, b) => a.cluster_id - b.cluster_id)
                    .map((profile) => (
                      <div className="col" key={profile.cluster_id}>
                        <ClusterProfileCard profile={profile} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClusteringPage;
