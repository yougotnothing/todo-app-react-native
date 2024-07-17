import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    config.headers['Access-Control-Allow-Origin'] = process.env.API_URL;
    config.headers['Authorization'] = `SID ${await AsyncStorage.getItem('token')}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if(error.response && error.response.status === 401 && !originalRequest._retry) {
      const response = await api.patch('/auth/refresh');

      originalRequest._retry = false;

      await AsyncStorage.removeItem('token');

      if(response.data.status === 200) {
        await AsyncStorage.setItem('token', response.data.session as string);

        const sid = await AsyncStorage.getItem('token');

        api.defaults.headers['Authorization'] = `SID ${sid}`;
        
        originalRequest._retry = true;
      }else return Promise.reject(response.data);

      return api(originalRequest);
    }
  }
);