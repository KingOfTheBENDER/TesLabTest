import axios from 'axios';

export const BASE_URL = 'https://rickandmortyapi.com/api';

const httpClient = axios.create({
  baseURL: `${BASE_URL}`,
});

export {httpClient};
