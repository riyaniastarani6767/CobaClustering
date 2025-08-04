import React from "react";

const MappingInfo = ({ info }) => {
  if (!info || Object.keys(info).length === 0) return null;

  return (
    <div className="card mb-4 shadow-sm">
      <div className="card-header">Informasi Pemetaan Kolom</div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          {Object.entries(info).map(([key, value]) => (
            <li key={key} className="list-group-item">
              Kolom <strong>{key}</strong> berhasil dipetakan.{" "}
              <span className="text-muted">({value})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MappingInfo;
