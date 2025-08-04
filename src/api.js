// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000", // pastikan ini sesuai dengan port backend kamu
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default API;

// src/api.js
// src/api.js
// src/api.js

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:8000",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 10000, // 10 seconds timeout
// });

// // Request interceptor for debugging
// API.interceptors.request.use(
//   (config) => {
//     console.log("🚀 Making API request:", {
//       method: config.method?.toUpperCase(),
//       url: config.baseURL + config.url,
//       data: config.data,
//     });
//     return config;
//   },
//   (error) => {
//     console.error("❌ Request error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for debugging
// API.interceptors.response.use(
//   (response) => {
//     console.log("✅ API response:", {
//       status: response.status,
//       data: response.data,
//       url: response.config.url,
//     });
//     return response;
//   },
//   (error) => {
//     console.error("❌ API Error:", {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       url: error.config?.url,
//     });
//     return Promise.reject(error);
//   }
// );

// export default API;

// api.js

// import axios from "axios";

// const API_BASE_URL = "http://localhost:8000"; // Pastikan port 8000

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true, // Jika menggunakan cookies
// });

// // Interceptor untuk logging
// api.interceptors.request.use(
//   (config) => {
//     console.log("🚀 Making API request:", {
//       method: config.method?.toUpperCase(),
//       url: config.baseURL + config.url,
//       data: config.data,
//     });
//     return config;
//   },
//   (error) => {
//     console.error("❌ Request error:", error);
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     console.log("✅ API response:", response);
//     return response;
//   },
//   (error) => {
//     console.error("❌ API Error:", {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       url: error.config?.url,
//     });
//     return Promise.reject(error);
//   }
// );

// export default api;
// api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  // HAPUS atau set ke false
  // withCredentials: true, // <-- Hapus ini
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log("🚀 Making API request:", {
      method: config.method?.toUpperCase(),
      url: config.baseURL + config.url,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log("✅ API response:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ API Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
);

export default api;
