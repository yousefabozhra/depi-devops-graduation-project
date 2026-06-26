import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ad05af2f8e2614085882269e1249039b-156915155.us-east-1.elb.amazonaws.com:5000'
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
      'API Error:',
      error.response?.data || error.message
    );

    return Promise.reject(error);

  }
);


export default api;