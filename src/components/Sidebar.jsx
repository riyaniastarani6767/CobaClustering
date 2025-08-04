// import { Link, useLocation } from "react-router-dom";
// import { House, Upload, Activity, List, Clock, Info } from "lucide-react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Sidebar = () => {
//   const location = useLocation();
//   const menuItems = [
//     { label: "Dashboard", icon: <House size={18} />, to: "/dashboard" },
//     { label: "Upload Data", icon: <Upload size={18} />, to: "/upload" },
//     { label: "Clustering", icon: <Activity size={18} />, to: "/clustering" },
//     { label: "ABC Analysis", icon: <List size={18} />, to: "/abc" },
//     { label: "History", icon: <Clock size={18} />, to: "/history" },
//     { label: "Tentang", icon: <Info size={18} />, to: "/about" },
//   ];

//   return (
//     <div
//       className="d-flex flex-column p-3 bg-white border-end vh-100"
//       style={{ width: 240 }}
//     >
//       <h5 className="mb-4 fw-bold">Yudi Motor</h5>
//       <ul className="nav nav-pills flex-column mb-auto">
//         {menuItems.map(({ label, icon, to }) => (
//           <li className="nav-item" key={label}>
//             <Link
//               to={to}
//               className={`nav-link d-flex align-items-center gap-2 ${
//                 location.pathname === to
//                   ? "active bg-primary text-white"
//                   : "text-dark"
//               }`}
//             >
//               {icon}
//               {label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

// import { Link, useLocation } from "react-router-dom";
// import { House, Upload, Activity, List, Clock, Info } from "lucide-react";

// const Sidebar = () => {
//   const location = useLocation();
//   const menuItems = [
//     { label: "Dashboard", icon: <House size={18} />, to: "/dashboard" },
//     { label: "Upload Data", icon: <Upload size={18} />, to: "/upload" },
//     { label: "Clustering", icon: <Activity size={18} />, to: "/clustering" },
//     { label: "ABC Analysis", icon: <List size={18} />, to: "/abc" },
//     { label: "History", icon: <Clock size={18} />, to: "/history" },
//     { label: "Tentang", icon: <Info size={18} />, to: "/about" },
//   ];

//   return (
//     <div
//       className="d-flex flex-column p-3 bg-white border-end vh-100"
//       style={{ width: 240 }}
//     >
//       <h5 className="mb-4 fw-bold">Yudi Motor</h5>
//       <ul className="nav nav-pills flex-column mb-auto">
//         {menuItems.map(({ label, icon, to }) => (
//           <li className="nav-item" key={label}>
//             <Link
//               to={to}
//               className={`nav-link d-flex align-items-center gap-2 ${
//                 location.pathname === to
//                   ? "active bg-primary text-white"
//                   : "text-dark"
//               }`}
//             >
//               {icon}
//               {label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import { NavLink, useLocation } from "react-router-dom"; // Direkomendasikan pakai NavLink untuk styling 'active'
import { House, Upload, Activity, List, Clock, Info } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { label: "Dashboard", icon: <House size={18} />, to: "/dashboard" },
    { label: "Upload Data", icon: <Upload size={18} />, to: "/upload" }, // Path ini: /upload
    { label: "Clustering", icon: <Activity size={18} />, to: "/clustering" }, // Path ini: /clustering
    { label: "ABC Analysis", icon: <List size={18} />, to: "/abc" },
    { label: "History", icon: <Clock size={18} />, to: "/history" },
    { label: "Tentang", icon: <Info size={18} />, to: "/about" },
  ];

  return (
    <div
      className="d-flex flex-column p-3 bg-white border-end vh-100"
      style={{ width: 240 }}
    >
      <h5 className="mb-4 fw-bold">Yudi Motor</h5>
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map(({ label, icon, to }) => (
          <li className="nav-item" key={label}>
            {/* Menggunakan NavLink agar bisa otomatis mendapat class 'active' */}
            <NavLink
              to={to}
              className={(
                { isActive } // NavLink memberikan 'isActive' secara otomatis
              ) =>
                `nav-link d-flex align-items-center gap-2 ${
                  isActive ? "active bg-primary text-white" : "text-dark"
                }`
              }
            >
              {icon}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
