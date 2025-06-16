import axios from "axios";

const API_BASE_URL = "https://firnaldashboardapi-v2-production.up.railway.app/api/";
// const API_BASE_URL = "http://localhost:5223/api/";

const IAxiosService = axios.create({
  baseURL: API_BASE_URL,
});

// Add an interceptor to include the bearer token from local storage in all requests
IAxiosService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken"); // Adjust the key if needed
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors such as 401 Unauthorized
IAxiosService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Token Expired");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("jwtToken"); // Clear the expired token
      // Redirect to the login page
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default IAxiosService;
