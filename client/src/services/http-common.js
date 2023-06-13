import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:7333/api/v1/website/',
  headers: {
    'Content-type': 'application/json'
  }
});