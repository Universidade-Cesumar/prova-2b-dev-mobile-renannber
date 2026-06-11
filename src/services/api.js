import axios from 'axios';

const api = axios.create({
  baseURL: 'https://6a2b3f4eb687a7d5cbc50350.mockapi.io/materiais',
});

export default api;
