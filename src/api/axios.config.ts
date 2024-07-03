import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: process.env.API_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    
    config.headers['Access-Control-Allow-Origin'] = process.env.API_URL;

    if(!token) {
      config.headers.Authorization = undefined;
    }else{
      config.headers.Authorization = `Basic ${token}`;
    }

    console.log('token: ', token);

    return config;
  },
  (error) => {
    if(error.response && error.response.status === 401) {
      throw new Error('Invalid token',  error.response.status);
    }else return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    if(error.response && error.response.status === 401) {
      throw new Error('Invalid token',  error.response.status);
    }else{
      throw new Error(error);
    }
  }
);