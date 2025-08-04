// import React, { useState } from "react";
// // <-- LANGKAH 1: Impor hook 'useNavigate' dari react-router-dom
// import { useNavigate } from "react-router-dom";

// import api from "@/service/api.js"; // Pastikan path ini benar
// import UploadForm from "../components/UploadForm.jsx";
// import PreviewSection from "../components/PreviewSection.jsx";

// const UploadPage = () => {
//   // <-- LANGKAH 2: Inisialisasi hook useNavigate di dalam komponen
//   const navigate = useNavigate();

//   // State management Anda tidak perlu diubah, sudah bagus
//   const [namaDataset, setNamaDataset] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadState, setUploadState] = useState("initial");
//   const [previewData, setPreviewData] = useState([]);
//   const [mappingInfo, setMappingInfo] = useState({});
//   const [tempFileId, setTempFileId] = useState("");
//   const [message, setMessage] = useState("");

//   // Semua fungsi handler yang ada juga tidak perlu diubah
//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//     setMessage("");
//   };

//   const handleReset = () => {
//     setNamaDataset("");
//     setSelectedFile(null);
//     setUploadState("initial");
//     setPreviewData([]);
//     setMappingInfo({});
//     setTempFileId("");
//     setMessage("");
//   };

//   const handlePreviewUpload = async (e) => {
//     // ... (Isi fungsi ini tetap sama)
//     e.preventDefault();
//     if (!selectedFile || !namaDataset) {
//       /* ... */ return;
//     }
//     setUploadState("uploading");
//     setMessage("");
//     const formData = new FormData();
//     formData.append("file", selectedFile);
//     try {
//       const response = await api.post("/upload/preview", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setPreviewData(response.data.preview_data);
//       setMappingInfo(response.data.column_mapping_info);
//       setTempFileId(response.data.temp_file_id);
//       setUploadState("preview");
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Terjadi error saat memproses file."
//       );
//       setUploadState("initial");
//     }
//   };

//   const handleSave = async () => {
//     // ... (Isi fungsi ini tetap sama)
//   };

//   // <-- LANGKAH 3: Buat fungsi baru untuk menangani navigasi
//   const handleProceedToClustering = () => {
//     // Fungsi ini akan dipanggil saat tombol "Lanjutkan ke Clustering" di-klik
//     if (tempFileId) {
//       // Gunakan navigate() untuk pindah ke halaman lain
//       // Kita juga mengirim data penting (tempFileId dan namaDataset) melalui 'state'
//       navigate("/clustering", {
//         state: {
//           tempFileId: tempFileId,
//           namaDataset: namaDataset,
//         },
//       });
//     } else {
//       // Fallback jika karena suatu alasan ID file tidak ada
//       setMessage(
//         "Tidak dapat melanjutkan, ID file sementara tidak ditemukan. Coba upload ulang."
//       );
//     }
//   };

//   // Logika render Anda
//   if (uploadState === "preview" || uploadState === "saving") {
//     return (
//       <PreviewSection
//         namaDataset={namaDataset}
//         mappingInfo={mappingInfo}
//         previewData={previewData}
//         message={message}
//         onCancel={handleReset}
//         onSave={handleSave}
//         isSaving={uploadState === "saving"}
//         // <-- LANGKAH 4: "Beri makan" komponen PreviewSection dengan fungsi baru kita
//         onProceedToClustering={handleProceedToClustering}
//       />
//     );
//   }

//   // Tampilan form upload awal tidak berubah
//   return (
//     <UploadForm
//       namaDataset={namaDataset}
//       setNamaDataset={setNamaDataset}
//       onFileChange={handleFileChange}
//       onSubmit={handlePreviewUpload}
//       isLoading={uploadState === "uploading"}
//       message={message}
//     />
//   );
// };

// export default UploadPage;

// src/pages/UploadPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/service/api.js"; // Pastikan path ini benar
import UploadForm from "../components/UploadForm.jsx";
import PreviewSection from "../components/PreviewSection.jsx";

const UploadPage = () => {
  const navigate = useNavigate();

  // State management Anda sebagian besar tetap sama
  const [namaDataset, setNamaDataset] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadState, setUploadState] = useState("initial");
  const [message, setMessage] = useState("");

  // State ini sekarang akan menyimpan seluruh hasil, bukan hanya sebagian
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage("");
  };

  const handleReset = () => {
    setNamaDataset("");
    setSelectedFile(null);
    setUploadState("initial");
    setUploadResult(null); // Reset hasil juga
    setMessage("");
  };

  // === INI FUNGSI UTAMA YANG DIPERBAIKI ===
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

    // Backend baru Anda tidak lagi butuh user_id dan nama_dataset di sini
    // karena endpointnya sudah diubah untuk tidak menyimpan langsung

    try {
      const response = await api.post("/upload/preview", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Simpan seluruh objek hasil ke dalam satu state
      setUploadResult(response.data);

      // Ubah state untuk menampilkan halaman preview
      setUploadState("preview");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Terjadi error saat memproses file."
      );
      setUploadState("initial");
    }
  };

  const handleProceedToClustering = () => {
    // Ambil ID sesi dari hasil yang sudah disimpan
    const sessionId = uploadResult?.upload_session_id;

    if (sessionId) {
      // Arahkan ke halaman clustering dengan membawa ID sesi
      navigate("/clustering", {
        state: {
          // Backend baru Anda mungkin butuh ID ini untuk mengambil data lagi
          upload_session_id: sessionId,
          namaDataset: namaDataset,
        },
      });
    } else {
      setMessage("Tidak dapat melanjutkan, ID Sesi Upload tidak ditemukan.");
    }
  };

  // Logika render Anda
  if (uploadState === "preview" && uploadResult) {
    return (
      <PreviewSection
        // "Beri makan" komponen PreviewSection dengan data dari uploadResult
        namaDataset={namaDataset}
        mappingInfo={uploadResult.mapped_columns}
        previewData={uploadResult.preview}
        stats={uploadResult.stats} // Kirim statistik juga
        message={uploadResult.message}
        onCancel={handleReset}
        // Kita tidak lagi butuh onSave atau isSaving
        onProceedToClustering={handleProceedToClustering}
      />
    );
  }

  // Tampilan form upload awal
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
