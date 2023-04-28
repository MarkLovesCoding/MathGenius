import axios from 'axios';

const instance = axios.create({
  baseURL: '/',
  timeout: 10000, // 10 seconds
});

export default instance;
