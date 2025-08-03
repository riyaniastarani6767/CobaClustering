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
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for debugging
API.interceptors.request.use(
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

// Response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log("✅ API response:", {
      status: response.status,
      data: response.data,
      url: response.config.url,
    });
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

export default API;
