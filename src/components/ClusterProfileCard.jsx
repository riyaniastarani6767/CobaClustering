// src/components/ClusterProfileCard.jsx

import React from "react";

const ClusterProfileCard = ({ profile }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Profil Cluster {profile.cluster_id}</h5>
        <span className="badge bg-secondary">
          {profile.product_count} Produk
        </span>
      </div>
      <div className="card-body">
        <h6 className="card-subtitle mb-2 text-primary">{profile.persona}</h6>
        <p className="card-text">
          <strong>Karakteristik Rata-rata:</strong>
        </p>
        <ul className="list-group list-group-flush mb-3">
          {Object.entries(profile.average_metrics).map(([key, value]) => (
            <li
              key={key}
              className="list-group-item d-flex justify-content-between"
            >
              <span>
                {key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </span>
              <strong>{Math.round(value).toLocaleString("id-ID")}</strong>
            </li>
          ))}
        </ul>
        <p className="card-text">
          <strong>Contoh Produk:</strong>
        </p>
        <ul className="list-unstyled">
          {profile.sample_products.map((product) => (
            <li key={product}>- {product}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClusterProfileCard;
