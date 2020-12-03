import axios from 'axios';
import { Cookies } from 'react-cookie';

const instance = axios.create({
  baseURL: 'https://localhost:5001/api/',
});

instance.interceptors.request.use(
  async (config) => {
    const cookies = new Cookies();
    const user = cookies.get('user');

    if (user) {
      const { token } = user;
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (err) => {
    return Promise.reject(err);
  }
);
export default instance;
