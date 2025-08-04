import React, { useState } from "react";
// <-- LANGKAH 1: Impor hook 'useNavigate' dari react-router-dom
import { useNavigate } from "react-router-dom";

import api from "@/service/api.js"; // Pastikan path ini benar
import UploadForm from "../components/UploadForm.jsx";
import PreviewSection from "../components/PreviewSection.jsx";

const UploadPage = () => {
  // <-- LANGKAH 2: Inisialisasi hook useNavigate di dalam komponen
  const navigate = useNavigate();

  // State management Anda tidak perlu diubah, sudah bagus
  const [namaDataset, setNamaDataset] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState("initial");
  const [previewData, setPreviewData] = useState([]);
  const [mappingInfo, setMappingInfo] = useState({});
  const [tempFileId, setTempFileId] = useState("");
  const [message, setMessage] = useState("");

  // Semua fungsi handler yang ada juga tidak perlu diubah
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage("");
  };

  const handleReset = () => {
    setNamaDataset("");
    setSelectedFile(null);
    setUploadState("initial");
    setPreviewData([]);
    setMappingInfo({});
    setTempFileId("");
    setMessage("");
  };

  const handlePreviewUpload = async (e) => {
    // ... (Isi fungsi ini tetap sama)
    e.preventDefault();
    if (!selectedFile || !namaDataset) {
      /* ... */ return;
    }
    setUploadState("uploading");
    setMessage("");
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      const response = await api.post("/upload/preview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPreviewData(response.data.preview_data);
      setMappingInfo(response.data.column_mapping_info);
      setTempFileId(response.data.temp_file_id);
      setUploadState("preview");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Terjadi error saat memproses file."
      );
      setUploadState("initial");
    }
  };

  const handleSave = async () => {
    // ... (Isi fungsi ini tetap sama)
  };

  // <-- LANGKAH 3: Buat fungsi baru untuk menangani navigasi
  const handleProceedToClustering = () => {
    // Fungsi ini akan dipanggil saat tombol "Lanjutkan ke Clustering" di-klik
    if (tempFileId) {
      // Gunakan navigate() untuk pindah ke halaman lain
      // Kita juga mengirim data penting (tempFileId dan namaDataset) melalui 'state'
      navigate("/clustering-settings", {
        state: {
          tempFileId: tempFileId,
          namaDataset: namaDataset,
        },
      });
    } else {
      // Fallback jika karena suatu alasan ID file tidak ada
      setMessage(
        "Tidak dapat melanjutkan, ID file sementara tidak ditemukan. Coba upload ulang."
      );
    }
  };

  // Logika render Anda
  if (uploadState === "preview" || uploadState === "saving") {
    return (
      <PreviewSection
        namaDataset={namaDataset}
        mappingInfo={mappingInfo}
        previewData={previewData}
        message={message}
        onCancel={handleReset}
        onSave={handleSave}
        isSaving={uploadState === "saving"}
        // <-- LANGKAH 4: "Beri makan" komponen PreviewSection dengan fungsi baru kita
        onProceedToClustering={handleProceedToClustering}
      />
    );
  }

  // Tampilan form upload awal tidak berubah
  return (
    <UploadForm
      namaDataset={namaDataset}
      setNamaDataset={setNamaDataset}
      onFileChange={handleFileChange}
      onSubmit={handlePreviewUpload}
      isLoading={uploadState === "uploading"}
      message={message}
    />
  );
};

export default UploadPage;
