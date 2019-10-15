import axios from 'axios';

// TODO: baseUrl должен работать
const instance = axios.create({
  baseUrl: 'https://accounting-f280e.firebaseio.com/',
});

export default instance;
