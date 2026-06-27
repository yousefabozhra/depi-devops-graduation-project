import axios from 'axios';

const apiUrl =
  process.env.REACT_APP_API_URL ||
  'http://a1fa5bdb81aca4291978794468cf3580-2108284903.us-east-1.elb.amazonaws.com:5000';

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