import axios from 'axios';

export default axios.create({
  baseURL: 'http://odm-lwebsite.vercel.app/api/v1/website',
  headers: {
    'Content-type': 'application/json'
  }
});
