import axios from 'axios';

const request = axios.create({
  baseURL: '/api',
});
const headers =  {
    'Content-Type':'multipart/form-data'
}

request.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    console.log(config);
    config.headers = headers;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  },
);

export default request;