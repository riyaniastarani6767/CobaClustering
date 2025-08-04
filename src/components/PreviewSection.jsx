// // =======================================================
// // PASTI_KAN FILE INI BERNAMA: src/components/PreviewSection.jsx
// // =======================================================

// import React from "react";

// const PreviewSection = ({
//   namaDataset,
//   mappingInfo,
//   previewData,
//   message,
//   onCancel,
//   onSave,
//   isSaving,
// }) => {
//   return (
//     <div className="container mt-4">
//       <h2 className="mb-3">Konfirmasi Data: "{namaDataset}"</h2>
//       <p className="text-muted">
//         Berikut adalah 10 baris pertama data Anda. Periksa untuk memastikan data
//         sudah benar.
//       </p>

//       {/* Informasi Pemetaan Kolom */}
//       <div className="card mb-4 shadow-sm">
//         <div className="card-header">Informasi Pemetaan Kolom</div>
//         <div className="card-body">
//           <ul className="list-group list-group-flush">
//             {Object.entries(mappingInfo).map(([key, value]) => (
//               <li key={key} className="list-group-item">
//                 Kolom <strong>{key}</strong> berhasil dipetakan.{" "}
//                 <span className="text-muted">({value})</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       {/* Tabel Preview */}
//       <div className="table-responsive shadow-sm rounded">
//         <table className="table table-striped table-hover">
//           <thead className="table-dark">
//             <tr>
//               {previewData.length > 0 &&
//                 Object.keys(previewData[0]).map((key) => (
//                   <th key={key}>{key}</th>
//                 ))}
//             </tr>
//           </thead>
//           <tbody>
//             {previewData.map((row, index) => (
//               <tr key={index}>
//                 {Object.values(row).map((val, i) => (
//                   <td key={i}>{String(val)}</td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {message && (
//         <div
//           className={`alert ${
//             message.startsWith("Sukses") ? "alert-success" : "alert-danger"
//           } mt-4`}
//         >
//           {message}
//         </div>
//       )}

//       {/* Tombol Aksi */}
//       <div className="mt-4 d-flex justify-content-end">
//         <button
//           className="btn btn-secondary me-2"
//           onClick={onCancel}
//           disabled={isSaving}
//         >
//           Batal
//         </button>
//         <button
//           className="btn btn-success"
//           onClick={onSave}
//           disabled={isSaving}
//         >
//           {isSaving ? (
//             <>
//               <span className="spinner-border spinner-border-sm me-2"></span>
//               Menyimpan...
//             </>
//           ) : (
//             "Simpan ke Database"
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PreviewSection;

// src/components/PreviewSection.jsx

import React from "react";

// 1. Tambahkan "onProceedToClustering" ke dalam daftar props
const PreviewSection = ({
  namaDataset,
  mappingInfo,
  previewData,
  message,
  onCancel,
  onSave,
  isSaving,
  onProceedToClustering, // Prop baru yang akan kita terima dari UploadPage.jsx
}) => {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">Konfirmasi Data: "{namaDataset}"</h2>
      <p className="text-muted">
        Data Anda berhasil divalidasi. Periksa 10 baris pertama di bawah ini
        sebelum melanjutkan ke tahap analisis.
      </p>

      {/* Bagian Info Mapping dan Tabel Preview tidak berubah */}
      <div className="card mb-4 shadow-sm">
        <div className="card-header">Informasi Pemetaan Kolom</div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            {Object.entries(mappingInfo).map(([key, value]) => (
              <li key={key} className="list-group-item">
                Kolom <strong>{key}</strong> berhasil dipetakan.{" "}
                <span className="text-muted">({value})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="table-responsive shadow-sm rounded">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              {previewData.length > 0 &&
                Object.keys(previewData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {previewData.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{String(val)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {message && (
        <div
          className={`alert ${
            message.startsWith("Sukses") ? "alert-success" : "alert-danger"
          } mt-4`}
        >
          {message}
        </div>
      )}

      {/* ================================================= */}
      {/* === 2. MODIFIKASI BLOK TOMBOL AKSI DI SINI === */}
      {/* ================================================= */}
      <div className="mt-4 d-flex justify-content-end align-items-center">
        {/* Tombol "Simpan Data Mentah" kita buat jadi sekunder */}
        <button
          className="btn btn-outline-secondary me-3"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Menyimpan...
            </>
          ) : (
            "Simpan Data Mentah"
          )}
        </button>

        {/* Tombol Batal tetap sama */}
        <button
          className="btn btn-secondary me-2"
          onClick={onCancel}
          disabled={isSaving}
        >
          Upload Ulang
        </button>

        {/* Tombol Utama BARU untuk ke Clustering */}
        <button
          className="btn btn-primary" // Saya ubah jadi btn-primary agar lebih menonjol
          onClick={onProceedToClustering} // Menggunakan prop baru
          disabled={isSaving}
        >
          Lanjutkan ke Clustering →
        </button>
      </div>
    </div>
  );
};

export default PreviewSection;
