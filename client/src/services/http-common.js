import axios from 'axios';

export default axios.create({
  baseURL: 'https://odm-lwebsite.vercel.app/api/v1/website/',
  headers: {
    'Content-type': 'application/json'
  }
});
