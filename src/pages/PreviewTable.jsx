import React from "react";

const PreviewTable = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Tidak ada data untuk ditampilkan dalam preview.</p>;
  }

  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((val, i) => (
                <td key={i}>{String(val)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviewTable;
