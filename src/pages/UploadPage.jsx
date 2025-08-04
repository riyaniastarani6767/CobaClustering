// =======================================================
// PASTI_KAN FILE INI BERNAMA: src/pages/UploadPage.jsx
// =======================================================

import React, { useState } from "react";
import api from "@/service/api.js";

// Komponen-komponen "bodoh" yang akan kita panggil
import UploadForm from "../components/UploadForm.jsx";
import PreviewSection from "../components/PreviewSection.jsx";

const UploadPage = () => {
  // ---- SEMUA STATE & LOGIKA ADA DI SINI ----
  const [namaDataset, setNamaDataset] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState("initial");
  const [previewData, setPreviewData] = useState([]);
  const [mappingInfo, setMappingInfo] = useState({});
  const [tempFileId, setTempFileId] = useState("");
  const [message, setMessage] = useState("");

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
    e.preventDefault();
    if (!selectedFile || !namaDataset) {
      setMessage("Nama dataset dan file wajib diisi.");
      return;
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
    setUploadState("saving");
    setMessage("");
    try {
      const payload = {
        temp_file_id: tempFileId,
        nama_dataset: namaDataset,
        user_id: 1, // Ganti ini nanti
      };
      const response = await api.post("/upload/save", payload);
      setMessage(response.data.message);
      setTimeout(() => handleReset(), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Gagal menyimpan data.");
      setUploadState("preview");
    }
  };

  // ---- BAGIAN RENDER HANYA MEMANGGIL KOMPONEN ANAK ----

  // Jika state adalah 'preview' atau 'saving', tampilkan komponen PreviewSection
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
      />
    );
  }

  // Jika tidak, tampilkan komponen UploadForm (tampilan awal)
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
