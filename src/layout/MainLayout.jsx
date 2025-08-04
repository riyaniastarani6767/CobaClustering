// // src/main.jsx
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "bootstrap/dist/css/bootstrap.min.css"; // ✅ penting!
// import "./index.css";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );

// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/Sidebar";

// const MainLayout = () => {
//   return (
//     <div className="d-flex">
//       <Sidebar />
//       <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f8f9fa" }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

// MainLayout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <Outlet /> {/* PENTING: Ini yang akan menampilkan komponen anak */}
      </div>
    </div>
  );
};

export default MainLayout;
