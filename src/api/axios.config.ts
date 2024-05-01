import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.38:3000',
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');

    if(!token) config.headers.Authorization = 'null';

    config.headers.Authorization = `Basic ${token}`;
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = '*/*';

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

export const authorizedUser = async (data: AxiosRequestConfig = {}): Promise<AxiosRequestConfig> => {
  const token = await AsyncStorage.getItem('token');
  return {
    headers: {
      Authorization: `Basic ${token}`,
      ...data.headers,
    },
    ...data.params,
    ...data.data
  }
}