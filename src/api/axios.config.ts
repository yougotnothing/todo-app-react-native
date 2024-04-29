import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.38:3000',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': 'http://192.168.0.38:3000',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
});

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