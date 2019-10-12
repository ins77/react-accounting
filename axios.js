import axios from 'axios';

const instance = axios.create({
  baseUrl: 'https://accounting-f280e.firebaseio.com/',
});

export default instance;
