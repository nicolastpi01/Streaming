import axios from 'axios';

const server = 'https://localhost:5001'; // Server backend

const API = {
  get: path => axios.get(`${server}${path}`).then(response => response.data),
  put: (path, body) => axios.put(`${server}${path}`, body).then(response => response.data),
  post: (path, body) => axios.post(`${server}${path}`, body).then(response => response.data),
};

export default API;
