// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Impor komponen Layout Utama
// import MainLayout from "./layout/MainLayout.jsx";

// // Impor semua komponen dari folder 'pages'
// import LoginPage from "./pages/Login.jsx"; // Nama file disarankan PascalCase: Login.jsx
// import RegisterPage from "./pages/Register.jsx"; // Register.jsx
// import DashboardPage from "./pages/Dashboard.jsx"; // Dashboard.jsx
// import UploadPage from "./pages/UploadPage.jsx"; // INI YANG BENAR: mengimpor "otak" halaman upload
// import ClusteringPage from "./pages/ClusteringPage.jsx"; // Clustering.jsx

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Rute Publik (tanpa sidebar/layout) */}
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />

//         {/* =================================================================== */}
//         {/* Rute Terlindungi (yang akan berada di dalam MainLayout/Sidebar) */}
//         {/* =================================================================== */}
//         <Route element={<MainLayout />}>
//           <Route path="/dashboard" element={<DashboardPage />} />

//           {/* INI ADALAH ROUTE UNTUK HALAMAN UPLOAD ANDA */}
//           <Route path="/upload" element={<UploadPage />} />

//           {/* Halaman lain yang bisa Anda kembangkan nanti */}
//           <Route path="/clustering" element={<ClusteringPage />} />
//           <Route
//             path="/abc"
//             element={<div>Halaman Analisis ABC - Segera Hadir</div>}
//           />
//           <Route
//             path="/history"
//             element={<div>Halaman Riwayat - Segera Hadir</div>}
//           />
//           <Route
//             path="/about"
//             element={<div>Halaman Tentang - Segera Hadir</div>}
//           />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// src/App.jsx

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// // Impor komponen Layout Utama
// import MainLayout from "./layout/MainLayout.jsx";

// // Impor semua halaman Anda
// import LoginPage from "./pages/Login.jsx";
// import RegisterPage from "./pages/Register.jsx";
// import DashboardPage from "./pages/Dashboard.jsx";
// import UploadPage from "./pages/UploadPage.jsx";
// import ClusteringPage from "./pages/ClusteringPage.jsx";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Rute Publik (tanpa sidebar/layout) */}
//         <Route path="/" element={<LoginPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />

//         {/* =================================================================== */}
//         {/* Rute Terlindungi (yang akan berada di dalam MainLayout/Sidebar) */}
//         {/* =================================================================== */}
//         <Route element={<MainLayout />}>
//           <Route path="/dashboard" element={<DashboardPage />} />

//           {/* === PERBAIKAN DI SINI === */}
//           {/* Path disesuaikan menjadi "/upload" agar cocok dengan Sidebar.jsx */}
//           <Route path="/upload" element={<UploadPage />} />

//           {/* Path ini sudah benar */}
//           <Route path="/clustering" element={<ClusteringPage />} />

//           {/* Halaman placeholder lainnya */}
//           <Route
//             path="/abc"
//             element={<div>Halaman Analisis ABC - Segera Hadir</div>}
//           />
//           <Route
//             path="/history"
//             element={<div>Halaman Riwayat - Segera Hadir</div>}
//           />
//           <Route
//             path="/about"
//             element={<div>Halaman Tentang - Segera Hadir</div>}
//           />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import ClusteringPage from "./pages/ClusteringPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rute Terlindungi dengan Layout */}
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="clustering" element={<ClusteringPage />} />
          <Route
            path="abc"
            element={<div>Halaman Analisis ABC - Segera Hadir</div>}
          />
          <Route
            path="history"
            element={<div>Halaman Riwayat - Segera Hadir</div>}
          />
          <Route
            path="about"
            element={<div>Halaman Tentang - Segera Hadir</div>}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
