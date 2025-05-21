import axios from "axios";

// Create the axios instance
export const api = axios.create({
  baseURL: "http://localhost:3000",
});

// ✅ Request Interceptor → Attach token dynamically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
        console.log("TOEKN SENDING:", token, "➡️ To:", config.url); // ✅ اطبعي التوكن هنا

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor → Handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect to login page
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
