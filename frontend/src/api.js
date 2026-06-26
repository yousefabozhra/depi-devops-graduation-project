import axios from 'axios';

const apiUrl =
  process.env.REACT_APP_API_URL ||
  'http://ad05af2f8e2614085882269e1249039b-156915155.us-east-1.elb.amazonaws.com:5000';
const api = axios.create({
  baseURL: apiUrl
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      'API Response Error:',
      error.response?.data?.message || error.message
    );
    return Promise.reject(error);
  }
);

export default api;