// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// src/App.jsx

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import Register from "./pages/register";
// import MainLayout from "./layout/MainLayout";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         {/* Protected Routes with Sidebar */}
//         <Route element={<MainLayout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           {/* Tambahkan route lain di sini */}
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/login";
// import Register from "./pages/register";
// import Dashboard from "./pages/Dashboard";
// import MainLayout from "./layout/MainLayout";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />

//         {/* Protected Routes with Sidebar */}
//         <Route element={<MainLayout />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route
//             path="/upload"
//             element={<div>Upload Page - Coming Soon</div>}
//           />
//           <Route
//             path="/clustering"
//             element={<div>Clustering Page - Coming Soon</div>}
//           />
//           <Route
//             path="/abc"
//             element={<div>ABC Analysis Page - Coming Soon</div>}
//           />
//           <Route
//             path="/history"
//             element={<div>History Page - Coming Soon</div>}
//           />
//           <Route path="/about" element={<div>About Page - Coming Soon</div>} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/upload"
            element={<div>Upload Page - Coming Soon</div>}
          />
          <Route
            path="/clustering"
            element={<div>Clustering Page - Coming Soon</div>}
          />
          <Route
            path="/abc"
            element={<div>ABC Analysis Page - Coming Soon</div>}
          />
          <Route
            path="/history"
            element={<div>History Page - Coming Soon</div>}
          />
          <Route path="/about" element={<div>About Page - Coming Soon</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
