import axios from 'axios';

const connection = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export default connection;