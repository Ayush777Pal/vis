import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// ✅ Use a request interceptor to attach token dynamically on every request
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access'); // fetch latest token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default instance;
