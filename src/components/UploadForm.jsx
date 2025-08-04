// =======================================================
// PASTI_KAN FILE INI BERNAMA: src/components/UploadForm.jsx
// =======================================================

import React from "react";
import metricsImg from "../assets/Metrics.png"; // Path ke gambar

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    className="bi bi-cloud-arrow-up-fill"
    viewBox="0 0 16 16"
  >
    <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
  </svg>
);

const UploadForm = ({
  namaDataset,
  setNamaDataset,
  onFileChange,
  onSubmit,
  isLoading,
  message,
}) => {
  return (
    <div className="container mt-4">
      <div className="row align-items-center justify-content-center p-5 bg-light rounded shadow-sm">
        <div className="col-md-6 text-center">
          <img
            src={metricsImg}
            alt="Data Metrics"
            className="img-fluid"
            style={{ maxWidth: "400px" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mb-3 font-weight-bold">Upload Dataset Anda</h2>
          <p className="text-muted mb-4">
            Mulai analisis Anda dengan mengunggah data penjualan dalam format
            CSV atau Excel.
          </p>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="datasetName" className="form-label">
                Nama Dataset
              </label>
              <input
                type="text"
                className="form-control"
                id="datasetName"
                placeholder="Contoh: Penjualan Kuartal 1 2024"
                value={namaDataset}
                onChange={(e) => setNamaDataset(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="fileUpload" className="form-label">
                Pilih File (.csv, .xlsx, .xls)
              </label>
              <input
                type="file"
                className="form-control"
                id="fileUpload"
                onChange={onFileChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                disabled={isLoading}
                required
              />
            </div>
            {message && (
              <div className="alert alert-danger mb-3">{message}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Memproses...
                </>
              ) : (
                <>
                  <UploadIcon /> Lihat Preview
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
